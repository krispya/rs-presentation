import { Entity } from 'koota';
import { useQuery } from 'koota/react';
import { useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { Enemy, Transform } from '../traits';
import { syncTransform } from '../utils/sync-transform';

export function EnemyView({ entity }: { entity: Entity }) {
	const ref = useRef<THREE.Mesh>(null!);

	useLayoutEffect(() => {
		syncTransform(entity, ref);
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
