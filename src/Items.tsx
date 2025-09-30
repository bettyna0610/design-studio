import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";
import { TransformControls } from "@react-three/drei"; 



type ItemsProps = {
  count?: number;
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
};

export function Items({ count = 200, selectedId, setSelectedId }: ItemsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const selectedRef = useRef<THREE.Mesh>(null!);

  const geometry = useMemo(() => new THREE.BoxGeometry(0.2, 0.2, 0.2), []);
  const material = useMemo(
    () => new THREE.MeshStandardMaterial({ color: 0xffffff }),
    []
  );

 const [positions, setPositions] = useState<THREE.Matrix4[]>([]);

useEffect(() => {
  const arr: THREE.Matrix4[] = [];
  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * 8;
    const y = 0.1;
    const z = (Math.random() - 0.5) * 8;
    const matrix = new THREE.Matrix4();
    matrix.setPosition(x, y, z);
    arr.push(matrix);
  }
  setPositions(arr);
}, [count]);

  

  const handleClick = (e: any) => {
    e.stopPropagation();
    setSelectedId(e.instanceId ?? null);
  };

  const handleTransformEnd = () => {
    if (selectedId !== null && selectedRef.current) {
      const newMatrix = new THREE.Matrix4();
      newMatrix.setPosition(selectedRef.current.position);
      const newPositions = [...positions];
      newPositions[selectedId] = newMatrix;
      setPositions(newPositions);
    }
  };

  useEffect(() => {
  if (!meshRef.current || positions.length === 0) return;
  positions.forEach((matrix, i) => {
    meshRef.current.setMatrixAt(i, matrix);
  });
  meshRef.current.instanceMatrix.needsUpdate = true;
}, [positions]);


  useEffect(() => {
    if (selectedId !== null && positions[selectedId]) {
      const pos = new THREE.Vector3();
      positions[selectedId].decompose(pos, new THREE.Quaternion(), new THREE.Vector3());
      if (selectedRef.current) {
        selectedRef.current.position.copy(pos);
      }
    }
  }, [selectedId, positions]);

  return (
    <>
      <instancedMesh
        ref={meshRef}
        args={[geometry, material, count]}
        onClick={handleClick}
        castShadow
        receiveShadow
      />
          {selectedId !== null && (
        <TransformControls
          object={selectedRef.current}
          mode="translate"
          onMouseUp={handleTransformEnd}
          makeDefault={false}
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
