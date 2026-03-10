import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from '../context/ThemeContext';
import * as THREE from 'three';

/* ── Wrapper: lazy-mounts canvas & passes theme to children ── */
function LazyCanvas({ children, className = '' }) {
  const { dark } = useTheme();
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { rootMargin: '200px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`absolute inset-0 pointer-events-none ${className}`}>
      {visible && (
        <>
          <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 5], fov: 50 }}
            style={{ position: 'absolute', inset: 0, opacity: dark ? 1 : 0.5 }}
            gl={{ antialias: false, alpha: true }}
          >
            <ambientLight intensity={dark ? 0.3 : 0.4} />
            {children}
          </Canvas>
          {/* Top / bottom gradient fades for smooth section blending */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white dark:from-[#0f172a] to-transparent z-10" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent z-10" />
        </>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   ABOUT — Floating Bokeh Orbs
   Soft glowing spheres drifting at various depths
   ═══════════════════════════════════════════════════ */
function BokehOrbs() {
  const { dark } = useTheme();
  const group = useRef();

  const orbs = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 22; i++) {
      const depth = -1 - Math.random() * 6;
      arr.push({
        pos: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 6,
          depth,
        ],
        size: 0.08 + Math.random() * 0.35,
        speed: 0.15 + Math.random() * 0.35,
        phase: Math.random() * Math.PI * 2,
        color: ['#7c3aed', '#a78bfa', '#6366f1', '#8b5cf6', '#c4b5fd', '#505895'][
          Math.floor(Math.random() * 6)
        ],
      });
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      if (!orbs[i]) return;
      const o = orbs[i];
      child.position.x = o.pos[0] + Math.sin(t * o.speed * 0.4 + o.phase) * 0.6;
      child.position.y = o.pos[1] + Math.sin(t * o.speed * 0.3 + o.phase * 1.5) * 0.4;
      // Gentle pulsing scale
      const pulse = 1 + Math.sin(t * o.speed + o.phase) * 0.15;
      child.scale.setScalar(pulse);
    });
  });

  return (
    <group ref={group}>
      {orbs.map((o, i) => (
        <mesh key={i} position={o.pos}>
          <sphereGeometry args={[o.size, 16, 16]} />
          <meshStandardMaterial
            color={o.color}
            emissive={o.color}
            emissiveIntensity={dark ? 0.6 : 0.15}
            transparent
            opacity={dark ? (0.12 + o.size * 0.25) : (0.08 + o.size * 0.15)}
            roughness={1}
            metalness={0}
          />
        </mesh>
      ))}
    </group>
  );
}

export function AboutBg() {
  return (
    <LazyCanvas>
      <BokehOrbs />
    </LazyCanvas>
  );
}

/* ═══════════════════════════════════════════════════
   SKILLS — Constellation Network
   Nodes with pulsing connections that form and break
   ═══════════════════════════════════════════════════ */
