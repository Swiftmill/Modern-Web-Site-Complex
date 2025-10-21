"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function Planets() {
  const planetRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const satelliteRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (planetRef.current) planetRef.current.rotation.y += delta * 0.1;
    if (ringRef.current) ringRef.current.rotation.z += delta * 0.05;
    if (satelliteRef.current) {
      const t = state.clock.elapsedTime * 0.6;
      satelliteRef.current.position.set(Math.cos(t) * 5, 0.4, Math.sin(t) * 5);
    }
  });

  return (
    <group position={[0, -1.5, -5]}>
      <mesh ref={planetRef} castShadow>
        <icosahedronGeometry args={[1.8, 2]} />
        <meshStandardMaterial color="#312e81" emissive="#4338ca" emissiveIntensity={0.6} roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.4, 3.1, 64]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={satelliteRef} position={[4, 0.4, 0]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}
