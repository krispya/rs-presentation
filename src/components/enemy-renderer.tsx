import { useFrame } from '@react-three/fiber';
import { Entity } from 'koota';
import { useQuery } from 'koota/react';
import { useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { Enemy, Transform } from '../traits';
import { between } from '../utils/between';

export function EnemyView({ entity }: { entity: Entity }) {
	const ref = useRef<THREE.Mesh>(null!);

	useLayoutEffect(() => {
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

function HifiEnemyView({ entity }: { entity: Entity }) {
	const ref = useRef<THREE.Mesh>(null!);
	const scaleRef = useRef(0);

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

	// Scale into existence
	useFrame((_, delta) => {
		if (!ref.current) return;
		const progress = Math.min(scaleRef.current + delta * 2, 1);
		// Apply easing - this uses cubic easing out
		const eased = 1 - Math.pow(1 - progress, 3);
		scaleRef.current = progress;
		ref.current.scale.setScalar(eased);
	});

	return (
		<mesh ref={ref}>
			<dodecahedronGeometry />
			<meshStandardMaterial
				color="white"
				metalness={0.5}
				roughness={0.25}
			/>
		</mesh>
	);
}

// Query for all enemies and render them
export function EnemyRenderer() {
	const enemies = useQuery(Enemy, Transform);
	return enemies.map((enemy) => (
		<EnemyView key={enemy.id()} entity={enemy} />
	));
}
