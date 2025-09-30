import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useGLTF } from "@react-three/drei";


export function Room() {
  const { scene } = useGLTF("src/assets/room_v1.glb");

  return <primitive object={scene} />;
}

export function StudioCanvas() {
  return (
    <Canvas shadows gl={{ antialias: true }}
// color/tonemapping defaults left as-is

camera={{ position: [3, 3, 6], fov: 50 }}>
      <Suspense fallback={null}>        
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow/>
  <Room />
      </Suspense>
    </Canvas>
  );
}
