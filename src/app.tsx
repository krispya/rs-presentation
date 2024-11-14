import { Canvas } from "@react-three/fiber";
import { EnemyRenderer } from "./components/enemy-renderer";
import { PlayerRenderer } from "./components/player-renderer";
import { BulletRenderer } from "./components/bullet-renderer";

export function App() {
  return (
    <Canvas camera={{ fov: 50, position: [0, 0, 50] }}>
      <PlayerRenderer position={[-5, 0, 0]} />
      <EnemyRenderer position={[0, 0, 0]} />
      <BulletRenderer position={[5, 0, 0]} />
    </Canvas>
  );
}
