import { Entity } from 'koota';
import * as THREE from 'three';
import { Transform } from '../traits';

export function syncTransform(entity: Entity, ref: React.RefObject<THREE.Mesh>) {
	if (!ref.current) return;

	// Copy current position, rotation, and scale
	ref.current.position.copy(entity.get(Transform).position);
	ref.current.rotation.copy(entity.get(Transform).rotation);
	ref.current.scale.copy(entity.get(Transform).scale);

	// Sync traits from mesh
	entity.set(Transform, {
		position: ref.current.position,
		rotation: ref.current.rotation,
		scale: ref.current.scale,
	});
}
