import { Entity } from 'koota';
import { useQuery } from 'koota/react';
import { useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { Enemy, Transform } from '../traits';

export function EnemyView({ entity }: { entity: Entity }) {
	const ref = useRef<THREE.Mesh>(null!);

	useLayoutEffect(() => {
		// Copy current position, rotation, and scale
		ref.current.position.copy(entity.get(Transform).position);
		ref.current.rotation.copy(entity.get(Transform).rotation);
		ref.current.scale.copy(entity.get(Transform).scale);

		// Sync traits from mesh
		entity.set(Transform, {
			position: ref.current.position,
			rotation: ref.current.rotation,
			scale: ref.current.scale,
		});
	}, [entity]);

	return (
		<mesh ref={ref}>
			<dodecahedronGeometry />
			<meshBasicMaterial color="white" wireframe />
		</mesh>
	);
}

// Query for all enemies and render them
export function EnemyRenderer() {
	const enemies = useQuery(Enemy, Transform);
	return enemies.map((enemy) => <EnemyView entity={enemy} />);
}
