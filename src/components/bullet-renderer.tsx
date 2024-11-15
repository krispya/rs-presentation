import { Entity } from 'koota';
import { useQuery } from 'koota/react';
import { useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { Bullet, Transform } from '../traits';

export function BulletView({ entity }: { entity: Entity }) {
	const ref = useRef<THREE.Mesh>(null!);

	useLayoutEffect(() => {
		// Copy current position, rotation, and scale
		ref.current.position.copy(entity.get(Transform).position);
		ref.current.rotation.copy(entity.get(Transform).rotation);
		ref.current.scale.copy(entity.get(Transform).scale);

		entity.set(Transform, {
			position: ref.current.position,
			rotation: ref.current.rotation,
			scale: ref.current.scale,
		});
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
