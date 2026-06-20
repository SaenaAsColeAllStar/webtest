import path from 'node:path';

export interface PreviewAssetRecord {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string | null;
  fileName: string;
  relativePath: string;
  mimeType: string;
  sizeBytes: number;
  tags: string[];
  extension: string;
  analysis: Record<string, unknown> | null;
  validation: Record<string, unknown> | null;
  deployment: Record<string, unknown> | null;
}

export interface AssetManifest {
  version: 1;
  asset: {
    id: string;
    slug: string;
    name: string;
    category: string;
    description: string | null;
    fileName: string;
    relativePath: string;
    mimeType: string;
    sizeBytes: number;
    tags: string[];
  };
  preview: {
    canUseGLTF: boolean;
    r3fPath: string | null;
  };
  analysis: Record<string, unknown> | null;
  validation: Record<string, unknown> | null;
  deployment: Record<string, unknown> | null;
}

export function createAssetManifest(asset: PreviewAssetRecord): AssetManifest {
  const canUseGLTF = ['.glb', '.gltf'].includes(asset.extension);
  return {
    version: 1,
    asset: {
      id: asset.id,
      slug: asset.slug,
      name: asset.name,
      category: asset.category,
      description: asset.description,
      fileName: asset.fileName,
      relativePath: asset.relativePath,
      mimeType: asset.mimeType,
      sizeBytes: asset.sizeBytes,
      tags: asset.tags
    },
    preview: {
      canUseGLTF,
      r3fPath: canUseGLTF ? asset.relativePath.replace(/\\/g, '/') : null
    },
    analysis: asset.analysis,
    validation: asset.validation,
    deployment: asset.deployment
  };
}

export function createR3FComponentSource(manifest: AssetManifest): string {
  const componentName = manifest.asset.name
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join('') || 'StudioAsset';

  const fileSource = manifest.preview.canUseGLTF
    ? `
import { useGLTF } from '@react-three/drei';

export function ${componentName}Asset(props: JSX.IntrinsicElements['group']) {
  const { scene } = useGLTF('${manifest.preview.r3fPath}');
  return <primitive object={scene} {...props} />;
}
`
    : `
export function ${componentName}Asset() {
  return null;
}
`;

  return `import * as React from 'react';${fileSource}
export const assetManifest = ${JSON.stringify(manifest, null, 2)} as const;
`;
}

export function getDownloadName(filePath: string): string {
  return path.basename(filePath);
}
