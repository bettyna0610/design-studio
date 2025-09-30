import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useGLTF } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import { Items } from "./Items";

type StudioCanvasProps = {
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
};

export function Room() {
  const { scene } = useGLTF("src/assets/room.glb");

  return <primitive object={scene} />;
}

export function StudioCanvas({ selectedId, setSelectedId }: StudioCanvasProps) {
  return (
    <Canvas
      shadows
      gl={{ antialias: true }}
      // color/tonemapping defaults left as-is

      camera={{ position: [3, 3, 6], fov: 50 }}
    >
      <Suspense fallback={null}>
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <gridHelper args={[20, 20]} />
        <Room />
        <Items
          count={200}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
        <OrbitControls
          makeDefault
          minPolarAngle={0} 
          maxPolarAngle={Math.PI / 2} 
          minDistance={2} 
          maxDistance={20}
        />
      </Suspense>
    </Canvas>
  );
}
