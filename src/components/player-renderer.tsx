import { ThreeElements } from "@react-three/fiber";

export function PlayerRenderer(props: ThreeElements["mesh"]) {
  return (
    <mesh {...props}>
      <boxGeometry />
      <meshBasicMaterial color="orange" wireframe />
    </mesh>
  );
}
