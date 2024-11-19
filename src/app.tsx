import { Canvas, useFrame } from '@react-three/fiber';
import { useWorld } from 'koota/react';
import { BulletRenderer } from './components/bullet-renderer';
import { EnemyRenderer } from './components/enemy-renderer';
import { PlayerRenderer } from './components/player-renderer';
import { Startup } from './startup';
import { convertInputToMovement } from './systems/apply-input';
import { flockToPlayer } from './systems/follow-player';
import { handleShooting } from './systems/handle-shooting';
import { moveEntities } from './systems/move-entities';
import { pollInput } from './systems/poll-input';
import { avoidEachother } from './systems/update-avoidance';
import { updateBullets } from './systems/update-bullet';
import { collideBulletsWithEnemies } from './systems/update-bullet-collisions';
import { updateTime } from './systems/update-time';

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

		// Input
		pollInput(world);
		convertInputToMovement(world);

		// Enemy AI
		flockToPlayer(world);
		avoidEachother(world);

		// Movement
		moveEntities(world);

		// Shooting
		handleShooting(world);
		updateBullets(world);
		collideBulletsWithEnemies(world);
	});

	return null;
}
