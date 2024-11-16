import { createActions } from 'koota';
import { Avoidant, Bullet, Enemy, Input, Movement, Player, Transform } from './traits';

export const actions = createActions((world) => ({
	spawnPlayer: () => world.spawn(Player, Transform, Input, Movement),
	spawnEnemy: () => world.spawn(Enemy, Transform, Movement, Avoidant),
	spawnBullet: () => world.spawn(Bullet, Transform),
}));
