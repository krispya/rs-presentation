import { ThreeElements } from '@react-three/fiber';

export function PlayerView(props: ThreeElements['mesh']) {
	return (
		<mesh {...props}>
			<boxGeometry />
			<meshBasicMaterial color="orange" wireframe />
		</mesh>
	);
}
