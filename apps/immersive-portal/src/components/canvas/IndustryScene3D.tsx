import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

function useIndustryActive() {
  const activeRef = useRef(false);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: '#industry',
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => { activeRef.current = true; },
      onLeave: () => { activeRef.current = false; },
      onEnterBack: () => { activeRef.current = true; },
      onLeaveBack: () => { activeRef.current = false; },
    });
  }, []);

  return activeRef;
}

function ServerRack({ activeRef }: { activeRef: React.MutableRefObject<boolean> }) {
  const groupRef = useRef<THREE.Group>(null);
  const opacityRef = useRef(0);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: '#industry',
      start: 'top 80%',
      end: 'center center',
      scrub: 1,
      onUpdate: (self) => {
        opacityRef.current = self.progress;
        if (groupRef.current) {
          groupRef.current.rotation.y = self.progress * Math.PI * 0.5;
        }
      },
    });
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const target = activeRef.current ? opacityRef.current : 0;
    groupRef.current.visible = target > 0.01;
    groupRef.current.children.forEach((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.material.opacity = THREE.MathUtils.lerp(child.material.opacity, target, delta * 4);
      }
    });
  });

  const rackLayers = [-0.6, -0.2, 0.2, 0.6];

  return (
    <group ref={groupRef} position={[-2.8, 0, 0]}>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
        {rackLayers.map((y, i) => (
          <mesh key={i} position={[0, y, 0]}>
            <boxGeometry args={[0.9, 0.25, 0.5]} />
            <meshStandardMaterial
              color="#6366f1"
              emissive="#6366f1"
              emissiveIntensity={0.2}
              metalness={0.7}
              roughness={0.3}
              transparent
              opacity={0}
            />
          </mesh>
        ))}
        <mesh position={[0, 0, 0.26]}>
          <boxGeometry args={[0.85, 1.4, 0.04]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.15} transparent opacity={0} />
        </mesh>
      </Float>
    </group>
  );
}

function CodeBrackets({ activeRef }: { activeRef: React.MutableRefObject<boolean> }) {
  const groupRef = useRef<THREE.Group>(null);
  const opacityRef = useRef(0);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: '#industry',
      start: 'top 70%',
      end: 'center center',
      scrub: 1,
      onUpdate: (self) => {
        opacityRef.current = Math.max(0, self.progress - 0.15);
        if (groupRef.current) {
          groupRef.current.rotation.y = -self.progress * Math.PI * 0.4;
        }
      },
    });
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const target = activeRef.current ? opacityRef.current : 0;
    groupRef.current.visible = target > 0.01;
    groupRef.current.children.forEach((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.material.opacity = THREE.MathUtils.lerp(child.material.opacity, target, delta * 4);
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.35}>
        <mesh position={[-0.35, 0.2, 0]} rotation={[0, 0, 0.4]}>
          <boxGeometry args={[0.12, 0.7, 0.12]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.3} transparent opacity={0} />
        </mesh>
        <mesh position={[-0.35, -0.2, 0]} rotation={[0, 0, -0.4]}>
          <boxGeometry args={[0.12, 0.7, 0.12]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.3} transparent opacity={0} />
        </mesh>
        <mesh position={[0.35, 0.2, 0]} rotation={[0, 0, -0.4]}>
          <boxGeometry args={[0.12, 0.7, 0.12]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.3} transparent opacity={0} />
        </mesh>
        <mesh position={[0.35, -0.2, 0]} rotation={[0, 0, 0.4]}>
          <boxGeometry args={[0.12, 0.7, 0.12]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.3} transparent opacity={0} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.3, 0.08, 0.08]} />
          <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.4} transparent opacity={0} />
        </mesh>
      </Float>
    </group>
  );
}

function PenTool({ activeRef }: { activeRef: React.MutableRefObject<boolean> }) {
  const groupRef = useRef<THREE.Group>(null);
  const opacityRef = useRef(0);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: '#industry',
      start: 'top 60%',
      end: 'center center',
      scrub: 1,
      onUpdate: (self) => {
        opacityRef.current = Math.max(0, self.progress - 0.3);
        if (groupRef.current) {
          groupRef.current.rotation.z = self.progress * Math.PI * 0.25;
        }
      },
    });
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const target = activeRef.current ? opacityRef.current : 0;
    groupRef.current.visible = target > 0.01;
    groupRef.current.children.forEach((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.material.opacity = THREE.MathUtils.lerp(child.material.opacity, target, delta * 4);
      }
    });
  });

  return (
    <group ref={groupRef} position={[2.8, 0, 0]} rotation={[0, 0, -0.3]}>
      <Float speed={1.3} rotationIntensity={0.25} floatIntensity={0.4}>
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 1.0, 12]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.6} roughness={0.4} transparent opacity={0} />
        </mesh>
        <mesh position={[0, 0.25, 0]}>
          <coneGeometry args={[0.1, 0.35, 12]} />
          <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.35} transparent opacity={0} />
        </mesh>
        <mesh position={[0, 0.55, 0]}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.5} transparent opacity={0} />
        </mesh>
      </Float>
    </group>
  );
}

export function IndustryScene3D() {
  const activeRef = useIndustryActive();
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      const targetScale = activeRef.current ? 1 : 0.8;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 3);
    }
  });

  return (
    <group ref={groupRef}>
      <ServerRack activeRef={activeRef} />
      <CodeBrackets activeRef={activeRef} />
      <PenTool activeRef={activeRef} />
    </group>
  );
}
