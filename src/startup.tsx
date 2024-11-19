import { useActions, useWorld } from 'koota/react';
import { useEffect } from 'react';
import { actions } from './actions';
import { Movement, SpatialHashMap, Time } from './traits';

export function Startup() {
	const { spawnPlayer, spawnEnemy } = useActions(actions);

	useEffect(() => {
		const player = spawnPlayer();
		player.set(Movement, { thrust: 2 });

		// // Spawn 20 enemies to start
		// for (let i = 0; i < 40; i++) {
		// 	spawnEnemy();
		// }

		const enemySpawnInterval = setInterval(() => spawnEnemy(), 1000);

		return () => {
			player.destroy();
			clearInterval(enemySpawnInterval);
		};
	}, [spawnPlayer, spawnEnemy]);

	const world = useWorld();

	useEffect(() => {
		world.add(Time, SpatialHashMap);
		// return () => world.remove(Time, SpatialHashMap);
	}, [world]);

	return null;
}
