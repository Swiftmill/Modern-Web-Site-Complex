"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { nebulaFragment, nebulaVertex } from "@/lib/shaders/nebula";

export function Nebula() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color("#150b2f") },
      uColorB: { value: new THREE.Color("#8b5cf6") },
      uColorC: { value: new THREE.Color("#22d3ee") }
    }),
    []
  );

  useFrame((_state, delta) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value += delta;
  });

  return (
    <mesh position={[0, -2, -10]} scale={[50, 30, 1]}>
      <planeGeometry args={[2, 1.4, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        fragmentShader={nebulaFragment}
        vertexShader={nebulaVertex}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
