import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useGLTF } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import { Items } from "./Items";
import type { Item } from "./types";

export function Room() {
  const { scene } = useGLTF("/room.glb");

  return <primitive object={scene} />;
}

type StudioCanvasProps = {
  items: Item[];
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
  updateItemPosition: (id: number, pos: [number, number, number]) => void;
};

export function StudioCanvas({
  items,
  selectedId,
  setSelectedId,
  updateItemPosition,
}: StudioCanvasProps) {
  return (
    <Canvas
      shadows
      gl={{ antialias: true }}
      // color/tonemapping defaults left as-is

      camera={{ position: [3, 3, 6], fov: 50 }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <gridHelper args={[20, 20]} />
        <Room />
        <Items
          items={items}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          updateItemPosition={updateItemPosition}
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
