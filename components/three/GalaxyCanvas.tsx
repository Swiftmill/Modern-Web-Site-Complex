"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useState } from "react";
import { Stars } from "./Stars";
import { Nebula } from "./Nebula";
import { Planets } from "./Planets";
import { PostFX } from "./PostFX";
import { usePerformance } from "@/lib/perf/usePerformance";

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && canvas.getContext("webgl"));
  } catch (error) {
    return false;
  }
}

type GalaxyCanvasProps = {
  className?: string;
};

function GalaxyCanvas({ className }: GalaxyCanvasProps) {
  const quality = usePerformance();
  const [webglReady, setWebglReady] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setWebglReady(isWebGLAvailable());
  }, []);

  const fallbackMedia = useMemo(
    () => ({
      image: "/media/galaxy-fallback.svg"
    }),
    []
  );

  if (webglReady === false) {
    return (
      <div className={`absolute inset-0 ${className ?? ""}`}>
        <img
          src={fallbackMedia.image}
          alt="Galaxie statique"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  if (webglReady === null) {
    return <div className={`absolute inset-0 bg-black/80 ${className ?? ""}`} />;
  }

  return (
    <div className={`absolute inset-0 ${className ?? ""}`}>
      <Canvas camera={{ position: [0, 0, 14], fov: 60 }} dpr={[1, 1.8]}>
        <color attach="background" args={[0, 0, 0]} />
        <Suspense fallback={null}>
          <Stars quality={quality} />
          <Nebula />
          <Planets />
          <PostFX quality={quality} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default GalaxyCanvas;
