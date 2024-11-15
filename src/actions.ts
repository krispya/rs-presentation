import { createActions } from 'koota';
import { Bullet, Enemy, Player, Transform } from './traits';

export const actions = createActions((world) => ({
	spawnPlayer: () => world.spawn(Player, Transform),
	spawnEnemy: () => world.spawn(Enemy, Transform),
	spawnBullet: () => world.spawn(Bullet, Transform),
}));
