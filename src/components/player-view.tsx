import { Entity } from 'koota';
import { useQueryFirst } from 'koota/react';
import { useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { Player, Transform } from '../traits';

export function PlayerView({ entity }: { entity: Entity }) {
	const ref = useRef<THREE.Mesh>(null!);

	useLayoutEffect(() => {
		entity.set(Transform, {
			position: ref.current.position,
			rotation: ref.current.rotation,
			scale: ref.current.scale,
		});
	}, [entity]);

	return (
		<mesh>
			<boxGeometry />
			<meshBasicMaterial color="orange" wireframe />
		</mesh>
	);
}

export function PlayerRenderer() {
	const player = useQueryFirst(Player, Transform);
	return player ? <PlayerView entity={player} /> : null;
}
