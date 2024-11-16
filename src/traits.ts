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

export const Input = trait(() => new THREE.Vector2());

export const Movement = trait({
	velocity: () => new THREE.Vector3(),
	thrust: 1,
	damping: 0.95,
});

export const Time = trait({ delta: 0, current: 0 });
