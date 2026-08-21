# Politique de sécurité

## Signaler une vulnérabilité

Ne publiez pas de vulnérabilité exploitable dans une issue publique. Utilisez le signalement privé de vulnérabilité GitHub du dépôt ou contactez le mainteneur via son profil GitHub.

Indiquez si possible :

- le composant et la version concernés ;
- les étapes de reproduction ;
- l’impact estimé ;
- une proposition de correction ou de mitigation.

Aucun secret, token ou donnée personnelle réelle ne doit être inclus dans le rapport.

## Périmètre

ViaOps est actuellement une application statique sans authentification ni backend. Sont notamment dans le périmètre :

- injection de contenu dans l’application ;
- dépendances et images conteneur vulnérables ;
- configuration Nginx et en-têtes HTTP ;
- chaîne GitHub Actions et publication Docker.

Les exemples pédagogiques utilisant des identifiants factices ne sont pas des secrets, mais doivent être explicitement présentés comme non adaptés à la production.
