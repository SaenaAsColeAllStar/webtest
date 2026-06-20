declare module 'draco3dgltf' {
  interface DracoModuleFactory {
    createDecoderModule(): Promise<unknown>;
    createEncoderModule(): Promise<unknown>;
  }

  const draco3d: DracoModuleFactory;
  export default draco3d;
}

declare module 'obj2gltf' {
  interface Obj2GltfOptions {
    binary?: boolean;
    secure?: boolean;
  }

  export default function obj2gltf(inputPath: string, options?: Obj2GltfOptions): Promise<Buffer | Record<string, unknown>>;
}
