"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Sparkles,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

function Book({
  position,
  rotation,
  color,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
}) {
  return (
    <Float speed={1.4} rotationIntensity={0.35} floatIntensity={1.1}>
      <group position={position} rotation={rotation}>
        <mesh castShadow>
          <boxGeometry args={[1.15, 0.14, 0.8]} />
          <meshStandardMaterial color={color} metalness={0.35} roughness={0.35} />
        </mesh>
        <mesh position={[0.55, 0, 0]}>
          <boxGeometry args={[0.06, 0.16, 0.82]} />
          <meshStandardMaterial color="#f1a52a" metalness={0.7} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.08, 0]}>
          <boxGeometry args={[1.05, 0.02, 0.72]} />
          <meshStandardMaterial color="#faf7f2" metalness={0.1} roughness={0.6} />
        </mesh>
      </group>
    </Float>
  );
}

function LogoPlane() {
  const texture = useLoader(THREE.TextureLoader, "/brand/logo-white.png");
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = 2.05 + Math.sin(t * 0.8) * 0.12;
    ref.current.rotation.z = Math.sin(t * 0.4) * 0.05;
  });
  return (
    <mesh ref={ref} position={[0, 2.05, 0]}>
      <planeGeometry args={[2.4, 1.2]} />
      <meshBasicMaterial map={texture} transparent opacity={0.92} depthWrite={false} />
    </mesh>
  );
}

function CoreOrb({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current || !mouse.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.25 + mouse.current.x * 0.4;
    ref.current.rotation.x = Math.sin(t * 0.4) * 0.15 + mouse.current.y * 0.3;
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, mouse.current.x * 0.6, 0.05);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, mouse.current.y * 0.35, 0.05);
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.4}>
      <mesh ref={ref} castShadow>
        <icosahedronGeometry args={[1.35, 24]} />
        <MeshDistortMaterial
          color="#623996"
          attach="material"
          distort={0.38}
          speed={2.2}
          roughness={0.15}
          metalness={0.55}
          emissive="#3a1f62"
          emissiveIntensity={0.55}
        />
      </mesh>
      <mesh scale={1.18}>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshBasicMaterial color="#f1a52a" wireframe transparent opacity={0.22} />
      </mesh>
    </Float>
  );
}

function Ring() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.z += d * 0.25;
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2.4, 0.2, 0]}>
      <torusGeometry args={[2.15, 0.035, 16, 120]} />
      <meshStandardMaterial
        color="#f1a52a"
        emissive="#f1a52a"
        emissiveIntensity={0.7}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

function Particles() {
  const count = 180;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    let seed = 42;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (rnd() - 0.5) * 10;
      arr[i * 3 + 1] = (rnd() - 0.5) * 6;
      arr[i * 3 + 2] = (rnd() - 0.5) * 6;
    }
    return arr;
  }, []);
  const ref = useRef<THREE.Points>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.04;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#f5c15d"
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Scene({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  return (
    <>
      <color attach="background" args={["#0d0818"]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 3]} intensity={1.4} color="#fff2d6" castShadow />
      <pointLight position={[-3, 2, -2]} intensity={1.2} color="#8b5fc7" />
      <pointLight position={[2, -1, 2]} intensity={0.8} color="#f1a52a" />
      <CoreOrb mouse={mouse} />
      <Ring />
      <LogoPlane />
      <Book position={[-2.4, 0.8, -0.4]} rotation={[0.3, 0.5, 0.2]} color="#2e1a44" />
      <Book position={[2.3, -0.5, 0.2]} rotation={[-0.25, -0.6, 0.15]} color="#623996" />
      <Book position={[1.6, 1.3, -1]} rotation={[0.5, 0.2, -0.3]} color="#231f20" />
      <Particles />
      <Sparkles count={60} scale={[8, 5, 4]} size={3} speed={0.4} color="#f1a52a" opacity={0.55} />
      <ContactShadows position={[0, -2.1, 0]} opacity={0.45} scale={12} blur={2.5} far={4} color="#0d0818" />
      <Environment preset="night" />
    </>
  );
}

export default function HeroScene() {
  const reduced = usePrefersReducedMotion();
  const mouse = useRef({ x: 0, y: 0 });

  if (reduced) {
    return (
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#623996_0%,_#0d0818_65%)]" />
    );
  }

  return (
    <div
      className="absolute inset-0"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.current.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      }}
    >
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.35, 5.6], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <Scene mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  );
}
