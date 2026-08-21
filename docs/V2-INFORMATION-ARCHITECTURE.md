# ViaOps V2 — Parcours et architecture de l’information

Statut : proposition à valider dans l’issue #13.

## Décisions structurantes

- ViaOps guide l’apprenant par un projet « De zéro à la prod ».
- Les 9 modules fondamentaux déterminent la progression et le certificat.
- ArgoCD reste un bonus accessible à tout moment et non bloquant.
- Un module est validé à partir de 75 %, soit 3 bonnes réponses sur 4.
- La progression, les scores et la dernière consultation restent dans le navigateur.
- Le certificat atteste une complétion ; ce n’est pas une certification professionnelle.

## Profils prioritaires

| Profil | Besoin principal | Résultat attendu |
| --- | --- | --- |
| Débutant ou reconversion | Comprendre l’ordre des outils | Suivre une prochaine étape unique sans recherche externe |
| Développeur vers Cloud/DevOps | Relier les outils dans une chaîne réelle | Appliquer chaque notion au même projet fil rouge |
| Junior préparant un entretien | Réviser et identifier ses lacunes | Accéder directement aux modules, quiz et preuves de complétion |

## Parcours critiques

| Parcours | Déclencheur | Action principale | Résultat |
| --- | --- | --- | --- |
| Découverte | Aucune progression | Démarrer | Ouverture du dashboard puis recommandation DevOps |
| Reprise | Module consulté non validé | Continuer | Retour sur ce module |
| Progression | Dernier module validé | Étape suivante | Premier fondamental non validé |
| Validation | Quiz terminé | Continuer ou rejouer | Score sauvegardé et module validé à partir de 75 % |
| Certificat | 9 fondamentaux validés | Générer | Téléchargement local, ArgoCD facultatif |
| Révision | Accès direct ou recherche | Ouvrir le module | Lecture libre sans verrouillage artificiel |

## Arborescence cible

```text
Accueil
├── Promesse et publics
├── Aperçu du pipeline
└── Action Démarrer ou Reprendre
Parcours
├── Dashboard
├── 9 modules fondamentaux
└── ArgoCD · bonus
Module
├── Leçon et exercice
└── Quiz et prochaine étape
Projet fil rouge
Certificat
À propos
```

## Contrat des écrans

### Accueil

Présente la promesse, les trois publics, l’absence de compte, les 90 minutes de fondamentaux, les 10 minutes de bonus et un aperçu du pipeline. L’action dépend de la progression : `Démarrer`, `Reprendre` ou `Voir mon certificat`.

### Parcours et dashboard

Affiche `x/9`, ArgoCD séparément, le dernier module consulté, la prochaine action recommandée et la liste ordonnée des modules. À `0/9`, il explique le stockage local et recommande DevOps.

### Module

Suit un ordre stable : objectif, problème réel, concepts, diagramme, configuration commentée, exercice, place dans le pipeline, projet fil rouge, entretien, quiz et prochaine étape.

### Projet fil rouge

Expose le résultat final, le pipeline complet et un livrable par étape. L’IA pour DevOps est transversale ; ArgoCD est identifié comme prolongement bonus.

### Certificat

Avant éligibilité, affiche `x/9` et les fondamentaux restants. Après `9/9`, accepte un nom de 1 à 50 caractères imprimables, génère localement le PNG et permet de recommencer.

## Navigation

### Desktop · 1024 px et plus

- En-tête : Accueil, Parcours, Projet et À propos.
- Progression fondamentale et action contextuelle visibles.
- Dans un module, sidebar ordonnée avec états actif, validé et bonus.
- Actions précédent et suivant toujours disponibles.

### Mobile · 320 à 1023 px

- En-tête : logo, progression, action contextuelle et bouton de menu.
- Menu : destinations globales puis modules, avec état actif perceptible.
- Fermeture par bouton, Échap ou activation d’une destination.
- Restitution du focus au bouton après fermeture sans navigation.
- Cibles interactives d’au moins 44 × 44 px.

## Algorithme de prochaine action

1. Si aucun fondamental n’est validé, recommander DevOps.
2. Si le dernier module consulté n’est pas validé, le reprendre.
3. Sinon, recommander le premier fondamental non validé dans l’ordre.
4. À `9/9`, proposer le certificat puis ArgoCD comme prolongement.
5. Ne jamais verrouiller l’accès manuel à un module.

## États dégradés

| État | Comportement attendu |
| --- | --- |
| Progression vide | Expliquer le stockage local et proposer DevOps |
| Recherche vide | Afficher l’absence de résultat et une action Effacer |
| Contenu introuvable | Proposer Accueil et Parcours, sans modifier la progression |
| Chargement impossible | Conserver la vue, expliquer et proposer Réessayer |
| Stockage indisponible | Maintenir la session et annoncer que la progression ne sera pas conservée |
| Données corrompues | Ignorer uniquement les entrées invalides et conserver les données valides |
| Certificat en erreur | Conserver nom et éligibilité, puis proposer Réessayer |

Tout message d’erreur est visible, annoncé aux technologies d’assistance et formulé sans détail technique interne.

## Règles éditoriales

- Interface, consignes et retours en français ; produits et commandes dans leur forme originale.
- Acronyme développé à sa première occurrence.
- Un seul titre principal par page et un ordre de sections stable.
- Chaque module annonce environ 10 minutes, quatre questions et une prochaine action.
- Chaque réponse de quiz fournit un résultat et une explication avant de continuer.
- Aucun contenu essentiel ne dépend du survol ou d’une icône sans nom accessible.
- Les estimations et limites ne sont jamais présentées comme des garanties.

## Mesures de validation

Un test modéré de 15 participants couvre les trois profils, avec au moins cinq tests mobiles et cinq desktop.

- 80 % identifient la promesse, `9 fondamentaux + 1 bonus` et l’action principale en 45 secondes.
- 80 % ouvrent le premier module recommandé en 60 secondes.
- 80 % reprennent une progression préchargée en 30 secondes.
- 80 % trouvent un module imposé, le projet et l’état du certificat en 60 secondes.
- Les parcours démarrage, reprise, validation et certificat fonctionnent entièrement au clavier.
- Aucun écran testé à 320, 768, 1024 et 1440 px ne provoque de défilement horizontal de page.

## Critères de sortie de #13

- [ ] Profils et jobs-to-be-done validés.
- [ ] Arborescence et contrats d’écran acceptés.
- [ ] Navigation desktop et mobile validée avant maquettage.
- [ ] Algorithme de prochaine action accepté.
- [ ] États vides et erreurs couverts.
- [ ] Métriques utilisables pour le test du prototype.
