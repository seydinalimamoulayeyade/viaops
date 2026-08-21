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

test('les ressources locales référencées par les pages publiques existent', () => {
  for (const page of ['index.html', 'design-system.html']) {
    const html = read(page);
    const refs = [...html.matchAll(/(?:src|href)="((?:assets|modules)\/[^"?#]+)/g)]
      .map(match => match[1]);
    for (const ref of refs) assert.ok(existsSync(join(root, ref)), `${page}: ${ref}`);
  }
});

test('aucun gestionnaire JavaScript inline ne contourne la CSP', () => {
  const files = [
    'index.html',
    'design-system.html',
    ...readdirSync(join(root, 'assets', 'js')).map(name => `assets/js/${name}`),
  ];
  for (const file of files) assert.doesNotMatch(read(file), /\son[a-z]+\s*=/i, file);
  assert.doesNotMatch(read('design-system.html'), /<script\b/i, 'style guide sans JavaScript');
});

test('le guide de styles reste autonome et sans JavaScript', () => {
  const html = read('design-system.html');
  const refs = [...html.matchAll(/(?:src|href)="([^"#]+)"/g)].map(match => match[1]);

  assert.ok(refs.length > 0);
  for (const ref of refs) {
    const resourcePath = ref.split(/[?#]/, 1)[0];
    assert.doesNotMatch(ref, /^(?:https?:)?\/\//i, ref);
    assert.ok(existsSync(join(root, resourcePath)), ref);
  }
  assert.doesNotMatch(html, /<script\b/i);
});

test('le guide expose les treize rôles dans les deux thèmes', () => {
  const html = read('design-system.html');
  const expectedRoles = [
    'page', 'surface', 'surface-2', 'text', 'text-2', 'border', 'accent',
    'info', 'success', 'warning', 'danger', 'focus', 'code',
  ];

  for (const theme of ['dark', 'light']) {
    const article = html.match(
      new RegExp(`<article class="ds-theme ds-theme-${theme}"[\\s\\S]*?</article>`),
    );
    assert.ok(article, `thème ${theme}`);
    for (const role of expectedRoles) {
      assert.match(article[0], new RegExp(`\\bds-swatch-${role}\\b`), `${theme}: ${role}`);
    }
  }
});

test('le guide respecte la préférence de réduction des mouvements', () => {
  assert.match(read('assets/css/design-system.css'), /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
});

test('la version publique est synchronisée', () => {
  assert.match(read('index.html'), /v1\.6\.2/);
  assert.match(read('README.md'), /version-1\.6\.2/);
  assert.equal(JSON.parse(read('package.json')).version, '1.6.2');
});
