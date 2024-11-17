import { Entity } from 'koota';
import { useQueryFirst } from 'koota/react';
import { Player, Transform } from '../traits';
import { useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import src from '../assets/spacecraft.glb?url';
import { useGLTF } from '@react-three/drei';

// Position is now driven by Koota
export function PlayerView({ entity }: { entity: Entity }) {
	const ref = useRef<THREE.Mesh>(null!);

	// Sync traits
	// Use layout effect so syncing happens before other effects
	useLayoutEffect(() => {
		entity.set(Transform, {
			position: ref.current.position,
			rotation: ref.current.rotation,
			scale: ref.current.scale,
		});
	}, [entity]);

	return (
		<mesh ref={ref}>
			<boxGeometry />
			<meshBasicMaterial color="orange" wireframe />
		</mesh>
	);
}

export function HifiPlayerView({ entity }: { entity: Entity }) {
	const { scene } = useGLTF(src);

	useLayoutEffect(() => {
		// Rotate the model to face forward and shrink it down
		const model = scene.children[0]! as THREE.Mesh;
		model.rotation.set(0, -Math.PI / 2, -Math.PI / 2);
		model.scale.set(0.5, 0.5, 0.5);

		entity.set(Transform, {
			position: scene.position,
			rotation: scene.rotation,
			scale: scene.scale,
		});
	}, [entity, scene]);

	return <primitive object={scene} />;
}

// Query for the first player entity and render it
export function PlayerRenderer() {
	const player = useQueryFirst(Player, Transform);
	return player ? <HifiPlayerView entity={player} /> : null;
}
