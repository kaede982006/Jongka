import { cpSync } from 'node:fs';

cpSync('dist/index.html', 'index.html');
cpSync('dist/assets', 'assets', { recursive: true });
