import { World } from 'koota';
import * as THREE from 'three';
import { Avoidant, Movement, SpatialHashMap, Transform } from '../traits';

const acceleration = new THREE.Vector3();

export const updateAvoidance = (world: World) => {
	const spatialHashMap = world.get(SpatialHashMap);

	world
		.query(Avoidant, Transform, Movement)
		.updateEach(([avoidance, { position }, { velocity }]) => {
			let neighbors = spatialHashMap.getNearbyEntities(
				position.x,
				position.y,
				position.z,
				avoidance.range,
				avoidance.neighbors
			);

			// Only avoid other avoidance entities
			neighbors = neighbors.filter((neighbor) => {
				return (
					neighbor.has(Avoidant) &&
					neighbor.get(Transform).position.distanceTo(position) <= avoidance.range
				);
			});

			if (neighbors.length) {
				acceleration.setScalar(0);

				for (const neighbor of neighbors) {
					acceleration.add(neighbor.get(Transform).position).sub(position);
				}

				acceleration.divideScalar(-neighbors.length).normalize().multiplyScalar(2);
				velocity.add(acceleration);
			}
		});
};
