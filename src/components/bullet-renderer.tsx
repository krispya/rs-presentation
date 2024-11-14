import { ThreeElements } from "@react-three/fiber";

export function BulletRenderer(props: ThreeElements["mesh"]) {
  return (
    <mesh {...props} scale={0.2}>
      <sphereGeometry />
      <meshBasicMaterial color="red" wireframe />
    </mesh>
  );
}
