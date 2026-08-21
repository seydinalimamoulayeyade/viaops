# ViaOps V2 — Roadmap

## Vision

Transformer ViaOps en plateforme d’apprentissage guidé : apprendre le DevOps en construisant un pipeline de production, étape par étape.

## Principes

- Le projet fil rouge structure tout le parcours.
- Chaque écran propose une prochaine action évidente.
- Le contenu reste accessible sans compte ni backend.
- Le JavaScript client est réservé aux interactions utiles.
- Accessibilité, performance et sécurité sont des quality gates.

## Phases

| Phase | Résultat attendu | Suivi |
| --- | --- | --- |
| 0 · Stabilisation | CI verte et artefact sécurisé | #12 |
| 1 · Cadrage | Parcours et architecture validés | #13 |
| 2 · Design | Design system Blueprint 2.0 | #14 |
| 3 · Architecture | Prototype Astro et décision ADR | #15 |
| 4 · Expérience | Dashboard et progression locale | #16 |
| 5 · Pilote | Nouveau module Docker complet | #17 |
| 6 · Qualité | Gates accessibilité et performance | #18 |

L’issue épique #19 centralise l’avancement du milestone.

Document de cadrage : [parcours et architecture de l’information](V2-INFORMATION-ARCHITECTURE.md).

## Premier jalon

Le premier jalon livrable comprend :

1. une landing page qui expose clairement la promesse ;
2. un tableau de bord permettant de reprendre le parcours ;
3. un module Docker représentatif du nouveau format ;
4. un déploiement statique sur GitHub Pages et Docker/nginx.

## Hors périmètre initial

- comptes utilisateurs et authentification ;
- backend et base de données ;
- classement public ;
- synchronisation cloud de la progression.

## Définition de terminé

- parcours critiques utilisables au clavier et conformes WCAG 2.2 AA ;
- expérience validée sur mobile et desktop ;
- lint, tests, build et scan de sécurité verts ;
- documentation de migration des neuf modules restants.
