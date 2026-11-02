"use client";
export default function BarberObject3D() {
  return (
    <group rotation={[0, 0, -0.35]}>
      <mesh position={[0, -0.65, 0]}>
        <capsuleGeometry args={[0.16, 0.95, 4, 12]} />
        <meshStandardMaterial color="#25221c" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.5, 0.85, 0.17]} />
        <meshStandardMaterial
          color="#d6a34a"
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[0.56, 0.18, 0.2]} />
        <meshStandardMaterial color="#b8b8b8" metalness={0.9} roughness={0.2} />
      </mesh>
      {Array.from({ length: 10 }, (_, i) => (
        <mesh key={i} position={[-0.25 + i * 0.055, 0.94, 0]}>
          <boxGeometry args={[0.025, 0.15, 0.18]} />
          <meshStandardMaterial color="#bbb" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}
      <mesh position={[0, -0.05, 0.1]}>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshStandardMaterial color="#d6a34a" />
      </mesh>
    </group>
  );
}
