import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { fileURLToPath, URL } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const read = path => readFileSync(join(root, path), 'utf8');

const moduleIds = [...read('assets/js/data.js').matchAll(/id:\s*['"]([^'"]+)['"]/g)]
  .map(match => match[1]);

test('les dix modules ont un contenu, un logo et un quiz', () => {
  assert.equal(moduleIds.length, 10);
  for (const id of moduleIds) {
    assert.ok(existsSync(join(root, 'modules', `${id}.html`)), `module ${id}`);
    assert.ok(existsSync(join(root, 'assets', 'img', 'logos', `${id}.svg`)), `logo ${id}`);
    assert.match(read('assets/js/quiz-data.js'), new RegExp(`['"]?${id}['"]?\\s*:`));
  }
});

test('les ressources locales référencées par index.html existent', () => {
  const html = read('index.html');
  const refs = [...html.matchAll(/(?:src|href)="((?:assets|modules)\/[^"?#]+)/g)]
    .map(match => match[1]);
  for (const ref of refs) assert.ok(existsSync(join(root, ref)), ref);
});

test('aucun gestionnaire JavaScript inline ne contourne la CSP', () => {
  const files = [
    'index.html',
    ...readdirSync(join(root, 'assets', 'js')).map(name => `assets/js/${name}`),
  ];
  for (const file of files) assert.doesNotMatch(read(file), /\son[a-z]+\s*=/i, file);
});

test('la version publique est synchronisée', () => {
  assert.match(read('index.html'), /v1\.6\.2/);
  assert.match(read('README.md'), /version-1\.6\.2/);
  assert.equal(JSON.parse(read('package.json')).version, '1.6.2');
});
