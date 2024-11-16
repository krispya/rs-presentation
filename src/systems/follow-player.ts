import { World } from 'koota';
import { Enemy, Movement, Player, Transform } from '../traits';
import * as THREE from 'three';

const acceleration = new THREE.Vector3();

export const followPlayer = (world: World) => {
	const player = world.queryFirst(Player, Transform);
	if (!player) return;

	const playerTransform = player.get(Transform);

	world
		.query(Enemy, Transform, Movement)
		.updateEach(([transform, { velocity, thrust }]) => {
			// Calculate and apply acceleration towards player
			acceleration
				.copy(playerTransform.position)
				.sub(transform.position)
				.normalize()
				.multiplyScalar(thrust);

			velocity.add(acceleration);
		});
};
