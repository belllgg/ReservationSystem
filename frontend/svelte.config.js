import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// Usamos adapter-static para el despliegue estático
		adapter: adapter({
			// Opciones del adaptador estático
			pages: 'build',  // directorio de páginas generadas
			assets: 'build', // directorio de archivos estáticos
			fallback: 'index.html',  // archivo de fallback para el enrutamiento
			precompress: false  // si se deben precomprimir los archivos estáticos
		})
	}
};

export default config;