function ConstellationNet() {
  const { dark } = useTheme();
  const nodesRef = useRef();
  const linesRef = useRef();
  const COUNT = 40;
  const MAX_DIST = 2.5;

  const { basePositions, velocities } = useMemo(() => {
    const bp = new Float32Array(COUNT * 3);
    const vel = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      bp[i * 3] = (Math.random() - 0.5) * 10;
      bp[i * 3 + 1] = (Math.random() - 0.5) * 6;
      bp[i * 3 + 2] = -1 - Math.random() * 4;
      vel[i * 3] = (Math.random() - 0.5) * 0.008;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.006;
      vel[i * 3 + 2] = 0;
    }
    return { basePositions: bp, velocities: vel };
  }, []);

  // Pre-allocate line geometry for max possible edges
  const maxEdges = COUNT * 4;
  const linePositions = useMemo(() => new Float32Array(maxEdges * 6), []);
  const lineColors = useMemo(() => new Float32Array(maxEdges * 6), []);

  const lineGeoRef = useRef();

  useFrame(() => {
    const pos = nodesRef.current.geometry.attributes.position;

    // Move nodes
    for (let i = 0; i < COUNT; i++) {
      let x = pos.getX(i) + velocities[i * 3];
      let y = pos.getY(i) + velocities[i * 3 + 1];
      // Bounce off edges
      if (x > 5 || x < -5) velocities[i * 3] *= -1;
      if (y > 3 || y < -3) velocities[i * 3 + 1] *= -1;
      pos.setX(i, x);
      pos.setY(i, y);
    }
    pos.needsUpdate = true;

    // Build edges dynamically
    let edgeIdx = 0;
    const c1 = dark ? [0.49, 0.23, 0.93] : [0.31, 0.16, 0.85]; // #7c3aed / #5028d9
    const c2 = dark ? [0.66, 0.55, 0.79] : [0.39, 0.24, 0.62]; // #a88cc9 / #633d9e

    for (let i = 0; i < COUNT && edgeIdx < maxEdges; i++) {
      for (let j = i + 1; j < COUNT && edgeIdx < maxEdges; j++) {
        const ax = pos.getX(i), ay = pos.getY(i), az = pos.getZ(i);
        const bx = pos.getX(j), by = pos.getY(j), bz = pos.getZ(j);
        const dx = ax - bx, dy = ay - by, dz = az - bz;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < MAX_DIST) {
          const fade = 1 - dist / MAX_DIST;
          const idx = edgeIdx * 6;
          linePositions[idx] = ax;
          linePositions[idx + 1] = ay;
          linePositions[idx + 2] = az;
          linePositions[idx + 3] = bx;
          linePositions[idx + 4] = by;
          linePositions[idx + 5] = bz;
          // Color with fade
          const alpha = fade * (dark ? 0.6 : 0.3);
          lineColors[idx] = c1[0] * alpha;
          lineColors[idx + 1] = c1[1] * alpha;
          lineColors[idx + 2] = c1[2] * alpha;
          lineColors[idx + 3] = c2[0] * alpha;
          lineColors[idx + 4] = c2[1] * alpha;
          lineColors[idx + 5] = c2[2] * alpha;
          edgeIdx++;
        }
      }
    }

    // Zero out unused edges
    for (let i = edgeIdx * 6; i < maxEdges * 6; i++) {
      linePositions[i] = 0;
      lineColors[i] = 0;
    }

    if (lineGeoRef.current) {
      lineGeoRef.current.attributes.position.needsUpdate = true;
      lineGeoRef.current.attributes.color.needsUpdate = true;
      lineGeoRef.current.setDrawRange(0, edgeIdx * 2);
    }
  });

  return (
    <>
      {/* Dynamic connection lines */}
      <lineSegments>
        <bufferGeometry ref={lineGeoRef}>
          <bufferAttribute attach="attributes-position" count={maxEdges * 2} array={linePositions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={maxEdges * 2} array={lineColors} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={dark ? 0.35 : 0.12} />
      </lineSegments>
      {/* Nodes */}
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={COUNT} array={basePositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={dark ? 0.06 : 0.04}
          color="#a78bfa"
          transparent
          opacity={dark ? 0.5 : 0.2}
          sizeAttenuation
        />
      </points>
    </>
  );
}

export function SkillsBg() {
  return (
    <LazyCanvas>
      <ConstellationNet />
    </LazyCanvas>
  );
}

/* ═══════════════════════════════════════════════════
   PROJECTS — Holographic Glass Prisms
   Floating geometric shapes with glass-like material
   ═══════════════════════════════════════════════════ */
function GlassPrisms() {
  const { dark } = useTheme();
  const group = useRef();

  const prisms = useMemo(() => [
    { pos: [-3.2, 1.5, -2], size: 0.7, type: 'octa', speed: 0.3, phase: 0, color: '#7c3aed' },
    { pos: [3.5, -0.8, -3], size: 0.9, type: 'icosa', speed: 0.2, phase: 1.5, color: '#6366f1' },
    { pos: [-1.5, -1.8, -2.5], size: 0.55, type: 'dodeca', speed: 0.35, phase: 3, color: '#8b5cf6' },
    { pos: [1.8, 2, -4], size: 1.1, type: 'octa', speed: 0.15, phase: 4.5, color: '#505895' },
    { pos: [0.3, -0.5, -1.5], size: 0.4, type: 'tetra', speed: 0.4, phase: 2, color: '#a78bfa' },
    { pos: [-4, -0.5, -3.5], size: 0.65, type: 'icosa', speed: 0.25, phase: 5, color: '#9689c6' },
  ], []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (!group.current) return;
    group.current.children.forEach((child, i) => {
      const p = prisms[i];
      if (!p) return;
      child.rotation.x = t * p.speed * 0.5 + p.phase;
      child.rotation.y = t * p.speed * 0.7 + p.phase;
      child.position.y = p.pos[1] + Math.sin(t * p.speed + p.phase) * 0.3;
      child.position.x = p.pos[0] + Math.sin(t * p.speed * 0.5 + p.phase) * 0.15;
    });
  });

  const Geo = ({ type, size }) => {
    switch (type) {
      case 'octa': return <octahedronGeometry args={[size, 0]} />;
      case 'icosa': return <icosahedronGeometry args={[size, 0]} />;
      case 'dodeca': return <dodecahedronGeometry args={[size, 0]} />;
      case 'tetra': return <tetrahedronGeometry args={[size, 0]} />;
      default: return <octahedronGeometry args={[size, 0]} />;
    }
  };

  return (
    <group ref={group}>
      {prisms.map((p, i) => (
        <group key={i} position={p.pos}>
          {/* Solid fill */}
          <mesh>
            <Geo type={p.type} size={p.size} />
            <meshStandardMaterial
              color={p.color}
              emissive={p.color}
              emissiveIntensity={dark ? 0.3 : 0.08}
              transparent
              opacity={dark ? 0.06 : 0.04}
              roughness={0.1}
              metalness={0.8}
            />
          </mesh>
          {/* Wireframe overlay */}
          <mesh>
            <Geo type={p.type} size={p.size * 1.002} />
            <meshStandardMaterial
              color={p.color}
              emissive={p.color}
              emissiveIntensity={dark ? 0.8 : 0.2}
              wireframe
              transparent
              opacity={dark ? 0.35 : 0.2}
            />
          </mesh>
        </group>
      ))}
      {/* Subtle point light for glow */}
      <pointLight position={[0, 0, 2]} intensity={dark ? 0.4 : 0.2} color="#7c3aed" distance={8} />
    </group>
  );
}

