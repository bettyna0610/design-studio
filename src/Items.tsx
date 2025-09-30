import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { TransformControls } from "@react-three/drei";

type Item = { id: number; position: [number, number, number] };

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
    () => new THREE.MeshStandardMaterial({ color: 0xffffff }),
    []
  );


  useEffect(() => {
    if (!meshRef.current) return;
    items.forEach((item, i) => {
      const matrix = new THREE.Matrix4();
      matrix.setPosition(...item.position);
      meshRef.current.setMatrixAt(i, matrix);
    });
    meshRef.current.count = items.length; 
    meshRef.current.instanceMatrix.needsUpdate = true;
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
        >
          <mesh ref={selectedRef}>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshStandardMaterial color="yellow" />
          </mesh>
        </TransformControls>
      )}
    </>
  );
}
