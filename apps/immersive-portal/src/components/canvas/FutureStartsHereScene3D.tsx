/**
 * Chapter 1 — Future Starts Here
 *
 * school-building GLB is BLOCKED (3ds Max .max — see public/models/school-building/conversion-required.json).
 * Placeholder: procedural campus silhouette until CAD export lands.
 */
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

function SchoolBuildingPlaceholder() {
  return (
    <Float speed={0.8} rotationIntensity={0.08} floatIntensity={0.2}>
      <group position={[1.2, -0.4, 0]}>
        {/* Main block */}
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[2.4, 1.2, 1.4]} />
          <meshStandardMaterial color="#1e1e2e" metalness={0.35} roughness={0.65} />
        </mesh>
        {/* Roof */}
        <mesh position={[0, 1.35, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[1.9, 0.7, 4]} />
          <meshStandardMaterial color="#2d2d44" metalness={0.4} roughness={0.55} />
        </mesh>
        {/* Tower */}
        <mesh position={[-0.9, 1.1, 0.3]}>
          <boxGeometry args={[0.5, 1.6, 0.5]} />
          <meshStandardMaterial color="#14141f" metalness={0.5} roughness={0.5} />
        </mesh>
        {/* Accent windows */}
        {[-0.5, 0, 0.5].map((x) => (
          <mesh key={x} position={[x, 0.55, 0.71]}>
            <planeGeometry args={[0.35, 0.45]} />
            <meshStandardMaterial
              color="#22d3ee"
              emissive="#22d3ee"
              emissiveIntensity={0.25}
              transparent
              opacity={0.7}
            />
          </mesh>
        ))}
        {/* Ground plane hint */}
        <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[4, 3]} />
          <meshStandardMaterial color="#0a0a0f" transparent opacity={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

export function FutureStartsHereScene3D() {
  const groupRef = useRef<THREE.Group>(null);
  const cameraZ = useRef(5.5);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (reducedMotion) return;

    ScrollTrigger.create({
      trigger: '#future-starts-here',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        cameraZ.current = 5.5 + self.progress * 3;
        if (groupRef.current) {
          groupRef.current.rotation.y = self.progress * Math.PI * 0.15;
        }
      },
    });
  }, [reducedMotion]);

  useFrame(({ camera }) => {
    if (reducedMotion) {
      camera.position.z = 5.5;
      return;
    }
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, cameraZ.current, 0.05);
    camera.lookAt(0.5, 0.2, 0);
  });

  return (
    <>
      <color attach="background" args={['#0a0a0f']} />
      <fog attach="fog" args={['#0a0a0f', 8, 18]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 4]} intensity={1.1} color="#f8fafc" />
      <pointLight position={[-3, 2, 3]} intensity={0.7} color="#6366f1" />
      <pointLight position={[4, 1, -2]} intensity={0.4} color="#22d3ee" />
      <group ref={groupRef}>
        <SchoolBuildingPlaceholder />
      </group>
    </>
  );
}
