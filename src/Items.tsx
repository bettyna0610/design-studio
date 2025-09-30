import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";


type ItemsProps = {
  count?: number;
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
};

export function Items({ count = 200, selectedId, setSelectedId }: ItemsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const highlightRef = useRef<THREE.Mesh>(null!);

  const geometry = useMemo(() => new THREE.BoxGeometry(0.2, 0.2, 0.2), []);
  const material = useMemo(
    () => new THREE.MeshStandardMaterial({ color: 0xffffff }),
    []
  );

  const positions = useMemo(() => {
    const arr: THREE.Matrix4[] = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 8;
      const y = 0.1;
      const z = (Math.random() - 0.5) * 8;
      const matrix = new THREE.Matrix4();
      matrix.setPosition(x, y, z);
      arr.push(matrix);
    }
    return arr;
  }, [count]);

  

  const handleClick = (e: any) => {
    e.stopPropagation();
    setSelectedId(e.instanceId ?? null);
  };

  useEffect(() => {
    positions.forEach((matrix, i) => {
      meshRef.current.setMatrixAt(i, matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [positions]);

  useEffect(() => {
    if (selectedId !== null && positions[selectedId]) {
      const matrix = new THREE.Matrix4();
      meshRef.current.getMatrixAt(selectedId, matrix);

      const pos = new THREE.Vector3();
      const quat = new THREE.Quaternion();
      const scale = new THREE.Vector3();
      matrix.decompose(pos, quat, scale);

      highlightRef.current.position.copy(pos);
      highlightRef.current.visible = true;
    } else {
      highlightRef.current.visible = false;
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
      <mesh ref={highlightRef} scale={1.3} visible={false}>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshBasicMaterial color="yellow" transparent opacity={0.6} />
      </mesh>
    </>
  );
}
