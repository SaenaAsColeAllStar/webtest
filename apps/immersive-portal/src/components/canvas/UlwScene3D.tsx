/**
 * Chapter 4 — Usaha Layanan Wisata
 *
 * REAL assets from /public/models:
 * - tourism-airport (lod0 desktop / lod3 mobile)
 * - hotel-hospitality (lod0 desktop / lod3 mobile)
 *
 * Scroll handoff: airport (0–50%) → hotel (50–100%) per 3d-object-briefs.md
 */
import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ManifestModel, preloadManifestModel } from './ManifestModel';
import {
  TOURISM_AIRPORT_MANIFEST,
  HOTEL_HOSPITALITY_MANIFEST,
} from '@/lib/model-manifest';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useIsMobile } from '@/hooks/useIsMobile';

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

export function UlwScene3D() {
  const airportRef = useRef<THREE.Group>(null);
  const hotelRef = useRef<THREE.Group>(null);
  const beatRef = useRef(0);
  const activeRef = useChapterActive('#ulw');
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    preloadManifestModel(TOURISM_AIRPORT_MANIFEST, isMobile);
    preloadManifestModel(HOTEL_HOSPITALITY_MANIFEST, isMobile);
  }, [isMobile]);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: '#ulw',
      start: 'top top',
      end: 'bottom top',
      scrub: reducedMotion ? false : 1,
      onUpdate: (self) => {
        beatRef.current = reducedMotion ? 0.5 : self.progress;
      },
    });
  }, [reducedMotion]);

  useFrame((_, delta) => {
    const active = activeRef.current;
    const beat = beatRef.current;
    const airportOpacity = active ? (reducedMotion ? 0.85 : 1 - Math.min(1, beat * 2)) : 0;
    const hotelOpacity = active ? (reducedMotion ? 0.85 : Math.max(0, (beat - 0.5) * 2)) : 0;

    const applyOpacity = (group: THREE.Group | null, opacity: number) => {
      if (!group) return;
      group.visible = opacity > 0.02;
      group.traverse((node) => {
        if (node instanceof THREE.Mesh && node.material instanceof THREE.MeshStandardMaterial) {
          node.material.transparent = true;
          node.material.opacity = THREE.MathUtils.lerp(node.material.opacity, opacity, delta * 3);
        }
      });
    };

    applyOpacity(airportRef.current, airportOpacity);
    applyOpacity(hotelRef.current, hotelOpacity);

    if (!reducedMotion && airportRef.current && beat < 0.5) {
      airportRef.current.rotation.y = beat * Math.PI * 0.08;
    }
    if (!reducedMotion && hotelRef.current && beat >= 0.5) {
      hotelRef.current.position.z = THREE.MathUtils.lerp(hotelRef.current.position.z, (beat - 0.5) * -1.5, delta * 2);
    }
  });

  return (
    <>
      <group ref={airportRef} visible={false}>
        <ManifestModel
          manifest={TOURISM_AIRPORT_MANIFEST}
          scale={isMobile ? 0.35 : 0.45}
          position={[-0.5, -1.2, 0]}
          rotation={[0, Math.PI * 0.15, 0]}
        />
        <ambientLight intensity={0.5} color="#e2e8f0" />
        <directionalLight position={[3, 6, 4]} intensity={0.9} color="#f1f5f9" />
      </group>
      <group ref={hotelRef} visible={false}>
        <ManifestModel
          manifest={HOTEL_HOSPITALITY_MANIFEST}
          scale={isMobile ? 0.4 : 0.5}
          position={[0.3, -0.8, 0]}
          rotation={[0, -Math.PI * 0.1, 0]}
        />
        <pointLight position={[2, 3, 1]} intensity={0.8} color="#fbbf24" />
        <ambientLight intensity={0.35} color="#fef3c7" />
      </group>
    </>
  );
}
