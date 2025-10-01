/* /* import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { TransformControls } from "@react-three/drei";
import type { Item } from "./types";

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

  // Update positions + colors whenever items change
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

      // position
      const matrix = new THREE.Matrix4();
      matrix.setPosition(...item.position);
      meshRef.current.setMatrixAt(i, matrix);

      // color
      color.set(item.color);
      meshRef.current.setColorAt(i, color);
    });

    meshRef.current.count = items.length;
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [items]);

  // Sync the "ghost" mesh for TransformControls
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
         
          <mesh ref={selectedRef} scale={[1.1, 1.1, 1.1]}>
            <boxGeometry args={[0.2, 0.2, 0.2]} />
            <meshBasicMaterial color="yellow" wireframe />
          </mesh>
        </TransformControls>
      )}
    </>
  );
}
 */
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import type { Item } from "./types";

type ItemsProps = {
  items: Item[];
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
};

export function Items({ items, selectedId, setSelectedId }: ItemsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const highlightRef = useRef<THREE.Mesh>(null!);

  const geometry = useMemo(() => new THREE.BoxGeometry(0.2, 0.2, 0.2), []);
  const material = useMemo(
  () => new THREE.MeshBasicMaterial({ color: "white" }),
  []
);

  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    // ha nincs instanceColor attribútum, hozz létre
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
    if (!highlightRef.current) return;
    if (selectedId == null) {
      highlightRef.current.visible = false;
      return;
    }
    const sel = items.find((it) => it.id === selectedId);
    if (!sel) {
      highlightRef.current.visible = false;
      return;
    }
    highlightRef.current.position.set(...sel.position);
    highlightRef.current.visible = true;
  }, [selectedId, items]);

  const handleClick = (e: any) => {
    e.stopPropagation();
    setSelectedId(e.instanceId ?? null);
  };

  return (
    <>
      <instancedMesh
        ref={meshRef}
        args={[geometry, material, items.length]}
        onClick={handleClick}
      />
      <mesh ref={highlightRef} visible={false} scale={1.2}>
  <boxGeometry args={[0.2, 0.2, 0.2]} />
  <meshBasicMaterial color="yellow" wireframe transparent opacity={0.5} />
</mesh>
    </>
  );
}
