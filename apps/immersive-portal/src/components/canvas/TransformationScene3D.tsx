import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/** Chapter 6 — Student Transformation (minimal 3D accent). */
export function TransformationScene3D() {
  const ref = useRef<THREE.Group>(null);
  const scaleRef = useRef(1);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (reducedMotion) return;

    ScrollTrigger.create({
      trigger: '#student-transformation',
      start: 'top center',
      end: 'center center',
      scrub: 1,
      onUpdate: (self) => {
        scaleRef.current = 0.6 + self.progress * 0.5;
        if (ref.current) {
          ref.current.rotation.y = self.progress * Math.PI;
        }
      },
    });
  }, [reducedMotion]);

  useFrame(() => {
    if (!ref.current) return;
    const s = reducedMotion ? 1 : scaleRef.current;
    ref.current.scale.set(s, s, s);
  });

  return (
    <group ref={ref} position={[2.5, 0, 0]}>
      <mesh>
        <boxGeometry args={[0.8, 1.2, 0.8]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial
          color="#6366f1"
          emissive="#6366f1"
          emissiveIntensity={0.5}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}
