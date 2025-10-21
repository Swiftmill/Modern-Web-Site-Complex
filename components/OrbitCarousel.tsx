"use client";

import { Html, OrbitControls, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

const ORBIT_RADIUS = 3.5;

export type OrbitPoster = {
  id: string;
  title: string;
  image: string;
};

type OrbitCarouselProps = {
  posters: OrbitPoster[];
  onFocus?: (id: string) => void;
};

export function OrbitCarousel({ posters, onFocus }: OrbitCarouselProps) {
  const [activeId, setActiveId] = useState(posters[0]?.id ?? "");

  return (
    <div className="relative aspect-square w-full">
      <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
        <color attach="background" args={[0, 0, 0]} />
        <ambientLight intensity={0.7} />
        <directionalLight intensity={0.6} position={[5, 5, 5]} />
        <Suspense fallback={null}>
          <PosterOrbit
            posters={posters}
            activeId={activeId}
            onActive={(id) => {
              setActiveId(id);
              onFocus?.(id);
            }}
          />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.6} />
      </Canvas>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-to-b from-accent/20 via-transparent to-transparent blur-3xl"
      />
    </div>
  );
}

type PosterOrbitProps = {
  posters: OrbitPoster[];
  activeId: string;
  onActive: (id: string) => void;
};

function PosterOrbit({ posters, activeId, onActive }: PosterOrbitProps) {
  const groupRef = useRef<THREE.Group>(null);
  const textures = useTexture(posters.map((poster) => poster.image));

  const positions = useMemo(() => {
    return posters.map((poster, index) => {
      const angle = (index / posters.length) * Math.PI * 2;
      return {
        id: poster.id,
        position: new THREE.Vector3(
          Math.cos(angle) * ORBIT_RADIUS,
          Math.sin(angle * 1.2) * 1.5,
          Math.sin(angle) * ORBIT_RADIUS
        ),
        rotation: new THREE.Euler(0, -angle + Math.PI / 2, 0)
      };
    });
  }, [posters]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.1;
  });

  return (
    <group ref={groupRef}>
      {positions.map((poster, index) => (
        <PosterCard
          key={poster.id}
          texture={textures[index] as THREE.Texture}
          poster={posters[index]}
          position={poster.position}
          rotation={poster.rotation}
          active={poster.id === activeId}
          onFocus={() => onActive(posters[index].id)}
        />
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[ORBIT_RADIUS - 0.05, ORBIT_RADIUS + 0.05, 64]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

type PosterCardProps = {
  texture: THREE.Texture;
  poster: OrbitPoster;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  active: boolean;
  onFocus: () => void;
};

function PosterCard({ texture, poster, position, rotation, active, onFocus }: PosterCardProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    const targetScale = active ? 1.15 : 0.95;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, 1), delta * 4);
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      onClick={onFocus}
      onPointerOver={onFocus}
      castShadow
      receiveShadow
    >
      <planeGeometry args={[1.6, 2.4]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
      <Html center>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: active ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-full border border-white/15 bg-black/40 px-4 py-1 text-xs uppercase tracking-[0.28em] text-white/80 backdrop-blur"
        >
          {poster.title}
        </motion.div>
      </Html>
    </mesh>
  );
}
