import { Canvas } from "@react-three/fiber";
import { PlayerRenderer } from "./components/player-renderer";

export function App() {
  return (
    <Canvas camera={{ fov: 50, position: [0, 0, 50] }}>
      <PlayerRenderer />
    </Canvas>
  );
}
