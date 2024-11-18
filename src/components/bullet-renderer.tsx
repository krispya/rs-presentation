import { Entity } from 'koota';
import { useQuery } from 'koota/react';
import { useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { Bullet, Transform } from '../traits';
import { syncTransform } from '../utils/sync-transform';
export function BulletView({ entity }: { entity: Entity }) {
	const ref = useRef<THREE.Mesh>(null!);

	useLayoutEffect(() => {
		syncTransform(entity, ref);
	}, [entity]);

	return (
		<mesh ref={ref}>
			<sphereGeometry />
			<meshBasicMaterial color="red" wireframe />
		</mesh>
	);
}

export function BulletRenderer() {
	const bullets = useQuery(Bullet, Transform);
	return bullets.map((bullet) => <BulletView entity={bullet} />);
}
