"use client";

import { EffectComposer, Bloom, FXAA } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

type Quality = "ultra" | "high" | "medium";

type PostFXProps = {
  quality: Quality;
};

export function PostFX({ quality }: PostFXProps) {
  const bloomIntensity = quality === "medium" ? 0.6 : quality === "high" ? 0.75 : 0.95;
  const bloomRadius = quality === "medium" ? 0.7 : 0.9;

  return (
    <EffectComposer multisampling={0} disableNormalPass>
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={0.1}
        luminanceSmoothing={0.3}
        radius={bloomRadius}
        blendFunction={BlendFunction.ADD}
      />
      <FXAA />
    </EffectComposer>
  );
}
