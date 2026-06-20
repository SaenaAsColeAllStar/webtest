/**
 * Chapter 3 — Teknik Mesin
 *
 * cnc-lathe (.SLDASM) and gear-eureka (.STEP) are BLOCKED — see conversion-required.json.
 * Placeholder: lathe silhouette + gear cluster until SolidWorks/FreeCAD export.
 */
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

function CncLathePlaceholder() {
  return (
    <group position={[-1.4, -0.3, 0]}>
      {/* Bed */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.8, 0.25, 1.0]} />
        <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.35} />
      </mesh>
      {/* Headstock */}
      <mesh position={[-1.1, 0.45, 0]}>
        <boxGeometry args={[0.7, 0.9, 0.8]} />
        <meshStandardMaterial color="#475569" metalness={0.75} roughness={0.3} />
      </mesh>
      {/* Spindle */}
      <mesh position={[-1.45, 0.45, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, 0.5, 16]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Tailstock */}
      <mesh position={[1.0, 0.35, 0]}>
        <boxGeometry args={[0.5, 0.7, 0.6]} />
        <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.35} />
      </mesh>
      {/* Loading station */}
      <mesh position={[0.3, 0.55, 0.35]}>
        <boxGeometry args={[0.6, 0.5, 0.4]} />
        <meshStandardMaterial color="#6366f1" metalness={0.6} roughness={0.4} emissive="#6366f1" emissiveIntensity={0.08} />
      </mesh>
    </group>
  );
}

function GearClusterPlaceholder() {
  const gearRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (gearRef.current) {
      gearRef.current.rotation.z += delta * 0.12;
    }
  });

  return (
    <group ref={gearRef} position={[1.8, 0.2, 0.3]}>
      <mesh>
        <cylinderGeometry args={[0.55, 0.55, 0.12, 24]} />
        <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[0.85, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.1, 18]} />
        <meshStandardMaterial color="#22d3ee" metalness={0.75} roughness={0.3} emissive="#22d3ee" emissiveIntensity={0.1} />
      </mesh>
    </group>
  );
}

function useChapterActive(triggerId: string) {
  const activeRef = useRef(false);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: triggerId,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => { activeRef.current = true; },
      onLeave: () => { activeRef.current = false; },
      onEnterBack: () => { activeRef.current = true; },
      onLeaveBack: () => { activeRef.current = false; },
    });
  }, [triggerId]);

  return activeRef;
}

export function TeknikMesinScene3D() {
  const groupRef = useRef<THREE.Group>(null);
  const opacityRef = useRef(0);
  const activeRef = useChapterActive('#teknik-mesin');
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (reducedMotion) return;

    ScrollTrigger.create({
      trigger: '#teknik-mesin',
      start: 'top 80%',
      end: 'center center',
      scrub: 1,
      onUpdate: (self) => {
        opacityRef.current = self.progress;
        if (groupRef.current) {
          groupRef.current.rotation.y = self.progress * Math.PI * 0.2;
        }
      },
    });
  }, [reducedMotion]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const target = activeRef.current ? (reducedMotion ? 1 : opacityRef.current) : 0;
    groupRef.current.visible = target > 0.02;
    groupRef.current.children.forEach((child) => {
      child.traverse((node) => {
        if (node instanceof THREE.Mesh && node.material instanceof THREE.MeshStandardMaterial) {
          node.material.transparent = true;
          node.material.opacity = THREE.MathUtils.lerp(node.material.opacity, target, delta * 4);
        }
      });
    });
  });

  return (
    <group ref={groupRef} visible={false}>
      <Float speed={0.6} rotationIntensity={0.05} floatIntensity={0.15}>
        <CncLathePlaceholder />
        <GearClusterPlaceholder />
      </Float>
    </group>
  );
}
