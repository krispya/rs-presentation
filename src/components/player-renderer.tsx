import { Entity } from 'koota';
import { useQuery } from 'koota/react';
import { useLayoutEffect, useRef } from 'react';
import * as THREE from 'three';
import { Player, Transform } from '../traits';
import { syncTransform } from '../utils/sync-transform';

// Position is now driven by Koota
export function PlayerView({ entity }: { entity: Entity }) {
	const ref = useRef<THREE.Mesh>(null!);

	// Sync traits
	// Use layout effect so syncing happens before other effects
	useLayoutEffect(() => {
		syncTransform(entity, ref);
	}, [entity]);

	return (
		<mesh ref={ref}>
			<boxGeometry />
			<meshBasicMaterial color="orange" wireframe />
		</mesh>
	);
}

// Query for player entities and render them
export function PlayerRenderer() {
	const players = useQuery(Player, Transform);
	return players.map((player) => <PlayerView entity={player} />);
}
