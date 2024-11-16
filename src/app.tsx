import { Canvas, useFrame } from '@react-three/fiber';
import { useActions, useWorld } from 'koota/react';
import { useEffect } from 'react';
import { actions } from './actions';
import { PlayerRenderer } from './components/player-renderer';
import { EnemyRenderer } from './components/enemy-renderer';
import { BulletRenderer } from './components/bullet-renderer';
import { pollInput } from './systems/poll-input';
import { updateTime } from './systems/update-time';
import { applyInput } from './systems/apply-input';
import { moveEntities } from './systems/move-entities';
import { Time } from './traits';
import { followPlayer } from './systems/follow-player';

export function App() {
	return (
		<Canvas camera={{ fov: 50, position: [0, 0, 50] }}>
			<Startup />
			<FrameLoop />

			<PlayerRenderer />
			<EnemyRenderer />
			<BulletRenderer />
		</Canvas>
	);
}

function FrameLoop() {
	const world = useWorld();

	useFrame(() => {
		updateTime(world);
		pollInput(world);
		applyInput(world);
		followPlayer(world);
		moveEntities(world);
	});

	return null;
}

function Startup() {
	const { spawnPlayer, spawnEnemy } = useActions(actions);

	useEffect(() => {
		const player = spawnPlayer();
		const enemySpawnInterval = setInterval(() => spawnEnemy(), 1000);

		return () => {
			player.destroy();
			clearInterval(enemySpawnInterval);
		};
	}, [spawnPlayer, spawnEnemy]);

	const world = useWorld();

	useEffect(() => {
		world.add(Time);
		return () => {
			world.remove(Time);
		};
	}, [world]);

	return null;
}
