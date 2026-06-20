import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { FutureStartsHereScene3D } from './FutureStartsHereScene3D';
import { TeknikMesinScene3D } from './TeknikMesinScene3D';
import { UlwScene3D } from './UlwScene3D';
import { TransformationScene3D } from './TransformationScene3D';
import { ProofScene3D } from './ProofScene3D';
import { useIsMobile } from '@/hooks/useIsMobile';

function CanvasFallback() {
  return null;
}

export function SceneCanvas() {
  const isMobile = useIsMobile();
  const dpr: [number, number] = isMobile ? [1, 1.25] : [1, 1.5];

  return (
    <div className="scene-canvas" aria-hidden="true">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={<CanvasFallback />}>
          <FutureStartsHereScene3D />
          <TeknikMesinScene3D />
          <UlwScene3D />
          <TransformationScene3D />
          <ProofScene3D />
        </Suspense>
      </Canvas>
    </div>
  );
}
