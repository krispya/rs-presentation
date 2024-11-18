import { Canvas, useFrame } from '@react-three/fiber';
import { useActions, useWorld } from 'koota/react';
import { useEffect } from 'react';
import { actions } from './actions';
import { BulletRenderer } from './components/bullet-renderer';
import { EnemyRenderer } from './components/enemy-renderer';
import { PlayerRenderer } from './components/player-renderer';
import { ScoreTracker } from './components/score-tracker';
import { applyInput } from './systems/apply-input';
import { followPlayer } from './systems/follow-player';
import { handleShooting } from './systems/handle-shooting';
import { moveEntities } from './systems/move-entities';
import { pollInput } from './systems/poll-input';
import { updateAvoidance } from './systems/update-avoidance';
import { updateBullets } from './systems/update-bullet';
import { updateBulletCollisions } from './systems/update-bullet-collisions';
import { updateSpatialHashing } from './systems/update-spatial-hashing';
import { updateTime } from './systems/update-time';
import { Movement, SpatialHashMap, Time } from './traits';
import { Nebula } from './components/nebula';
import { PostProcessing } from './components/postprcoessing';
import { applyForce } from './systems/apply-force';
import { pushEnemies } from './systems/push-enemies';
import { ExplosionRenderer } from './components/explosion-renderer';
import { tickExplosion } from './systems/tick-explosion';

export function App() {
	return (
		<Canvas camera={{ fov: 50, position: [0, 0, 50] }}>
			<Startup />
			<FrameLoop />

			<PlayerRenderer />
			<EnemyRenderer />
			<BulletRenderer />
			<ExplosionRenderer />

			<ScoreTracker />

			<ambientLight intensity={0.5} />
			<directionalLight position={[10, 10, 10]} intensity={4} color={'#f77d7d'} />
			<directionalLight position={[10.62, -7.14, 10]} intensity={4} />

			<Nebula />
			<PostProcessing />
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
		updateAvoidance(world);
		pushEnemies(world);
		handleShooting(world);
		applyForce(world);
		moveEntities(world);
		updateBullets(world);
		updateBulletCollisions(world);
		updateSpatialHashing(world);
		tickExplosion(world);
	});

	return null;
}

function Startup() {
	const { spawnPlayer, spawnEnemy } = useActions(actions);

	useEffect(() => {
		const player = spawnPlayer();
		player.set(Movement, { thrust: 2 });
		const enemySpawnInterval = setInterval(() => spawnEnemy(), 1000);

		return () => {
			player.destroy();
			clearInterval(enemySpawnInterval);
		};
	}, [spawnPlayer, spawnEnemy]);

	const world = useWorld();

	useEffect(() => {
		world.add(Time, SpatialHashMap);
		return () => world.remove(Time, SpatialHashMap);
	}, [world]);

	return null;
}
