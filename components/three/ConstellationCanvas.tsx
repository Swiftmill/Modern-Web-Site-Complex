"use client";

import { Html, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type skills from "@/app/content/skills.json";

const nodeColors: Record<string, string> = {
  framework: "#8b5cf6",
  lang: "#c084fc",
  motion: "#22d3ee",
  cloud: "#38bdf8",
  "3d": "#f472b6",
  craft: "#facc15"
};

type SkillsContent = typeof skills;

type ConstellationCanvasProps = {
  data: SkillsContent;
};

export function ConstellationCanvas({ data }: ConstellationCanvasProps) {
  const [focusNode, setFocusNode] = useState<string>(data.nodes[0]?.id ?? "");

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black/30">
        <Canvas camera={{ position: [0, 0, 10], fov: 55 }}>
          <color attach="background" args={[0, 0, 0]} />
        <ambientLight intensity={0.8} />
        <pointLight position={[0, 0, 10]} intensity={1.2} color="#8b5cf6" />
        <Suspense fallback={null}>
          <ConstellationGraph data={data} focusNode={focusNode} onFocus={setFocusNode} />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-12 bottom-8 rounded-2xl border border-white/10 bg-black/40 p-4 text-xs text-white/70 backdrop-blur">
        <strong className="font-semibold text-white">{data.nodes.find((node) => node.id === focusNode)?.label}</strong>
        <span className="ml-2 text-white/60">
          {data.links
            .filter((link) => link.source === focusNode || link.target === focusNode)
            .map((link) =>
              link.source === focusNode
                ? data.nodes.find((node) => node.id === link.target)?.label
                : data.nodes.find((node) => node.id === link.source)?.label
            )
            .filter(Boolean)
            .join(" · ") || "Focus sur un nœud pour révéler ses connexions."}
        </span>
      </div>
    </div>
  );
}

type ConstellationGraphProps = {
  data: SkillsContent;
  focusNode: string;
  onFocus: (id: string) => void;
};

function ConstellationGraph({ data, focusNode, onFocus }: ConstellationGraphProps) {
  const nodes = useMemo(() => {
    return data.nodes.map((node, index) => {
      const radius = 3.2;
      const angle = (index / data.nodes.length) * Math.PI * 2;
      const height = Math.sin(angle * 2) * 1.4;
      return {
        ...node,
        position: new THREE.Vector3(
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        )
      };
    });
  }, [data.nodes]);
  const targetPosition = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    targetPosition.set(
      focusNode ? Math.cos(state.clock.elapsedTime * 0.2) * 6 : 0,
      focusNode ? 1.5 : 0,
      focusNode ? Math.sin(state.clock.elapsedTime * 0.2) * 6 : 10
    );
    state.camera.position.lerp(targetPosition, delta * 2);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group>
      {data.links.map((link) => {
        const source = nodes.find((node) => node.id === link.source);
        const target = nodes.find((node) => node.id === link.target);
        if (!source || !target) return null;
        return <Connection key={`${link.source}-${link.target}`} a={source.position} b={target.position} />;
      })}
      {nodes.map((node) => (
        <SkillNode
          key={node.id}
          node={node}
          active={node.id === focusNode}
          onFocus={() => onFocus(node.id)}
        />
      ))}
    </group>
  );
}

type ConnectionProps = {
  a: THREE.Vector3;
  b: THREE.Vector3;
};

function Connection({ a, b }: ConnectionProps) {
  const curve = useMemo(() => new THREE.LineCurve3(a, b), [a, b]);
  const points = curve.getPoints(20);
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  const material = useMemo(
    () => new THREE.LineBasicMaterial({ color: "#38bdf8", transparent: true, opacity: 0.25 }),
    []
  );

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  return (
    <line geometry={geometry} material={material} />
  );
}

type SkillNodeProps = {
  node: {
    id: string;
    label: string;
    category: string;
    position: THREE.Vector3;
  };
  active: boolean;
  onFocus: () => void;
};

function SkillNode({ node, active, onFocus }: SkillNodeProps) {
  const [hovered, setHovered] = useState(false);
  const basePosition = useMemo(() => node.position.clone(), [node.position]);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const oscillation = Math.sin(state.clock.elapsedTime + basePosition.x) * 0.15;
    meshRef.current?.position.set(
      basePosition.x,
      basePosition.y + oscillation,
      basePosition.z
    );
  });

  return (
    <mesh
      ref={meshRef}
      position={basePosition.toArray() as unknown as [number, number, number]}
      onClick={onFocus}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[active ? 0.32 : 0.26, 32, 32]} />
      <meshStandardMaterial
        color={nodeColors[node.category] ?? "#8b5cf6"}
        emissive={nodeColors[node.category] ?? "#8b5cf6"}
        emissiveIntensity={active || hovered ? 0.9 : 0.4}
      />
      <Html center>
        <div className="rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs uppercase tracking-[0.28em] text-white/80 backdrop-blur">
          {node.label}
        </div>
      </Html>
    </mesh>
  );
}