export function ProjectsBg() {
  return (
    <LazyCanvas>
      <GlassPrisms />
    </LazyCanvas>
  );
}

/* ═══════════════════════════════════════════════════
   EXPERIENCE — Aurora Light Streams
   Flowing ribbon-like streams of light
   ═══════════════════════════════════════════════════ */
function AuroraStreams() {
  const { dark } = useTheme();
  const streamsRef = useRef([]);
  const STREAMS = 5;
  const SEGMENTS = 64;

  const streamData = useMemo(() => {
    const data = [];
    for (let s = 0; s < STREAMS; s++) {
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(SEGMENTS * 3);
      const baseY = (s - (STREAMS - 1) / 2) * 1.5;
      for (let i = 0; i < SEGMENTS; i++) {
        const x = (i / (SEGMENTS - 1)) * 12 - 6;
        positions[i * 3] = x;
        positions[i * 3 + 1] = baseY;
        positions[i * 3 + 2] = -2 - s * 0.5;
      }
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      data.push({
        geo,
        baseY,
        speed: 0.3 + s * 0.1,
        amplitude: 0.4 + s * 0.15,
        phase: s * 1.2,
        color: ['#7c3aed', '#a78bfa', '#6366f1', '#8b5cf6', '#505895'][s],
      });
    }
    return data;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    streamData.forEach((stream, si) => {
      const pos = stream.geo.attributes.position;
      for (let i = 0; i < SEGMENTS; i++) {
        const x = pos.getX(i);
        const wave1 = Math.sin(x * 0.5 + t * stream.speed + stream.phase) * stream.amplitude;
        const wave2 = Math.sin(x * 0.3 + t * stream.speed * 0.7 + stream.phase * 2) * stream.amplitude * 0.5;
        const wave3 = Math.sin(x * 0.8 + t * stream.speed * 1.3) * stream.amplitude * 0.3;
        pos.setY(i, stream.baseY + wave1 + wave2 + wave3);
      }
      pos.needsUpdate = true;
    });
  });

  return (
    <>
      {streamData.map((stream, i) => (
        <line key={i} geometry={stream.geo}>
          <lineBasicMaterial
            color={stream.color}
            transparent
            opacity={dark ? 0.25 : 0.12}
            linewidth={1}
          />
        </line>
      ))}
      {/* Ambient particles along streams */}
      <StreamParticles dark={dark} />
    </>
  );
}

