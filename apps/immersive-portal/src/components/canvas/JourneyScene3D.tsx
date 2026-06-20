import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

const MILESTONE_COUNT = 6;

function createPathPoints(): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= 40; i++) {
    const t = i / 40;
    const x = -3 + t * 6;
    const y = Math.sin(t * Math.PI * 2) * 0.8;
    const z = Math.cos(t * Math.PI) * 0.5;
    points.push(new THREE.Vector3(x, y, z));
  }
  return points;
}

function MilestoneMarker({ index, progressRef }: { index: number; progressRef: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const position = useMemo(() => {
    const t = index / (MILESTONE_COUNT - 1);
    const x = -3 + t * 6;
    const y = Math.sin(t * Math.PI * 2) * 0.8;
    const z = Math.cos(t * Math.PI) * 0.5;
    return new THREE.Vector3(x, y, z);
  }, [index]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const threshold = (index + 1) / MILESTONE_COUNT;
    const active = progressRef.current >= threshold - 0.05;
    const targetScale = active ? 1.2 : 0.6;
    const targetEmissive = active ? 0.6 : 0.15;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 6);
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, targetEmissive, delta * 6);
    mat.color.set(active ? '#22d3ee' : '#6366f1');
    mat.emissive.set(active ? '#22d3ee' : '#6366f1');
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.1, 12, 12]} />
      <meshStandardMaterial
        color="#6366f1"
        emissive="#6366f1"
        emissiveIntensity={0.15}
        metalness={0.7}
        roughness={0.3}
      />
    </mesh>
  );
}

export function JourneyPath3D() {
  const groupRef = useRef<THREE.Group>(null);
  const progressRef = useRef(0);
  const activeRef = useRef(false);
  const pathPoints = useMemo(() => createPathPoints(), []);
  const visibleCountRef = useRef(2);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: '#student-journey',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        visibleCountRef.current = Math.max(2, Math.floor(self.progress * pathPoints.length));
      },
      onEnter: () => { activeRef.current = true; },
      onLeave: () => { activeRef.current = false; },
      onEnterBack: () => { activeRef.current = true; },
      onLeaveBack: () => { activeRef.current = false; },
    });
  }, [pathPoints.length]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.visible = activeRef.current;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        progressRef.current * Math.PI * 0.15,
        delta * 2
      );
    }
  });

  const visiblePoints = pathPoints.slice(0, visibleCountRef.current);

  return (
    <group ref={groupRef} position={[0, -1.5, -1]}>
      <Line points={pathPoints} color="#6366f1" lineWidth={1.5} transparent opacity={0.25} />
      {visiblePoints.length >= 2 && (
        <Line points={visiblePoints} color="#22d3ee" lineWidth={2} transparent opacity={0.7} />
      )}
      {Array.from({ length: MILESTONE_COUNT }, (_, i) => (
        <MilestoneMarker key={i} index={i} progressRef={progressRef} />
      ))}
    </group>
  );
}

export function CareerFlow3D() {
  const groupRef = useRef<THREE.Group>(null);
  const activeRef = useRef(false);
  const flowRef = useRef(0);

  const careerNodes: [number, number, number][] = [
    [-2.5, 0.5, 0],
    [0, 1.0, -0.3],
    [2.5, 0.3, 0.2],
  ];

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: '#career-journey',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        flowRef.current = self.progress;
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
    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.3) * 0.1 + flowRef.current * 0.3;
    groupRef.current.children.forEach((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.material.opacity = THREE.MathUtils.lerp(child.material.opacity, activeRef.current ? 0.9 : 0, delta * 4);
        child.material.emissiveIntensity = THREE.MathUtils.lerp(
          child.material.emissiveIntensity,
          0.3 + flowRef.current * 0.4,
          delta * 3
        );
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, 0.5, -2]}>
      {careerNodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <octahedronGeometry args={[0.2, 0]} />
          <meshStandardMaterial
            color="#6366f1"
            emissive="#6366f1"
            emissiveIntensity={0.3}
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0}
          />
        </mesh>
      ))}
      {careerNodes.slice(0, -1).map((from, i) => {
        const to = careerNodes[i + 1];
        return (
          <Line
            key={`line-${i}`}
            points={[new THREE.Vector3(...from), new THREE.Vector3(...to)]}
            color="#22d3ee"
            lineWidth={1}
            transparent
            opacity={0.3}
          />
        );
      })}
    </group>
  );
}
