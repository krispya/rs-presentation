import { Canvas, useFrame } from '@react-three/fiber';
import { useWorld } from 'koota/react';
import { BulletRenderer } from './components/bullet-renderer';
import { EnemyRenderer } from './components/enemy-renderer';
import { PlayerRenderer } from './components/player-renderer';
import { PrintVelocity } from './components/print-velocity';
import { Startup } from './startup';
import { convertInputToMovement } from './systems/apply-input';
import { moveEntities } from './systems/move-entities';
import { pollInput } from './systems/poll-input';
import { updateTime } from './systems/update-time';

export function App() {
	return (
		<Canvas camera={{ fov: 50, position: [0, 0, 50] }}>
			<Startup />
			<FrameLoop />

			<PrintVelocity />

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
		convertInputToMovement(world);
		moveEntities(world);
	});

	return null;
}
