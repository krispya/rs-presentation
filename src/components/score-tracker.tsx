import '@fontsource/russo-one';
import { Html } from '@react-three/drei';
import { useWorld } from 'koota/react';
import { useEffect, useState } from 'react';
import AnimatedNumbers from 'react-animated-numbers';
import { Enemy } from '../traits';

export function ScoreTracker() {
	const world = useWorld();
	const [score, setScore] = useState(0);

	useEffect(() => {
		const unsub = world.onRemove([Enemy], () => {
			setScore((v) => v + 1);
		});

		return () => {
			unsub();
			setScore(0);
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

		setScore((v) => v + 1);

		return () => {
			unsub();
			setScore(0);
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
				display: 'flex',
				gap: '0.65rem',
			}}
		>
			Score: <AnimatedNumbers animateToNumber={score} />
		</Html>
	);
}
