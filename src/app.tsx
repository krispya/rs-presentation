import { Canvas } from '@react-three/fiber';
import { BulletView } from './components/bullet-view';
import { EnemyView } from './components/enemy-view';
import { PlayerView } from './components/player-view';

export function App() {
	return (
		<Canvas camera={{ fov: 50, position: [0, 0, 50] }}>
			<PlayerView />
			<EnemyView />
			<BulletView />
		</Canvas>
	);
}
