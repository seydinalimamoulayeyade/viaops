# Contribuer à ViaOps

Merci de contribuer à une plateforme d’apprentissage DevOps claire et accessible.

## Avant de commencer

1. Recherchez une issue existante ou ouvrez-en une.
2. Pour une évolution importante, attendez la validation du périmètre.
3. Créez une branche depuis `main` : `feat/...`, `fix/...`, `docs/...` ou `chore/...`.

## Développement

```bash
npm ci
npm run lint
npm test
```

Pour afficher le site localement :

```bash
python -m http.server 8080
```

## Pull Requests

- Limitez chaque PR à un objectif cohérent.
- Utilisez des commits conventionnels en français.
- Ajoutez des captures pour les changements visuels.
- Vérifiez le clavier, le responsive et les contrastes pour toute interface.
- Liez une issue avec `Closes #123` lorsque la PR la termine.

## Contenu pédagogique

Les exemples doivent être reproductibles, ne contenir aucun secret réel et distinguer clairement les configurations de démonstration des pratiques de production.
