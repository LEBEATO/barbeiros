"use client";
import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import BarberObject3D from "./BarberObject3D";
export default function Scene3D() {
  return (
    <div className="three-scene" aria-hidden="true">
      <Canvas
        frameloop="demand"
        dpr={1}
        camera={{ position: [0, 0, 4], fov: 36 }}
        gl={{ antialias: false, powerPreference: "low-power" }}
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[3, 4, 4]} intensity={4} />
        <BarberObject3D />
        <ContactShadows
          position={[0, -1.4, 0]}
          opacity={0.3}
          scale={4}
          blur={2}
          far={3}
        />
      </Canvas>
      <span>PRECISÃO EM CADA DETALHE</span>
    </div>
  );
}
