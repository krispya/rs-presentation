import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app.tsx';
import './index.css';
import { createWorld } from 'koota';
import { Time } from './traits.ts';
import { WorldProvider } from 'koota/react';

const world = createWorld(Time);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<WorldProvider world={world}>
			<App />
		</WorldProvider>
	</React.StrictMode>
);
