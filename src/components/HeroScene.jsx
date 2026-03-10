import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTheme } from "../context/ThemeContext";
import * as THREE from "three";

function StarField() {
  const { dark } = useTheme();
  const ref = useRef();
  const WHITE_COUNT = 120;
  const DARK_COUNT = 80;
  const TOTAL = WHITE_COUNT + DARK_COUNT;

  const positions = useMemo(() => {
    const pos = new Float32Array(TOTAL * 3);
    for (let i = 0; i < TOTAL; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = -1 - Math.random() * 14;
    }
    return pos;
  }, []);

  const colors = useMemo(() => {
    const col = new Float32Array(TOTAL * 3);
    const white = new THREE.Color("#ffffff");
    const dim = new THREE.Color("#6366f1");
    for (let i = 0; i < TOTAL; i++) {
      const c = i < WHITE_COUNT ? white : dim;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return col;
  }, []);

  const speeds = useMemo(() => {
    const s = new Float32Array(TOTAL);
    for (let i = 0; i < TOTAL; i++) s[i] = 0.001 + Math.random() * 0.004;
    return s;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position;
    const t = clock.elapsedTime;
    for (let i = 0; i < TOTAL; i++) {
      let y = pos.getY(i) + speeds[i];
      if (y > 7) y = -7;
      const drift = Math.sin(t * 0.2 + i * 0.8) * 0.002;
      pos.setX(i, pos.getX(i) + drift);
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={TOTAL}
          array={new Float32Array(positions)}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={TOTAL}
          array={new Float32Array(colors)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={dark ? 0.045 : 0.03}
        vertexColors
        transparent
        opacity={dark ? 0.75 : 0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ═══════ SOFT HALOS ═══════
   Gentle glowing orbs that pulse — white and violet mix */
function SoftHalos() {
  const { dark } = useTheme();
  const ref = useRef();

  const halos = useMemo(
    () => [
      { pos: [-5, 2, -8], color: "#ffffff", size: 2.5, speed: 0.1 },
      { pos: [5, -2, -10], color: "#7c3aed", size: 3, speed: 0.08 },
      { pos: [1, 3, -12], color: "#e2e8f0", size: 3.5, speed: 0.06 },
      { pos: [-3, -3, -9], color: "#4f46e5", size: 2, speed: 0.12 },
    ],
    [],
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (!ref.current) return;
    ref.current.children.forEach((child, i) => {
      const h = halos[i];
      const breathe = 1 + Math.sin(t * h.speed * 2.5 + i * 1.8) * 0.12;
      child.scale.setScalar(breathe);
      child.position.y = h.pos[1] + Math.sin(t * h.speed + i * 1.3) * 0.6;
      child.position.x = h.pos[0] + Math.cos(t * h.speed * 0.7 + i) * 0.3;
    });
  });

  return (
    <group ref={ref}>
      {halos.map((h, i) => (
        <mesh key={i} position={h.pos}>
          <sphereGeometry args={[h.size, 24, 24]} />
          <meshBasicMaterial
            color={h.color}
            transparent
            opacity={dark ? 0.025 : 0.015}
            toneMapped={false}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ═══════ FLOATING DUST ═══════
   Tiny bright white specks close to camera — adds micro-detail depth */
function FloatingDust() {
  const { dark } = useTheme();
  const ref = useRef();
  const COUNT = 60;

  const positions = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = -0.5 - Math.random() * 4;
    }
    return pos;
  }, []);

  const speeds = useMemo(() => {
    const s = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) s[i] = 0.002 + Math.random() * 0.005;
    return s;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position;
    const t = clock.elapsedTime;
    for (let i = 0; i < COUNT; i++) {
      let y = pos.getY(i) - speeds[i]; // fall down
      if (y < -4) y = 4;
      const sway = Math.sin(t * 0.5 + i * 1.2) * 0.002;
      pos.setX(i, pos.getX(i) + sway);
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={COUNT}
          array={new Float32Array(positions)}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#ffffff"
        transparent
        opacity={dark ? 0.35 : 0.12}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ═══════ MAIN EXPORT ═══════ */
export default function HeroScene() {
  const { dark } = useTheme();
  const bg = dark ? "#080c18" : "#f8fafc";

  return (
    <div className="relative w-full h-full">
      {/* Animated shadow for dark mode */}
      {dark && (
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 60% 40%, rgba(80,88,149,0.22) 0%, rgba(20,20,40,0.85) 70%, rgba(8,12,24,1) 100%)",
            filter: "blur(8px)",
            animation: "shadowPulse 6s ease-in-out infinite",
          }}
        />
      )}
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        style={{ position: "absolute", inset: 0 }}
        gl={{ antialias: false, alpha: false }}
      >
        <color attach="background" args={[bg]} />
        <fog attach="fog" args={[bg, 5, 20]} />
        <StarField />
        <SoftHalos />
        <FloatingDust />
      </Canvas>
      <style>{`
        @keyframes shadowPulse {
          0%, 100% { opacity: 0.85; filter: blur(8px); }
          50% { opacity: 1; filter: blur(16px); }
        }
      `}</style>
    </div>
  );
}
