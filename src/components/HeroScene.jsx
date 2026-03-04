import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';

function DataSphere() {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * 0.1;
    ref.current.rotation.y = state.clock.elapsedTime * 0.15;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={1}>
      <mesh ref={ref} scale={1.6}>
        <icosahedronGeometry args={[1, 3]} />
        <meshStandardMaterial
          color="#6366f1"
          wireframe
          roughness={0.2}
          metalness={0.8}
          emissive="#4f46e5"
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
}

function OrbitRing({ radius, speed, color }) {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.x = Math.PI / 2;
    ref.current.rotation.z = state.clock.elapsedTime * speed;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.008, 16, 100]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.4} />
    </mesh>
  );
}

function DataParticles({ count = 200 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) arr[i] = (Math.random() - 0.5) * 18;
    return arr;
  }, [count]);
  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.015;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#818cf8" sizeAttenuation transparent opacity={0.7} />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5.5], fov: 55 }} dpr={[1, 2]} style={{ position: 'absolute', inset: 0 }}>
      <fog attach="fog" args={['#0f0a1e', 5, 22]} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#e0e7ff" />
      <pointLight position={[-4, -3, 2]} intensity={0.6} color="#818cf8" />

      <DataSphere />
      <OrbitRing radius={2.2} speed={0.2} color="#6366f1" />
      <OrbitRing radius={2.8} speed={-0.15} color="#a78bfa" />
      <OrbitRing radius={3.3} speed={0.1} color="#818cf8" />
      <DataParticles count={300} />
      <Stars radius={12} depth={50} count={800} factor={3} fade speed={0.4} />
    </Canvas>
  );
}
