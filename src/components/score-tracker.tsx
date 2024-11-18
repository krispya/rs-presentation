import { useWorld } from 'koota/react';
import { useEffect, useState } from 'react';
import { Enemy } from '../traits';
import { Html } from '@react-three/drei';
import NumberFlow from '@number-flow/react';

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

export function HifiScoreTracker() {
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
				padding: 40,
				color: 'gold',
				fontSize: '3rem',
				fontFamily: 'Russo One',
			}}
		>
			Score: <NumberFlow value={score} />
		</Html>
	);
}
