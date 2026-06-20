import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Line, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

interface StoryScene3DProps {
  scrollProgress: React.MutableRefObject<number>;
}

const NODE_POSITIONS: [number, number, number][] = [
  [2.2, 0.8, -0.5],
  [-2.0, 1.0, 0.3],
  [1.5, -1.2, 0.8],
  [-1.8, -0.6, -0.4],
  [0.5, 1.8, -1.0],
  [-0.8, -1.6, 0.2],
  [2.5, -0.3, -1.2],
  [-2.4, 0.2, 0.9],
];

function NetworkNodes() {
  return (
    <>
      {NODE_POSITIONS.map((pos, i) => (
        <Float key={i} speed={1.5 + i * 0.1} rotationIntensity={0.2} floatIntensity={0.4}>
          <mesh position={pos}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial
              color="#22d3ee"
              emissive="#22d3ee"
              emissiveIntensity={0.4}
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function ConnectionLines() {
  const points = useMemo(() => {
    const center = new THREE.Vector3(0, 0, 0);
    return NODE_POSITIONS.map((pos) => [center, new THREE.Vector3(...pos)] as [THREE.Vector3, THREE.Vector3]);
  }, []);

  return (
    <>
      {points.map((pair, i) => (
        <Line
          key={i}
          points={pair}
          color="#6366f1"
          lineWidth={1}
          transparent
          opacity={0.35}
        />
      ))}
    </>
  );
}

function CoreHub() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
      meshRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial
          color="#6366f1"
          emissive="#6366f1"
          emissiveIntensity={0.35}
          metalness={0.7}
          roughness={0.25}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

function IndustryOrbit() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * 0.08;
    }
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 3, 0, 0]}>
      <torusKnotGeometry args={[1.4, 0.04, 128, 16, 2, 3]} />
      <meshStandardMaterial
        color="#22d3ee"
        emissive="#22d3ee"
        emissiveIntensity={0.2}
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

export function StoryScene3D({ scrollProgress }: StoryScene3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const cameraZ = useRef(5);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: '#story',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
        cameraZ.current = 5 + self.progress * 4;
        if (groupRef.current) {
          groupRef.current.rotation.y = self.progress * Math.PI * 0.25;
        }
      },
    });
  }, [scrollProgress]);

  useFrame(({ camera }) => {
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, cameraZ.current, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <color attach="background" args={['#0a0a0f']} />
      <ambientLight intensity={0.3} />
      <pointLight position={[4, 4, 4]} intensity={1.2} color="#6366f1" />
      <pointLight position={[-4, -2, 2]} intensity={0.6} color="#22d3ee" />
      <Stars radius={80} depth={40} count={1200} factor={3} saturation={0} fade speed={0.5} />
      <group ref={groupRef}>
        <CoreHub />
        <IndustryOrbit />
        <NetworkNodes />
        <ConnectionLines />
      </group>
    </>
  );
}

export function TransformationObject() {
  const ref = useRef<THREE.Group>(null);
  const scaleRef = useRef(1);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: '#transformation',
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
  }, []);

  useFrame(() => {
    if (ref.current) {
      const s = scaleRef.current;
      ref.current.scale.set(s, s, s);
    }
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
