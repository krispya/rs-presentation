import { Canvas } from "@react-three/fiber";
import { PlayerView } from "./components/player-view";

export function App() {
  return (
    <Canvas camera={{ fov: 50, position: [0, 0, 50] }}>
      <PlayerView />
    </Canvas>
  );
}
