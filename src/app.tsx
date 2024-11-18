import { Canvas } from '@react-three/fiber';
import { BulletRenderer } from './components/bullet-renderer';
import { EnemyRenderer } from './components/enemy-renderer';
import { PlayerRenderer } from './components/player-view';

export function App() {
	return (
		<Canvas camera={{ fov: 50, position: [0, 0, 50] }}>
			<PlayerRenderer />
			<EnemyRenderer />
			<BulletRenderer />
		</Canvas>
	);
}
