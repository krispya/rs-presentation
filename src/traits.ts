import { trait } from 'koota';
import { Euler, Vector3 } from 'three';

// No data makes it a tag
export const Player = trait();
export const Enemy = trait();
export const Bullet = trait();

// A transform just like CSS!
// The callback makes a new instance every
// time the trait is added to an entity
export const Transform = trait({
	position: () => new Vector3(),
	rotation: () => new Euler(),
	scale: () => new Vector3(1, 1, 1),
});
