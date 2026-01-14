import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const codespace = process.env.REACT_APP_CODESPACE_NAME;
const base = codespace ? `https://${codespace}-8000.app.github.dev` : 'http://127.0.0.1:8000';
console.log('OctoFit frontend starting. Backend base URL:', base);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
