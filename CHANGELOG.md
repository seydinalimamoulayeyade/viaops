# Changelog

Toutes les évolutions notables de ViaOps sont documentées ici.

Le format s'inspire de [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/)
et le projet suit le [versionnage sémantique](https://semver.org/lang/fr/).

## [1.6.0] — 2026-07-09

### Ajouté
- **Parcours fil rouge « De zéro à la prod »** (vue Projet) : relie les 10 modules
  en un scénario de déploiement complet, avec flux CI/CD, 9 étapes concrètes
  (fichier/commande + lien vers le module) et bloc transversal IA/Ops.

### Modifié
- **Refonte visuelle complète — direction « Blueprint »** : re-mapping des tokens
  (fond ardoise + grille filigrane, cyan structurel, corail signal), police display
  Oswald, thème clair en « blueprint inversé ».
- **Home** restructurée : hero avec carte-schéma, bandeau de spécifications, et
  pipeline redessiné comme un schéma d'ingénieur câblé et annoté.
- **Vue module** en index technique (références, en-têtes Oswald, annotations mono).
- **Cohérence globale** : navbar, badges, coloration du code, rayons anguleux.

## [1.5.0] — 2026-07-09

### Ajouté
- **Quiz de validation** : 4 questions par module (40 au total), présentées une par
  une avec barre de progression et feedback immédiat.
- **Gating de complétion** : un module se marque comme complété uniquement à partir
  de **75 %** de réussite au quiz.
- **Score persistant** : le meilleur score par module est mémorisé (localStorage)
  et affiché dans le quiz.
- **Logos officiels** des outils (SVG local, sans CDN) dans le pipeline, la sidebar
  et les en-têtes de module.

### Modifié
- **Refonte visuelle** : remplacement des emojis par des icônes SVG cohérentes
  (en-têtes de section, barre de statut, menu, toggle de thème, résultats de quiz,
  certificat) et titres de section en casse normale.
- Le quiz est désormais centralisé dans `assets/js/quiz-data.js` (source de vérité
  unique) au lieu d'être codé en dur dans chaque module.

### Détails techniques
- Nouveau moteur `assets/js/quiz.js` (rendu, scoring, rejouabilité, complétion).
- Nouveau post-traitement `assets/js/content-polish.js` (icônes + titres au rendu).
- Nouveau store `Score` dans `assets/js/progress.js` (`viaops_scores_v1`).
- Aucune régression sur la progression existante (`viaops_completed_v1` inchangé).

## [1.1.0]

### Ajouté
- Bouton « Scroll to Top » flottant.
- Recherche de modules en temps réel dans la sidebar.
- Menu de progression : export JSON, partage, réinitialisation.
- États de focus accessibles (WCAG 2.1 AA).
- Transitions et animations entre les vues.

## [1.0.0]

### Ajouté
- Version initiale : 9 modules fondamentaux + 1 module bonus (ArgoCD).
- Pipeline DevOps cliquable, suivi de progression, certificat de complétion.
- Mode sombre / clair, raccourcis clavier, design responsive.
