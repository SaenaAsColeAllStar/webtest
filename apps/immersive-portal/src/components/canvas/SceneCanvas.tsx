import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { StoryScene3D, TransformationObject } from './StoryScene3D';
import { IndustryScene3D } from './IndustryScene3D';
import { JourneyPath3D, CareerFlow3D } from './JourneyScene3D';
import { ProofScene3D } from './ProofScene3D';

interface SceneCanvasProps {
  scrollProgress: React.MutableRefObject<number>;
}

function CanvasFallback() {
  return null;
}

export function SceneCanvas({ scrollProgress }: SceneCanvasProps) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const dpr: [number, number] = isMobile ? [1, 1.25] : [1, 1.5];

  return (
    <div className="scene-canvas" aria-hidden="true">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={<CanvasFallback />}>
          <StoryScene3D scrollProgress={scrollProgress} />
          <TransformationObject />
          <IndustryScene3D />
          <JourneyPath3D />
          <CareerFlow3D />
          <ProofScene3D />
        </Suspense>
      </Canvas>
    </div>
  );
}
