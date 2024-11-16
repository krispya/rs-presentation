import { World } from 'koota';
import { Bullet, Enemy, SpatialHashMap, Transform } from '../traits';

export const updateBulletCollisions = (world: World) => {
	const spatialHashMap = world.get(SpatialHashMap);

	world
		.query(Bullet, Transform)
		.select(Transform)
		.updateEach(([{ position }], entity) => {
			const nearbyEntities = spatialHashMap.getNearbyEntities(
				position.x,
				position.y,
				position.z,
				2
			);

			const hitEnemy = nearbyEntities.find(
				(entity) =>
					entity.has(Enemy) && entity.get(Transform).position.distanceTo(position) < 1
			);

			if (hitEnemy !== undefined) {
				// Destroy bullet and enemy.
				hitEnemy.destroy();
				entity.destroy();
			}
		});
};
