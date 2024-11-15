import { Canvas } from "@react-three/fiber";
import { EnemyView } from "./components/enemy-view";
import { PlayerView } from "./components/player-view";
import { BulletView } from "./components/bullet-view";

export function App() {
  return (
    <Canvas camera={{ fov: 50, position: [0, 0, 50] }}>
      <PlayerView position={[-5, 0, 0]} />
      <EnemyView position={[0, 0, 0]} />
      <BulletView position={[5, 0, 0]} />
    </Canvas>
  );
}
