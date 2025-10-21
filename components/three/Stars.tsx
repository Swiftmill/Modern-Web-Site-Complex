"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type Quality = "ultra" | "high" | "medium";

type StarsProps = {
  quality: Quality;
};

export function Stars({ quality }: StarsProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = useMemo(() => {
    switch (quality) {
      case "medium":
        return 30000;
      case "high":
        return 60000;
      default:
        return 100000;
    }
  }, [quality]);

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const radius = THREE.MathUtils.randFloatSpread(160);
      const theta = THREE.MathUtils.randFloatSpread(Math.PI * 2);
      const phi = THREE.MathUtils.randFloatSpread(Math.PI);
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const color = new THREE.Color().setHSL(0.65 + Math.random() * 0.1, 0.7, 0.6 + Math.random() * 0.2);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const bufferGeometry = new THREE.BufferGeometry();
    bufferGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    bufferGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return bufferGeometry;
  }, [count]);

  const material = useMemo(() => {
    const mat = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.9,
      depthWrite: false
    });
    return mat;
  }, []);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((_state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.02;
    pointsRef.current.rotation.x += delta * 0.005;
  });

  return <points ref={pointsRef} geometry={geometry} material={material} frustumCulled />;
}
