import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import type { Item } from "./types";
import { TransformControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

type ItemsProps = {
  items: Item[];
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
  updateItemPosition: (id: number, pos: [number, number, number]) => void;
};

export function Items({ items, selectedId, setSelectedId,updateItemPosition }: ItemsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const selectedRef = useRef<THREE.Mesh>(null!);

  const geometry = useMemo(() => new THREE.BoxGeometry(0.2, 0.2, 0.2), []);
  const material = useMemo(
  () => new THREE.MeshBasicMaterial({ color: "white" }),
  []
);

useFrame(() => {
  if (selectedId !== null && selectedRef.current) {
    selectedRef.current.position.y = 0.1; // ✅ glue to floor
  }
});

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    if (!mesh.instanceColor || mesh.instanceColor.count !== items.length) {
      mesh.instanceColor = new THREE.InstancedBufferAttribute(
        new Float32Array(items.length * 3),
        3
      );
      mesh.geometry.setAttribute("instanceColor", mesh.instanceColor);
      console.log("🔧 instanceColor allocated", mesh.instanceColor.count);
    }

    const matrix = new THREE.Matrix4();
    const color = new THREE.Color();

    items.forEach((item, i) => {
      matrix.setPosition(...item.position);
      mesh.setMatrixAt(i, matrix);

      color.set(item.color);
      mesh.setColorAt(i, color);
    });

    mesh.count = items.length;
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

    console.log("✅ Items updated, first color:", items[0]?.color);
  }, [items]);

  useEffect(() => {
    if (selectedId !== null) {
      const selected = items.find((it) => it.id === selectedId);
      if (selected && selectedRef.current) {
        selectedRef.current.position.set(...selected.position);
      }
    }
  }, [selectedId, items]);

  const handleClick = (e: any) => {
    e.stopPropagation();
    setSelectedId(e.instanceId ?? null);
  };

  const handleTransformEnd = () => {
    if (selectedId !== null && selectedRef.current) {
      const pos = selectedRef.current.position.toArray() as [
        number,
        number,
        number
      ];


      updateItemPosition(selectedId, pos);
    }
  };

  return (
     <>
      <instancedMesh
        ref={meshRef}
        args={[geometry, material, items.length]}
        onClick={handleClick}
        castShadow
        receiveShadow
      />

      {selectedId !== null && (
        <TransformControls
          object={selectedRef.current}
          mode="translate"
          onMouseUp={handleTransformEnd}
          showY={false}
        >
         
          <mesh ref={selectedRef} scale={[1.1, 1.1, 1.1]}>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshBasicMaterial color="yellow" wireframe />
          </mesh>
        </TransformControls>
      )}
    </>
  );
}