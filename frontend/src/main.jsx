import { StrictMode } from 'react';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Toaster />
		<App />
	</StrictMode>
);
