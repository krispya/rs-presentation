import { Canvas } from '@react-three/fiber';
import { useActions } from 'koota/react';
import { useEffect } from 'react';
import { actions } from './actions';
import { PlayerRenderer } from './components/player-renderer';
import { EnemyRenderer } from './components/enemy-renderer';
import { BulletRenderer } from './components/bullet-renderer';

export function App() {
	return (
		<Canvas camera={{ fov: 50, position: [0, 0, 50] }}>
			<GameLoop />

			<PlayerRenderer />
			<EnemyRenderer />
			<BulletRenderer />
		</Canvas>
	);
}

function GameLoop() {
	const { spawnPlayer, spawnEnemy } = useActions(actions);

	useEffect(() => {
		const player = spawnPlayer();
		const enemySpawnInterval = setInterval(() => spawnEnemy(), 1000);

		return () => {
			player.destroy();
			clearInterval(enemySpawnInterval);
		};
	}, [spawnPlayer, spawnEnemy]);

	return null;
}
