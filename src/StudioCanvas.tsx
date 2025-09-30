import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useGLTF } from "@react-three/drei";


export function Room() {
  const { scene } = useGLTF("src/assets/room_v1.glb");

  return <primitive object={scene} />;
}

export function StudioCanvas() {
  return (
    <Canvas shadows camera={{ position: [0, 2, 10] }}>
      <Suspense fallback={null}>        
        <directionalLight position={[5, 5, 5]} intensity={1} />
  <Room />
      </Suspense>
    </Canvas>
  );
}
