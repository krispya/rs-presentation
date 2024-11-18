import { createActions } from 'koota';
import * as THREE from 'three';
import { Bullet, Enemy, Player, Transform } from './traits';
import { between } from './utils/between';

export const actions = createActions((world) => ({
	spawnPlayer: () => world.spawn(Player, Transform),
	spawnEnemy: () => {
		// Set initial position and rotation at random
		const position = new THREE.Vector3(between(-50, 50), between(-50, 50), 0);

		const rotation = new THREE.Euler(
			between(0, Math.PI * 2),
			between(0, Math.PI * 2),
			between(0, Math.PI * 2)
		);
		world.spawn(Enemy, Transform({ position, rotation }));
	},
	spawnBullet: () => world.spawn(Bullet, Transform),
}));
