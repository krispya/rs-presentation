import { Canvas } from '@react-three/fiber';
import { useActions } from 'koota/react';
import { useEffect } from 'react';
import { actions } from './actions';
import { PlayerSpawner } from './components/player-view';
import { EnemySpawner } from './components/enemy-view';
import { BulletSpawner } from './components/bullet-view';

export function App() {
	return (
		<Canvas camera={{ fov: 50, position: [0, 0, 50] }}>
			<GameLoop />

			<PlayerSpawner />
			<EnemySpawner />
			<BulletSpawner />
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
