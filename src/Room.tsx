import { useGLTF } from "@react-three/drei";


type RoomProps = {
  onFloorClick: (pos: [number, number, number]) => void;
};

export function Room({ onFloorClick }: RoomProps) {
     const { scene } = useGLTF("src/assets/room.glb");
     
  return (
    <group>
      <primitive object={scene} />
      <mesh
        rotation-x={-Math.PI / 2}
        onClick={(e) => {
          e.stopPropagation();
          const { x, z } = e.point;
          onFloorClick([x, 0.1, z]);
        }}
      >
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
}
