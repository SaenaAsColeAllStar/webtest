import { Suspense, useMemo, useEffect } from 'react';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';
import { useIsMobile } from '@/hooks/useIsMobile';
import { type ModelManifest, resolveModelPath } from '@/lib/model-manifest';

interface ManifestModelProps {
  manifest: ModelManifest;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

function ManifestModelInner({
  path,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: {
  path: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  const { scene } = useGLTF(path);
  const cloned = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = false;
        child.receiveShadow = false;
      }
    });
  }, [cloned]);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Center>
        <primitive object={cloned} />
      </Center>
    </group>
  );
}

export function ManifestModel({ manifest, scale, position, rotation }: ManifestModelProps) {
  const isMobile = useIsMobile();
  const path = resolveModelPath(manifest, isMobile);

  return (
    <Suspense fallback={null}>
      <ManifestModelInner path={path} scale={scale} position={position} rotation={rotation} />
    </Suspense>
  );
}

export function preloadManifestModel(manifest: ModelManifest, isMobile: boolean): void {
  useGLTF.preload(resolveModelPath(manifest, isMobile));
}
