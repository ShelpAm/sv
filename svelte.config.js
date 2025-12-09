import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter({
            out: 'build',
            env: {
                host: '127.0.0.1',
                port: '4134'
            }
        })
    }
};

export default config;
