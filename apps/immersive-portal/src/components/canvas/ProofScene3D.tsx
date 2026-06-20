import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

function TrophyPedestal({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, -0.35, 0]}>
        <cylinderGeometry args={[0.4, 0.5, 0.15, 16]} />
        <meshStandardMaterial color="#1e1e2e" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.25, 0.3, 0.08, 16]} />
        <meshStandardMaterial color="#6366f1" metalness={0.8} roughness={0.2} emissive="#6366f1" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

export function ProofScene3D() {
  const groupRef = useRef<THREE.Group>(null);
  const activeRef = useRef(false);
  const progressRef = useRef(0);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: '#proof',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
      onEnter: () => { activeRef.current = true; },
      onLeave: () => { activeRef.current = false; },
      onEnterBack: () => { activeRef.current = true; },
      onLeaveBack: () => { activeRef.current = false; },
    });
  }, []);

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return;
    groupRef.current.visible = activeRef.current;
    const targetY = progressRef.current * 0.4;
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, delta * 3);
    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.25) * 0.15 + progressRef.current * 0.5;
  });

  return (
    <group ref={groupRef} position={[2.8, 0.2, -1.5]}>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
        <mesh>
          <octahedronGeometry args={[0.35, 0]} />
          <meshStandardMaterial
            color="#fbbf24"
            emissive="#fbbf24"
            emissiveIntensity={0.35}
            metalness={0.9}
            roughness={0.15}
            transparent
            opacity={0.85}
          />
        </mesh>
      </Float>
      <TrophyPedestal position={[-0.6, -0.5, 0.3]} />
      <mesh position={[-1.2, 0.1, -0.2]} rotation={[0.3, 0.5, 0]}>
        <torusGeometry args={[0.2, 0.04, 8, 24]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.25} metalness={0.7} roughness={0.3} />
      </mesh>
    </group>
  );
}
