import { trait } from 'koota';
import * as THREE from 'three';

// No data makes it a tag
export const Player = trait();
export const Enemy = trait();
export const Bullet = trait();

// A transform just like CSS!
export const Transform = trait({
	position: () => new THREE.Vector3(),
	rotation: () => new THREE.Euler(),
	scale: () => new THREE.Vector3(1, 1, 1),
});
