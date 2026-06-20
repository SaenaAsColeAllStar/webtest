'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function PreviewViewerCanvas({ src, canUseGLTF }: { src: string; canUseGLTF: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#020617');

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(2.8, 2, 4.2);

    const ambient = new THREE.AmbientLight('#ffffff', 1.2);
    const directional = new THREE.DirectionalLight('#ffffff', 1.6);
    directional.position.set(4, 4, 4);
    scene.add(ambient, directional);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableDamping = true;

    let mounted = true;
    let frame = 0;
    let currentObject: THREE.Object3D | null = null;

    const resize = () => {
      const width = canvas.clientWidth || 800;
      const height = canvas.clientHeight || 520;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const addFallbackMesh = () => {
      const geometry = new THREE.TorusKnotGeometry(0.9, 0.3, 128, 32);
      const material = new THREE.MeshStandardMaterial({ color: '#22d3ee', metalness: 0.5, roughness: 0.2 });
      currentObject = new THREE.Mesh(geometry, material);
      scene.add(currentObject);
    };

    const loaderPromise = canUseGLTF
      ? new Promise<void>((resolve) => {
          new GLTFLoader().load(
            src,
            (gltf) => {
              if (!mounted) return resolve();
              currentObject = gltf.scene;
              scene.add(gltf.scene);
              resolve();
            },
            undefined,
            () => {
              addFallbackMesh();
              resolve();
            },
          );
        })
      : Promise.resolve().then(() => {
          addFallbackMesh();
        });

    const renderLoop = () => {
      controls.update();
      if (currentObject && !canUseGLTF) {
        currentObject.rotation.y += 0.01;
      }
      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(renderLoop);
    };

    resize();
    loaderPromise.then(() => {
      if (!mounted) return;
      renderLoop();
    });
    window.addEventListener('resize', resize);

    return () => {
      mounted = false;
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      controls.dispose();
      scene.clear();
      renderer.dispose();
    };
  }, [canUseGLTF, src]);

  return (
    <canvas ref={canvasRef} className="h-full w-full" />
  );
}
