import { promises as fs } from 'node:fs';
import path from 'node:path';

import draco3d from 'draco3dgltf';
import { NodeIO, ImageUtils } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { MeshoptDecoder, MeshoptEncoder } from 'meshoptimizer';

import type { AssetAnalysis, LoadedAsset, MeshInfo, SupportedNativeFormat, TextureInfo, ToolCapability } from '../src/types.js';

function getIO(): Promise<NodeIO> {
  return Promise.all([draco3d.createDecoderModule(), draco3d.createEncoderModule(), MeshoptDecoder.ready, MeshoptEncoder.ready]).then(
    ([decoderModule, encoderModule]) =>
      new NodeIO()
        .registerExtensions(ALL_EXTENSIONS)
        .registerDependencies({
          'draco3d.decoder': decoderModule,
          'draco3d.encoder': encoderModule,
          'meshopt.decoder': MeshoptDecoder,
          'meshopt.encoder': MeshoptEncoder,
        }),
  );
}

export async function loadAsset(inputPath: string): Promise<LoadedAsset> {
  const extension = path.extname(inputPath).toLowerCase();
  if (extension !== '.glb' && extension !== '.gltf') {
    throw new Error(`Unsupported native format "${extension}". Expected .glb or .gltf.`);
  }

  const io = await getIO();
  const document = await io.read(inputPath);

  return {
    document,
    inputPath,
    format: extension as SupportedNativeFormat,
  };
}

export async function saveAsset(asset: LoadedAsset, outputPath: string): Promise<void> {
  const io = await getIO();
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await io.write(outputPath, asset.document);
}

function getPrimitiveIndexCount(meshInfo: MeshInfo): number {
  return meshInfo.indexCount > 0 ? Math.floor(meshInfo.indexCount / 3) : Math.floor(meshInfo.vertexCount / 3);
}

export function analyzeDocument(asset: LoadedAsset, sourceBytes: number, capabilities: ToolCapability[]): AssetAnalysis {
  const { document, inputPath, format } = asset;
  const root = document.getRoot();
  const meshes: MeshInfo[] = [];
  const textures: TextureInfo[] = [];
  const warnings: string[] = [];

  for (const mesh of root.listMeshes()) {
    let vertexCount = 0;
    let indexCount = 0;
    const materials = new Set<string>();

    for (const primitive of mesh.listPrimitives()) {
      const position = primitive.getAttribute('POSITION');
      if (position) {
        vertexCount += position.getCount();
      }

      const indices = primitive.getIndices();
      if (indices) {
        indexCount += indices.getCount();
      }

      const material = primitive.getMaterial();
      if (material) {
        materials.add(material.getName() || 'material');
      }
    }

    meshes.push({
      name: mesh.getName() || `mesh-${meshes.length + 1}`,
      primitiveCount: mesh.listPrimitives().length,
      vertexCount,
      indexCount,
      materialCount: materials.size,
    });
  }

  for (const texture of root.listTextures()) {
    const image = texture.getImage();
    const mimeType = texture.getMimeType();
    let width = 0;
    let height = 0;

    if (image && mimeType) {
      const size = ImageUtils.getSize(image, mimeType);
      width = size?.[0] ?? 0;
      height = size?.[1] ?? 0;
    }

    if (width > 4096 || height > 4096) {
      warnings.push(`Texture "${texture.getName() || texture.getURI() || 'unnamed'}" exceeds 4096px and should be resized.`);
    }

    textures.push({
      name: texture.getName() || `texture-${textures.length + 1}`,
      uri: texture.getURI() || '',
      mimeType: mimeType || 'application/octet-stream',
      width,
      height,
      byteLength: image?.byteLength ?? 0,
    });
  }

  const triangleCount = meshes.reduce((sum, mesh) => sum + getPrimitiveIndexCount(mesh), 0);
  const vertexCount = meshes.reduce((sum, mesh) => sum + mesh.vertexCount, 0);
  const drawCallCount = meshes.reduce((sum, mesh) => sum + mesh.primitiveCount, 0);
  const estimatedGpuBytes = textures.reduce((sum, texture) => sum + texture.byteLength, 0);

  if (root.listScenes().length === 0) {
    warnings.push('Asset does not define a scene. Consumers may need to provide one manually.');
  }

  return {
    sourcePath: inputPath,
    sourceFormat: format.replace('.', ''),
    sourceBytes,
    generatedAt: new Date().toISOString(),
    meshCount: meshes.length,
    materialCount: root.listMaterials().length,
    textureCount: textures.length,
    nodeCount: root.listNodes().length,
    sceneCount: root.listScenes().length,
    animationCount: root.listAnimations().length,
    triangleCount,
    vertexCount,
    drawCallCount,
    estimatedGpuBytes,
    textures,
    meshes,
    warnings,
    capabilities,
  };
}
