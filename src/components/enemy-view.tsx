import { ThreeElements } from '@react-three/fiber';

export function EnemyView(props: ThreeElements['mesh']) {
	return (
		<mesh {...props}>
			<dodecahedronGeometry />
			<meshBasicMaterial color="white" wireframe />
		</mesh>
	);
}
