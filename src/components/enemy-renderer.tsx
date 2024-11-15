import { useQuery } from 'koota/react';
import { Enemy, Transform } from '../traits';
import { Entity } from 'koota';
import { useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { between } from '../utils/between';

export function EnemyView({ entity }: { entity: Entity }) {
	const ref = useRef<THREE.Mesh>(null!);

	useLayoutEffect(() => {
		// Set initial position and rotation
		ref.current.position.set(between(-50, 50), between(-50, 50), 0);

		ref.current.rotation.set(
			between(0, Math.PI * 2),
			between(0, Math.PI * 2),
			between(0, Math.PI * 2)
		);

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
