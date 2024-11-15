import { Entity } from 'koota';
import { useQueryFirst } from 'koota/react';
import { Player, Transform } from '../traits';
import { useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';

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

// Query for the first player entity and render it
export function PlayerSpawner() {
	const player = useQueryFirst(Player, Transform);
	return player ? <PlayerView entity={player} /> : null;
}
