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

export function Items({
  items,
  selectedId,
  setSelectedId,
  updateItemPosition,
}: ItemsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const selectedRef = useRef<THREE.Mesh>(null!);

  const geometry = useMemo(() => new THREE.BoxGeometry(0.2, 0.2, 0.2), []);
  const material = useMemo(
    () => new THREE.MeshStandardMaterial({ vertexColors: true }),
    []
  );

  useEffect(() => {
    if (!meshRef.current) return;

    if (!meshRef.current.geometry.getAttribute("instanceColor")) {
      const colors = new Float32Array(items.length * 3);
      meshRef.current.geometry.setAttribute(
        "instanceColor",
        new THREE.InstancedBufferAttribute(colors, 3)
      );
    }

    const color = new THREE.Color();

    items.forEach((item, i) => {
      if (item.id === 5) {
        console.log("Item id 5 color:", item.color);
      }

     
      const matrix = new THREE.Matrix4();
      matrix.setPosition(...item.position);
      meshRef.current.setMatrixAt(i, matrix);

     
      color.set(item.color);
      meshRef.current.setColorAt(i, color);
    });

    meshRef.current.count = items.length;
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [items]);

  useFrame(() => {
  if (selectedId !== null && selectedRef.current) {
    selectedRef.current.position.y = 0.1; // ✅ glue to floor
  }
});

  
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