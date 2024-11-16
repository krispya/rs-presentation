import { Entity } from 'koota';
import { useQuery } from 'koota/react';
import { useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { Bullet, Transform } from '../traits';

export function BulletView({ entity }: { entity: Entity }) {
	const ref = useRef<THREE.Mesh>(null!);

	useLayoutEffect(() => {
		// Copy current position
		ref.current.position.copy(entity.get(Transform).position);

		entity.set(Transform, {
			position: ref.current.position,
			rotation: ref.current.rotation,
			scale: ref.current.scale,
		});
	}, [entity]);

	return (
		<mesh ref={ref} scale={0.2}>
			<sphereGeometry />
			<meshBasicMaterial color="red" wireframe />
		</mesh>
	);
}

export function BulletRenderer() {
	const bullets = useQuery(Bullet, Transform);
	return bullets.map((bullet) => <BulletView key={bullet.id()} entity={bullet} />);
}