function StreamParticles({ dark }) {
  const ref = useRef();
  const COUNT = 50;

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 5;
      arr[i * 3 + 2] = -1 - Math.random() * 4;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position;
    for (let i = 0; i < COUNT; i++) {
      let x = pos.getX(i) + 0.005;
      if (x > 6) x = -6;
      pos.setX(i, x);
      pos.setY(i, pos.getY(i) + Math.sin(t + i) * 0.002);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={COUNT} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#c4b5fd"
        transparent
        opacity={dark ? 0.5 : 0.25}
        sizeAttenuation
      />
    </points>
  );
}

export function ExperienceBg() {
  return (
    <LazyCanvas>
      <AuroraStreams />
    </LazyCanvas>
  );
}

/* ═══════════════════════════════════════════════════
   EDUCATION — Orbital Atom
   Electron-like particles orbiting a glowing nucleus
   ═══════════════════════════════════════════════════ */
function OrbitalAtom() {
  const { dark } = useTheme();
  const ringsRef = useRef([]);
  const electronsRef = useRef([]);
  const nucleusRef = useRef();

  const rings = useMemo(() => [
    { radius: 2.0, tilt: [0.3, 0, 0], speed: 0.6, color: '#7c3aed' },
    { radius: 2.5, tilt: [0.8, 0.5, 0.2], speed: 0.45, color: '#a78bfa' },
    { radius: 3.0, tilt: [-0.4, 1.0, 0.3], speed: 0.35, color: '#6366f1' },
  ], []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    // Rotate rings
    ringsRef.current.forEach((ring, i) => {
      if (!ring) return;
      ring.rotation.z = t * rings[i].speed * 0.3;
    });
    // Move electrons along ring paths
    electronsRef.current.forEach((el, i) => {
      if (!el) return;
      const r = rings[i];
      const angle = t * r.speed;
      el.position.x = Math.cos(angle) * r.radius;
      el.position.y = Math.sin(angle) * r.radius;
    });
    // Pulse nucleus
    if (nucleusRef.current) {
      nucleusRef.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.08);
    }
  });

  // Ring geometry helper
  const RingMesh = ({ radius, color, tilt, idx }) => {
    const geo = useMemo(() => {
      const pts = [];
      for (let i = 0; i <= 128; i++) {
        const angle = (i / 128) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0));
      }
      return new THREE.BufferGeometry().setFromPoints(pts);
    }, [radius]);

    return (
      <group rotation={tilt} ref={el => { ringsRef.current[idx] = el; }}>
        <line geometry={geo}>
          <lineBasicMaterial color={color} transparent opacity={dark ? 0.2 : 0.1} />
        </line>
        {/* Electron */}
        <mesh ref={el => { electronsRef.current[idx] = el; }}>
          <sphereGeometry args={[0.08, 12, 12]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={dark ? 1.2 : 0.3}
            transparent
            opacity={dark ? 0.9 : 0.6}
          />
        </mesh>
      </group>
    );
  };

  return (
    <group position={[2.5, 0, -1]}>
      {/* Nucleus */}
      <mesh ref={nucleusRef}>
        <icosahedronGeometry args={[0.35, 2]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#7c3aed"
          emissiveIntensity={dark ? 0.8 : 0.2}
          transparent
          opacity={dark ? 0.3 : 0.15}
          wireframe
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#7c3aed"
          emissiveIntensity={dark ? 0.6 : 0.15}
          transparent
          opacity={dark ? 0.5 : 0.25}
        />
      </mesh>
      {/* Orbital rings with electrons */}
      {rings.map((r, i) => (
        <RingMesh key={i} idx={i} radius={r.radius} color={r.color} tilt={r.tilt} />
      ))}
      <pointLight position={[0, 0, 1]} intensity={dark ? 0.5 : 0.2} color="#7c3aed" distance={6} />
    </group>
  );
}

