/* ============================================================
   VIAOPS — quiz-data.js
   Source de vérité unique des quiz de validation.
   Indexé par `id` de module (cf. data.js).

   Format :
   QUIZZES[moduleId] = {
     passingScore: 75,            // seuil de réussite en %
     questions: [
       {
         q: "énoncé (HTML autorisé)",
         options: [ { text, correct: bool, feedback } ]
       }
     ]
   }
   ============================================================ */

const QUIZZES = {
  devops: {
    passingScore: 75,
    questions: [
      {
        q: `Dans le framework CALMS, que signifie le « L » ?`,
        options: [
          { text: "A. Linux — le système de référence en DevOps", correct: false, feedback: "Non — CALMS = Culture, Automatisation, Lean, Mesure, Sharing." },
          { text: "B. Lean — éliminer les gaspillages, livrer en petits incréments", correct: true, feedback: "✓ Exact. Lean vient du Lean Manufacturing appliqué au logiciel." },
          { text: "C. Logging — centraliser tous les logs", correct: false, feedback: "Non — le logging est une pratique de monitoring, pas dans CALMS." },
          { text: "D. Launch — automatiser les mises en production", correct: false, feedback: "Non — 'Launch' n'existe pas dans CALMS." },
        ],
      },
      {
        q: `Quelle est la différence entre <strong>CI</strong> et <strong>CD</strong> ?`,
        options: [
          { text: "A. CI déploie, CD teste", correct: false, feedback: "C'est l'inverse. CI intègre/teste, CD déploie." },
          { text: "B. CI intègre et teste à chaque commit ; CD déploie le code validé", correct: true, feedback: "✓ Exact. CI = build + tests automatiques ; CD = déploiement automatique." },
          { text: "C. Ce sont deux noms pour la même chose", correct: false, feedback: "Non — l'intégration et le déploiement sont deux phases distinctes." },
          { text: "D. CI concerne l'infra, CD le code", correct: false, feedback: "Non — les deux concernent le cycle de livraison du code." },
        ],
      },
      {
        q: `Que désigne le principe de <strong>Shift Left</strong> ?`,
        options: [
          { text: "A. Déplacer les serveurs vers la gauche du datacenter", correct: false, feedback: "Non — c'est une métaphore de position dans le cycle, pas physique." },
          { text: "B. Tester et sécuriser tôt dans le cycle plutôt qu'à la fin", correct: true, feedback: "✓ Exact. On détecte bugs et failles au plus tôt, moins coûteux à corriger." },
          { text: "C. Déléguer les tests à l'équipe QA en fin de cycle", correct: false, feedback: "Non — c'est justement ce que Shift Left cherche à éviter." },
          { text: "D. Réduire le nombre de déploiements", correct: false, feedback: "Non — Shift Left concerne le moment des tests, pas la fréquence de déploiement." },
        ],
      },
      {
        q: `Qu'est-ce que l'<strong>Infrastructure as Code</strong> (IaC) ?`,
        options: [
          { text: "A. Écrire l'application dans un langage bas niveau", correct: false, feedback: "Non — l'IaC concerne l'infrastructure, pas le code applicatif." },
          { text: "B. Définir l'infrastructure dans des fichiers versionnés plutôt qu'à la main", correct: true, feedback: "✓ Exact. L'infra devient reproductible, auditable et versionnée (ex. Terraform)." },
          { text: "C. Configurer les serveurs via la console cloud", correct: false, feedback: "Non — c'est justement l'approche manuelle que l'IaC remplace." },
          { text: "D. Documenter l'infra dans un wiki", correct: false, feedback: "Non — la doc n'est pas exécutable. L'IaC provisionne réellement l'infra." },
        ],
      },
    ],
  },

  docker: {
    passingScore: 75,
    questions: [
      {
        q: `Tu lances <code>docker run -p 8080:3000 mon-app</code>. Quelle assertion est correcte ?`,
        options: [
          { text: "A. L'app écoute sur le port 8080 à l'intérieur du conteneur", correct: false, feedback: "Non — l'app écoute sur 3000 à l'intérieur. C'est 8080 qui est exposé sur l'hôte." },
          { text: "B. Le port 8080 est sur l'hôte, le port 3000 est dans le conteneur", correct: true, feedback: "✓ Exact ! Syntaxe -p HOST:CONTAINER → 8080 (hôte) redirige vers 3000 (conteneur)." },
          { text: "C. Docker choisit automatiquement les ports disponibles", correct: false, feedback: "Non — avec -p tu spécifies explicitement les deux ports." },
          { text: "D. Les données du conteneur sont automatiquement persistées", correct: false, feedback: "Non — sans volume, les données sont perdues à l'arrêt." },
        ],
      },
      {
        q: `Quelle est la différence fondamentale entre une <strong>image</strong> et un <strong>conteneur</strong> ?`,
        options: [
          { text: "A. L'image est en cours d'exécution, le conteneur est figé", correct: false, feedback: "C'est l'inverse. L'image est le template figé ; le conteneur est l'instance." },
          { text: "B. L'image est un template read-only, le conteneur est une instance en exécution", correct: true, feedback: "✓ Exact ! Image = la « classe » ; conteneur = l'« instance » vivante." },
          { text: "C. Aucune différence, ce sont des synonymes", correct: false, feedback: "Non — template figé vs instance en exécution." },
          { text: "D. Le conteneur se construit avec un Dockerfile, pas l'image", correct: false, feedback: "Non — c'est l'image qui se construit avec un Dockerfile." },
        ],
      },
      {
        q: `À quoi sert un <strong>multi-stage build</strong> dans un Dockerfile ?`,
        options: [
          { text: "A. Lancer plusieurs conteneurs en parallèle", correct: false, feedback: "Non — ça, c'est l'orchestration. Le multi-stage concerne la construction d'une image." },
          { text: "B. Séparer build et production pour une image finale légère", correct: true, feedback: "✓ Exact ! On compile dans un stage builder, on ne garde que l'artefact final." },
          { text: "C. Construire des images pour plusieurs architectures CPU", correct: false, feedback: "Non — ça, c'est le multi-platform build (buildx)." },
          { text: "D. Versionner automatiquement les tags d'image", correct: false, feedback: "Non — le tagging est manuel ou géré en CI." },
        ],
      },
      {
        q: `Ton conteneur MongoDB perd ses données à chaque redémarrage. Cause la plus probable ?`,
        options: [
          { text: "A. Il manque un volume pour persister /data/db", correct: true, feedback: "✓ Exact ! Sans volume monté, le layer d'écriture est éphémère." },
          { text: "B. Le port n'est pas correctement mappé", correct: false, feedback: "Non — le port concerne l'accès réseau, pas la persistance." },
          { text: "C. L'image mongo est trop ancienne", correct: false, feedback: "Non — la version ne provoque pas de perte de données." },
          { text: "D. Il faut lancer le conteneur en mode --detached", correct: false, feedback: "Non — le mode detached ne change rien à la persistance." },
        ],
      },
    ],
  },

  jenkins: {
    passingScore: 75,
    questions: [
      {
        q: `Dans un Jenkinsfile déclaratif, tu utilises <code>when { branch 'main' }</code>. Que se passe-t-il ?`,
        options: [
          { text: "A. Le stage s'exécute pour toutes les branches", correct: false, feedback: "Non — 'when' est une condition d'exécution du stage." },
          { text: "B. Le stage s'exécute uniquement sur les commits de la branche main", correct: true, feedback: "✓ Exact ! Idéal pour réserver le déploiement prod à la branche main." },
          { text: "C. Tout le pipeline est annulé si on n'est pas sur main", correct: false, feedback: "Non — 'when' ne filtre que ce stage, pas tout le pipeline." },
          { text: "D. Jenkins vérifie si la branche main existe", correct: false, feedback: "Non — il évalue si le build courant est sur main." },
        ],
      },
      {
        q: `Pourquoi préférer un <strong>Jenkinsfile</strong> à une configuration graphique ?`,
        options: [
          { text: "A. Il est plus rapide à exécuter", correct: false, feedback: "Non — la vitesse d'exécution ne dépend pas de la forme de la config." },
          { text: "B. Il est versionné avec le code, auditable et reproductible via Git", correct: true, feedback: "✓ Exact ! Pipeline as code : chaque branche a son pipeline, tout est tracé dans Git." },
          { text: "C. Il ne nécessite aucun agent", correct: false, feedback: "Non — un pipeline s'exécute toujours sur un agent." },
          { text: "D. Il désactive les tests automatiquement", correct: false, feedback: "Non — au contraire, il structure et fiabilise les tests." },
        ],
      },
      {
        q: `Que fait <code>agent { docker { image 'node:20-alpine' } }</code> dans un stage ?`,
        options: [
          { text: "A. Déploie l'app dans un conteneur Docker", correct: false, feedback: "Non — ça définit l'environnement d'exécution du pipeline, pas un déploiement." },
          { text: "B. Exécute les étapes dans un conteneur éphémère basé sur cette image", correct: true, feedback: "✓ Exact ! Environnement isolé et reproductible pour le build." },
          { text: "C. Installe Docker sur l'agent Jenkins", correct: false, feedback: "Non — Docker doit déjà être disponible sur l'agent." },
          { text: "D. Publie l'image sur Docker Hub", correct: false, feedback: "Non — il n'y a pas de push ici." },
        ],
      },
      {
        q: `Comment gérer proprement un token secret dans un pipeline Jenkins ?`,
        options: [
          { text: "A. L'écrire en clair dans le Jenkinsfile", correct: false, feedback: "Non — jamais de secret en clair dans le code versionné." },
          { text: "B. Utiliser Jenkins Credentials et withCredentials()", correct: true, feedback: "✓ Exact ! Les secrets sont stockés dans Jenkins et injectés à l'exécution." },
          { text: "C. Le mettre dans une variable d'environnement du repo Git", correct: false, feedback: "Non — cela reste exposé dans le repo." },
          { text: "D. Le passer en argument de la commande sh", correct: false, feedback: "Non — il apparaîtrait dans les logs du build." },
        ],
      },
    ],
  },

  sonarqube: {
    passingScore: 75,
    questions: [
      {
        q: `SonarQube détecte un « Code Smell ». Que doit-il se passer ?`,
        options: [
          { text: "A. Le build échoue immédiatement, c'est un bug critique", correct: false, feedback: "Non — un Code Smell n'est pas un bug ; c'est une mauvaise pratique." },
          { text: "B. Rien, les Code Smells sont des warnings à ignorer", correct: false, feedback: "Non — ils augmentent la dette technique." },
          { text: "C. Selon le Quality Gate : si la dette dépasse le seuil, le build échoue", correct: true, feedback: "✓ Exact ! C'est le Quality Gate qui décide du blocage." },
          { text: "D. SonarQube corrige automatiquement le Code Smell", correct: false, feedback: "Non — il détecte et rapporte, la correction reste manuelle." },
        ],
      },
      {
        q: `Quelle est la différence entre un <strong>Bug</strong> et un <strong>Code Smell</strong> ?`,
        options: [
          { text: "A. Aucune, ce sont des synonymes", correct: false, feedback: "Non — ce sont deux catégories distinctes." },
          { text: "B. Le Bug provoque un comportement incorrect ; le Code Smell nuit à la maintenabilité", correct: true, feedback: "✓ Exact ! Le Bug casse ; le Smell alourdit la maintenance." },
          { text: "C. Le Code Smell est plus grave qu'un Bug", correct: false, feedback: "Non — un Bug a un impact fonctionnel direct." },
          { text: "D. Le Bug concerne la sécurité, le Smell la performance", correct: false, feedback: "Non — la sécurité relève des Vulnerabilities." },
        ],
      },
      {
        q: `Qu'est-ce qu'un <strong>Quality Gate</strong> ?`,
        options: [
          { text: "A. Un pare-feu qui protège le serveur SonarQube", correct: false, feedback: "Non — rien à voir avec le réseau." },
          { text: "B. Un ensemble de seuils de qualité qui font échouer le build s'ils ne sont pas respectés", correct: true, feedback: "✓ Exact ! Coverage, vulnérabilités, duplication… si en dessous du seuil, build KO." },
          { text: "C. Un rapport hebdomadaire de qualité", correct: false, feedback: "Non — c'est un contrôle bloquant, pas un simple rapport." },
          { text: "D. Une passerelle réseau entre CI et prod", correct: false, feedback: "Non — c'est un contrôle qualité, pas réseau." },
        ],
      },
      {
        q: `Que représente le <strong>Coverage</strong> dans SonarQube ?`,
        options: [
          { text: "A. Le pourcentage de code couvert par les tests", correct: true, feedback: "✓ Exact ! SonarQube ingère les rapports (JaCoCo, lcov…) pour l'afficher." },
          { text: "B. Le nombre de vulnérabilités détectées", correct: false, feedback: "Non — ça, ce sont les Vulnerabilities." },
          { text: "C. Le temps d'exécution des tests", correct: false, feedback: "Non — le coverage mesure la couverture, pas la durée." },
          { text: "D. Le pourcentage de code dupliqué", correct: false, feedback: "Non — ça, c'est la Duplication." },
        ],
      },
    ],
  },

  kubernetes: {
    passingScore: 75,
    questions: [
      {
        q: `Tu définis <code>replicas: 3</code> dans un Deployment. Un pod crash. Que se passe-t-il ?`,
        options: [
          { text: "A. Kubernetes envoie une alerte mais ne fait rien", correct: false, feedback: "Non — il recrée un pod pour maintenir l'état désiré." },
          { text: "B. Kubernetes recrée automatiquement un pod pour maintenir 3 replicas", correct: true, feedback: "✓ Exact ! C'est le self-healing / state reconciliation." },
          { text: "C. Il faut relancer kubectl apply pour recréer le pod", correct: false, feedback: "Non — c'est automatique." },
          { text: "D. Le Deployment entier est supprimé", correct: false, feedback: "Non — K8s maintient au contraire le nombre de replicas." },
        ],
      },
      {
        q: `Quelle est la différence entre un <strong>Pod</strong> et un <strong>Deployment</strong> ?`,
        options: [
          { text: "A. Le Pod gère plusieurs Deployments", correct: false, feedback: "Non — c'est l'inverse de la hiérarchie." },
          { text: "B. Le Pod est l'unité d'exécution ; le Deployment gère des replicas de Pods", correct: true, feedback: "✓ Exact ! Le Deployment garantit l'état désiré et les rolling updates." },
          { text: "C. Ce sont deux noms pour la même ressource", correct: false, feedback: "Non — ce sont deux objets distincts." },
          { text: "D. Le Deployment est un conteneur, le Pod une image", correct: false, feedback: "Non — aucun des deux n'est une image." },
        ],
      },
      {
        q: `À quoi sert un <strong>Service</strong> dans Kubernetes ?`,
        options: [
          { text: "A. À stocker des données persistantes", correct: false, feedback: "Non — ça, c'est le rôle d'un Volume / PVC." },
          { text: "B. À fournir un point d'accès stable et du load balancing vers un ensemble de Pods", correct: true, feedback: "✓ Exact ! Les Pods changent d'IP, le Service reste stable." },
          { text: "C. À définir le nombre de replicas", correct: false, feedback: "Non — ça, c'est le Deployment." },
          { text: "D. À isoler les environnements", correct: false, feedback: "Non — ça, c'est le rôle d'un Namespace." },
        ],
      },
      {
        q: `À quoi sert un <strong>Namespace</strong> ?`,
        options: [
          { text: "A. À isoler logiquement des ressources dans un même cluster", correct: true, feedback: "✓ Exact ! Ex. séparer dev, staging, prod." },
          { text: "B. À exposer un Pod sur Internet", correct: false, feedback: "Non — ça relève d'un Service / Ingress." },
          { text: "C. À stocker l'état du cluster", correct: false, feedback: "Non — ça, c'est etcd." },
          { text: "D. À définir les limites CPU d'un conteneur", correct: false, feedback: "Non — ça, ce sont les resources requests/limits." },
        ],
      },
    ],
  },

  terraform: {
    passingScore: 75,
    questions: [
      {
        q: `Tu modifies une ressource AWS directement dans la console. Que se passe-t-il au prochain <code>terraform apply</code> ?`,
        options: [
          { text: "A. Terraform met à jour son state avec le changement manuel", correct: false, feedback: "Non — Terraform se base sur son state et le code, pas sur l'état réel modifié à la main." },
          { text: "B. Terraform réaligne la ressource sur le code .tf (écrase le changement manuel)", correct: true, feedback: "✓ Exact ! Le code .tf est la source de vérité : « never touch the console »." },
          { text: "C. Terraform échoue et refuse d'appliquer", correct: false, feedback: "Non — il recalcule et applique pour revenir à l'état désiré." },
          { text: "D. Terraform fusionne le changement manuel avec le code", correct: false, feedback: "Non — il n'y a pas de fusion, il force l'état du code." },
        ],
      },
      {
        q: `Pourquoi le fichier <strong>state</strong> (terraform.tfstate) est-il critique ?`,
        options: [
          { text: "A. Il contient le code de l'application", correct: false, feedback: "Non — il trace l'état de l'infra, pas le code applicatif." },
          { text: "B. Il trace l'état géré par Terraform ; le perdre fait perdre le lien avec l'infra réelle", correct: true, feedback: "✓ Exact ! En équipe, on le stocke dans S3 avec un lock." },
          { text: "C. Il n'a aucune importance, on peut le supprimer", correct: false, feedback: "Non — le supprimer est dangereux." },
          { text: "D. Il stocke les identifiants AWS", correct: false, feedback: "Non — les credentials ne doivent pas y être stockés en clair." },
        ],
      },
      {
        q: `Pourquoi lancer <code>terraform plan</code> avant <code>apply</code> ?`,
        options: [
          { text: "A. Pour accélérer l'exécution du apply", correct: false, feedback: "Non — plan ne rend pas apply plus rapide." },
          { text: "B. Pour prévisualiser ce qui sera créé, modifié ou détruit avant d'agir", correct: true, feedback: "✓ Exact ! Cela évite les surprises et permet une revue." },
          { text: "C. Pour installer les providers", correct: false, feedback: "Non — ça, c'est terraform init." },
          { text: "D. Pour formater les fichiers .tf", correct: false, feedback: "Non — ça, c'est terraform fmt." },
        ],
      },
      {
        q: `Qu'est-ce qu'un <strong>Module</strong> Terraform ?`,
        options: [
          { text: "A. Un plugin pour communiquer avec un cloud", correct: false, feedback: "Non — ça, c'est un Provider." },
          { text: "B. Un ensemble de ressources réutilisables, comme une fonction", correct: true, feedback: "✓ Exact ! Il factorise et réutilise des blocs d'infra." },
          { text: "C. Le fichier qui trace l'état de l'infra", correct: false, feedback: "Non — ça, c'est le state." },
          { text: "D. La commande qui applique les changements", correct: false, feedback: "Non — ça, c'est apply." },
        ],
      },
    ],
  },

  prometheus: {
    passingScore: 75,
    questions: [
      {
        q: `Prometheus utilise un modèle « pull ». Qu'est-ce que cela signifie ?`,
        options: [
          { text: "A. Les services envoient leurs métriques à Prometheus", correct: false, feedback: "Non — ça, ce serait un modèle push." },
          { text: "B. Prometheus interroge régulièrement les endpoints /metrics des services", correct: true, feedback: "✓ Exact ! Il scrape à intervalle régulier (scrape_interval)." },
          { text: "C. Prometheus lit les fichiers logs", correct: false, feedback: "Non — il scrape des métriques HTTP, pas des logs." },
          { text: "D. Grafana collecte et transmet les métriques", correct: false, feedback: "Non — Grafana ne fait que visualiser." },
        ],
      },
      {
        q: `Quelle est la différence entre <strong>Prometheus</strong> et <strong>Grafana</strong> ?`,
        options: [
          { text: "A. Prometheus visualise, Grafana collecte", correct: false, feedback: "C'est l'inverse." },
          { text: "B. Prometheus collecte/stocke les métriques ; Grafana les affiche en dashboards", correct: true, feedback: "✓ Exact ! Prometheus = backend, Grafana = frontend." },
          { text: "C. Ce sont deux noms du même outil", correct: false, feedback: "Non — ce sont deux outils complémentaires." },
          { text: "D. Grafana remplace Prometheus", correct: false, feedback: "Non — Grafana se connecte à Prometheus comme source." },
        ],
      },
      {
        q: `Qu'est-ce qu'un <strong>Exporter</strong> ?`,
        options: [
          { text: "A. Un service qui expose des métriques au format Prometheus via /metrics", correct: true, feedback: "✓ Exact ! Ex. node_exporter pour les métriques système." },
          { text: "B. Un outil qui exporte les dashboards Grafana", correct: false, feedback: "Non — rien à voir avec l'export de dashboards." },
          { text: "C. Le langage de requête de Prometheus", correct: false, feedback: "Non — ça, c'est PromQL." },
          { text: "D. Un système d'alerte", correct: false, feedback: "Non — ça, c'est Alertmanager." },
        ],
      },
      {
        q: `Quelle métrique choisir pour l'usage CPU qui monte et descend ?`,
        options: [
          { text: "A. Counter", correct: false, feedback: "Non — un Counter ne fait qu'augmenter." },
          { text: "B. Gauge", correct: true, feedback: "✓ Exact ! Un Gauge peut monter et descendre (CPU, RAM, température)." },
          { text: "C. Histogram", correct: false, feedback: "Non — l'Histogram sert aux distributions (latences)." },
          { text: "D. Summary", correct: false, feedback: "Non — le Summary calcule des quantiles côté client." },
        ],
      },
    ],
  },

  trivy: {
    passingScore: 75,
    questions: [
      {
        q: `Trivy détecte une CVE CRITICAL dans ton image. Que doit-il se passer dans un CI/CD bien configuré ?`,
        options: [
          { text: "A. Un warning s'affiche mais le déploiement continue", correct: false, feedback: "Non — laisser passer une CVE CRITICAL est inacceptable." },
          { text: "B. Le build échoue et le déploiement est bloqué", correct: true, feedback: "✓ Exact ! Avec exit-code: 1, le pipeline échoue tant que la CVE n'est pas corrigée." },
          { text: "C. Trivy corrige la vulnérabilité et rebuild l'image", correct: false, feedback: "Non — Trivy détecte et rapporte, il ne corrige pas." },
          { text: "D. Un email est envoyé mais le code avance", correct: false, feedback: "Non — Trivy fait échouer le pipeline." },
        ],
      },
      {
        q: `Que peut scanner Trivy ?`,
        options: [
          { text: "A. Uniquement des images Docker", correct: false, feedback: "Non — Trivy va bien au-delà." },
          { text: "B. Images, filesystem, repos Git, manifests K8s et IaC", correct: true, feedback: "✓ Exact ! C'est un scanner polyvalent." },
          { text: "C. Uniquement du code source Python", correct: false, feedback: "Non — il est multi-langages et multi-cibles." },
          { text: "D. Uniquement les bases de données", correct: false, feedback: "Non — Trivy ne scanne pas des bases de données." },
        ],
      },
      {
        q: `Que désigne une <strong>CVE</strong> ?`,
        options: [
          { text: "A. Un identifiant unique de vulnérabilité de sécurité connue", correct: true, feedback: "✓ Exact ! Common Vulnerabilities and Exposures (ex. CVE-2024-1234)." },
          { text: "B. Une commande de validation d'environnement", correct: false, feedback: "Non — CVE n'est pas une commande." },
          { text: "C. Un format d'image conteneur", correct: false, feedback: "Non — rien à voir avec les formats d'image." },
          { text: "D. Un niveau de sévérité", correct: false, feedback: "Non — la sévérité est LOW/MEDIUM/HIGH/CRITICAL, distincte de la CVE." },
        ],
      },
      {
        q: `Que signifie le <strong>Shift Left Security</strong> ?`,
        options: [
          { text: "A. Déléguer la sécurité à l'équipe ops en fin de cycle", correct: false, feedback: "Non — c'est l'inverse de l'idée." },
          { text: "B. Détecter les failles au plus tôt (dès le dev / CI), pas en prod", correct: true, feedback: "✓ Exact ! Trivy dans le CI bloque avant la prod." },
          { text: "C. Scanner uniquement en production", correct: false, feedback: "Non — trop tard, c'est ce qu'on veut éviter." },
          { text: "D. Réduire le nombre de scans de sécurité", correct: false, feedback: "Non — on scanne au contraire plus tôt et souvent." },
        ],
      },
    ],
  },

  'ia-devops': {
    passingScore: 75,
    questions: [
      {
        q: `Tu utilises K8sGPT pour diagnostiquer un cluster. Que fait cet outil ?`,
        options: [
          { text: "A. Il déploie des pods optimisés via GPT", correct: false, feedback: "Non — c'est un outil de diagnostic, pas de déploiement." },
          { text: "B. Il analyse le cluster, détecte les problèmes et utilise un LLM pour expliquer et proposer des solutions", correct: true, feedback: "✓ Exact ! Diagnostic + explication IA de la cause root." },
          { text: "C. Il génère des logs à envoyer à ChatGPT manuellement", correct: false, feedback: "Non — il interroge directement l'API Kubernetes." },
          { text: "D. Il remplace kubectl par une interface conversationnelle", correct: false, feedback: "Non — il ajoute une couche d'analyse IA, ne remplace pas kubectl." },
        ],
      },
      {
        q: `Comment l'IA améliore-t-elle concrètement le travail DevOps ?`,
        options: [
          { text: "A. En supprimant le besoin de tester le code", correct: false, feedback: "Non — la validation reste indispensable." },
          { text: "B. En accélérant la génération de code, l'analyse de logs et les optimisations", correct: true, feedback: "✓ Exact ! Elle réduit notamment le MTTR." },
          { text: "C. En remplaçant totalement l'ingénieur DevOps", correct: false, feedback: "Non — l'expertise humaine reste nécessaire." },
          { text: "D. En gérant seule la production sans supervision", correct: false, feedback: "Non — supervision et revue restent requises." },
        ],
      },
      {
        q: `Quel est le principal risque à utiliser l'IA en DevOps sans précaution ?`,
        options: [
          { text: "A. Elle ralentit systématiquement les pipelines", correct: false, feedback: "Non — elle tend plutôt à accélérer." },
          { text: "B. Elle peut générer du code non sécurisé ou non optimisé si on ne revoit pas", correct: true, feedback: "✓ Exact ! Toujours valider, tester et reviewer ce qu'elle produit." },
          { text: "C. Elle supprime les fichiers de config", correct: false, feedback: "Non — ce n'est pas un comportement intrinsèque." },
          { text: "D. Elle empêche l'accès au cluster", correct: false, feedback: "Non — aucun rapport." },
        ],
      },
      {
        q: `Quel est un cas d'usage typique de l'IA générative en DevOps ?`,
        options: [
          { text: "A. Générer un Dockerfile ou un Jenkinsfile à partir d'une description", correct: true, feedback: "✓ Exact ! Génération de code/config, à valider ensuite." },
          { text: "B. Remplacer le système de monitoring", correct: false, feedback: "Non — l'IA aide à analyser, pas à remplacer Prometheus." },
          { text: "C. Héberger les conteneurs de production", correct: false, feedback: "Non — ce n'est pas un runtime." },
          { text: "D. Servir de registry d'images", correct: false, feedback: "Non — aucun rapport avec un registry." },
        ],
      },
    ],
  },

  argocd: {
    passingScore: 75,
    questions: [
      {
        q: `Avec <code>selfHeal: true</code>, un collègue fait <code>kubectl scale --replicas=10</code>. Que se passe-t-il ?`,
        options: [
          { text: "A. Le deployment reste scalé à 10 replicas", correct: false, feedback: "Non — ArgoCD détecte le drift et restaure l'état Git." },
          { text: "B. ArgoCD détecte le drift et restaure l'état défini dans Git", correct: true, feedback: "✓ Exact ! Git est la source de vérité, selfHeal resynchronise." },
          { text: "C. ArgoCD envoie une alerte mais ne modifie rien", correct: false, feedback: "Non — avec selfHeal, il corrige automatiquement." },
          { text: "D. ArgoCD met à jour Git avec replicas: 10", correct: false, feedback: "Non — ArgoCD ne modifie jamais Git automatiquement." },
        ],
      },
      {
        q: `Qu'est-ce que le <strong>GitOps</strong> ?`,
        options: [
          { text: "A. Une méthode où Git est la source unique de vérité de l'infra et des déploiements", correct: true, feedback: "✓ Exact ! Tout changement passe par Git, un opérateur synchronise le cluster." },
          { text: "B. Un outil de CI qui remplace Jenkins", correct: false, feedback: "Non — c'est une philosophie, pas un outil de CI." },
          { text: "C. Un système de gestion de branches Git", correct: false, feedback: "Non — ça va bien au-delà du branching." },
          { text: "D. Un registre d'images Docker", correct: false, feedback: "Non — aucun rapport." },
        ],
      },
      {
        q: `Pourquoi préférer ArgoCD à un simple <code>kubectl apply</code> dans Jenkins ?`,
        options: [
          { text: "A. C'est plus rapide à taper", correct: false, feedback: "Non — la vraie valeur n'est pas la vitesse de frappe." },
          { text: "B. Il apporte drift detection, rollback, audit Git et état toujours synchronisé", correct: true, feedback: "✓ Exact ! kubectl apply est unidirectionnel et ne détecte pas les drifts." },
          { text: "C. Il supprime le besoin de Kubernetes", correct: false, feedback: "Non — ArgoCD déploie justement vers Kubernetes." },
          { text: "D. Il compile les images Docker", correct: false, feedback: "Non — ça reste le rôle du CI (Jenkins)." },
        ],
      },
      {
        q: `Que fait l'option <code>prune: true</code> dans une Application ArgoCD ?`,
        options: [
          { text: "A. Elle supprime du cluster les ressources absentes de Git", correct: true, feedback: "✓ Exact ! Le cluster reflète exactement Git, y compris les suppressions." },
          { text: "B. Elle compresse les images pour gagner de l'espace", correct: false, feedback: "Non — rien à voir avec les images." },
          { text: "C. Elle désactive le self-healing", correct: false, feedback: "Non — c'est indépendant de selfHeal." },
          { text: "D. Elle archive les anciens commits Git", correct: false, feedback: "Non — ArgoCD ne touche pas à l'historique Git." },
        ],
      },
    ],
  },
};
