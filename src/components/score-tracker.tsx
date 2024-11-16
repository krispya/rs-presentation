import { useWorld } from 'koota/react';
import { useEffect, useState } from 'react';
import { Enemy } from '../traits';
import { Html } from '@react-three/drei';

export function ScoreTracker() {
	const world = useWorld();
	const [score, setScore] = useState(0);

	useEffect(() => {
		const unsub = world.onRemove([Enemy], () => {
			setScore((v) => v + 1);
		});

		return () => {
			unsub();
		};
	}, [world]);

	return (
		<Html
			fullscreen
			style={{
				color: 'white',
				fontSize: '20px',
				fontFamily: 'monospace',
				padding: 40,
			}}
		>
			Score: {score}
		</Html>
	);
}