export function EducationBg() {
  return (
    <LazyCanvas>
      <OrbitalAtom />
    </LazyCanvas>
  );
}

/* ═══════════════════════════════════════════════════
   CONTACT — Ripple Waves + Floating Particles
   Concentric expanding rings with particle field
   ═══════════════════════════════════════════════════ */
function RippleField() {
  const { dark } = useTheme();
  const ringsRef = useRef([]);
  const particlesRef = useRef();
  const RING_COUNT = 4;
  const PARTICLE_COUNT = 60;

  const ringData = useMemo(() => {
    const arr = [];
    for (let i = 0; i < RING_COUNT; i++) {
      arr.push({
        startRadius: 0.3,
        maxRadius: 4.5,
        speed: 0.4 + i * 0.08,
        phase: (i / RING_COUNT) * Math.PI * 2,
        color: ['#7c3aed', '#a78bfa', '#6366f1', '#8b5cf6'][i],
      });
    }
    return arr;
  }, []);

  const particlePositions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 0.5 + Math.random() * 4;
      arr[i * 3] = Math.cos(angle) * r;
      arr[i * 3 + 1] = Math.sin(angle) * r;
      arr[i * 3 + 2] = -1 - Math.random() * 3;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    // Expand and fade rings
    ringsRef.current.forEach((ring, i) => {
      if (!ring) return;
      const d = ringData[i];
      const progress = ((t * d.speed + d.phase) % (Math.PI * 2)) / (Math.PI * 2);
      const radius = d.startRadius + (d.maxRadius - d.startRadius) * progress;
      ring.scale.setScalar(radius);
      ring.material.opacity = (1 - progress) * (dark ? 0.3 : 0.15);
    });
    // Float particles
    if (particlesRef.current) {
      const pos = particlesRef.current.geometry.attributes.position;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pos.setY(i, pos.getY(i) + Math.sin(t * 0.5 + i * 0.3) * 0.003);
        pos.setX(i, pos.getX(i) + Math.cos(t * 0.3 + i * 0.5) * 0.002);
      }
      pos.needsUpdate = true;
    }
  });

  // Ring geometry (unit circle)
  const ringGeo = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 96; i++) {
      const a = (i / 96) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a), Math.sin(a), 0));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  return (
    <group position={[0, 0, -2]}>
      {/* Expanding rings */}
      {ringData.map((d, i) => (
        <line
          key={i}
          ref={el => { ringsRef.current[i] = el; }}
          geometry={ringGeo}
        >
          <lineBasicMaterial color={d.color} transparent opacity={0.3} />
        </line>
      ))}
      {/* Center glow */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#7c3aed"
          emissiveIntensity={dark ? 0.8 : 0.2}
          transparent
          opacity={dark ? 0.4 : 0.2}
        />
      </mesh>
      {/* Particle field */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={particlePositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#c4b5fd"
          transparent
          opacity={dark ? 0.5 : 0.25}
          sizeAttenuation
        />
      </points>
      <pointLight position={[0, 0, 1]} intensity={dark ? 0.3 : 0.15} color="#7c3aed" distance={6} />
    </group>
  );
}

export function ContactBg() {
  return (
    <LazyCanvas>
      <RippleField />
    </LazyCanvas>
  );
}
