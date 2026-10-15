import { copyFileSync, existsSync } from 'node:fs';

if (!existsSync('dist/index.html')) throw new Error('dist/index.html was not produced');
copyFileSync('dist/index.html', 'dist/404.html');
