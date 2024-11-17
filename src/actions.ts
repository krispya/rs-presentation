import { createActions } from 'koota';
import { Avoidant, Bullet, Enemy, Input, Movement, Player, Transform } from './traits';
import * as THREE from 'three';

export const actions = createActions((world) => ({
	spawnPlayer: () => world.spawn(Player, Transform, Input, Movement),
	spawnEnemy: () => world.spawn(Enemy, Transform, Movement, Avoidant),
	spawnBullet: (position: THREE.Vector3, rotation: THREE.Euler) => {
		// Create a forward vector and apply the rotation to get the bullet direction
		const direction = new THREE.Vector3(1, 0, 0);
		direction.applyEuler(rotation);

		return world.spawn(
			Transform({ position: position.clone(), rotation: rotation.clone() }),
			Bullet({ direction })
		);
	},
}));
