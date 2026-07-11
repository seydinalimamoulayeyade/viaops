import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['assets/js/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      /* Architecture volontaire : scripts classiques chargés dans un scope global
         partagé (pas de modules ES). On désactive donc les règles incompatibles
         avec ce pattern, tout en conservant celles qui détectent de vrais bugs
         (no-dupe-keys, no-unreachable, no-cond-assign, etc. via recommended). */
      'no-undef': 'off',        // objets définis dans un fichier, consommés dans un autre
      'no-redeclare': 'off',    // idem
      'no-unused-vars': 'off',  // les objets top-level sont utilisés ailleurs
    },
  },
];
