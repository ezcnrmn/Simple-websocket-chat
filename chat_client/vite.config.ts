import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import config from './config';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: { port: config.PORT },
});
