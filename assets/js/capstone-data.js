/* ============================================================
   VIAOPS — capstone-data.js
   Parcours fil rouge « De zéro à la prod ».
   Relie les 10 modules en un scénario de déploiement complet.
   Chaque étape pointe vers le module correspondant (moduleIdx).
   ============================================================ */

const CAPSTONE = {
  app: {
    name: 'viaops-zero-to-prod',
    stack: 'App MERN — MongoDB · Express · React · Node',
    repo: 'https://github.com/seydinalimamoulayeyade/viaops-zero-to-prod',
  },

  steps: [
    {
      ref: '01', title: 'Source & versionnage', tool: 'devops', moduleIdx: 0,
      desc: "Le code vit sur GitHub. Chaque push sur main déclenche le pipeline via un webhook.",
      lang: 'bash',
      code: `git add .\ngit commit -m "feat: nouvelle route /health"\ngit push origin main`,
    },
    {
      ref: '02', title: 'Conteneurisation', tool: 'docker', moduleIdx: 1,
      desc: "L'app est empaquetée en image légère via un build multi-stage.",
      lang: 'dockerfile',
      code: `FROM node:20-alpine AS build\nWORKDIR /app\nCOPY . . && npm ci && npm run build\n\nFROM node:20-alpine\nCOPY --from=build /app/dist ./dist\nCMD ["node","dist/server.js"]`,
    },
    {
      ref: '03', title: 'Intégration continue', tool: 'jenkins', moduleIdx: 2,
      desc: "Jenkins installe, teste et construit l'artefact à chaque commit.",
      lang: 'groovy',
      code: `stage('Test')  { steps { sh 'npm ci && npm test' } }\nstage('Build') { steps { sh 'docker build -t viaops-zero-to-prod:$GIT_COMMIT .' } }`,
    },
    {
      ref: '04', title: 'Qualité du code', tool: 'sonarqube', moduleIdx: 3,
      desc: "SonarQube analyse le code ; le Quality Gate bloque si le seuil n'est pas tenu.",
      lang: 'bash',
      code: `sonar-scanner -Dsonar.projectKey=viaops-zero-to-prod\n# waitForQualityGate abortPipeline: true`,
    },
    {
      ref: '05', title: 'Scan de sécurité', tool: 'trivy', moduleIdx: 7,
      desc: "Trivy scanne l'image ; le build échoue en cas de CVE HIGH/CRITICAL.",
      lang: 'bash',
      code: `trivy image --severity HIGH,CRITICAL --exit-code 1 viaops-zero-to-prod:$GIT_COMMIT`,
    },
    {
      ref: '06', title: 'Infrastructure', tool: 'terraform', moduleIdx: 5,
      desc: "Terraform provisionne le cluster et le registry, en code versionné.",
      lang: 'terraform',
      code: `resource "aws_eks_cluster" "viaops" {\n  name     = "viaops-prod"\n  version  = "1.29"\n}`,
    },
    {
      ref: '07', title: 'Orchestration', tool: 'kubernetes', moduleIdx: 4,
      desc: "Les manifests décrivent l'état désiré : 3 replicas, service, self-healing.",
      lang: 'yaml',
      code: `kind: Deployment\nspec:\n  replicas: 3\n  template:\n    spec:\n      containers:\n      - image: viaops-zero-to-prod:$GIT_COMMIT`,
    },
    {
      ref: '08', title: 'Déploiement GitOps', tool: 'argocd', moduleIdx: 9,
      desc: "ArgoCD détecte le changement de manifest dans Git et synchronise le cluster.",
      lang: 'yaml',
      code: `syncPolicy:\n  automated:\n    prune: true\n    selfHeal: true`,
    },
    {
      ref: '09', title: 'Observabilité', tool: 'prometheus', moduleIdx: 6,
      desc: "Prometheus scrape les métriques, Grafana les affiche, les alertes remontent.",
      lang: 'promql',
      code: `histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))`,
    },
  ],

  // Accélérateur transversal (pas une étape séquentielle)
  transversal: {
    tool: 'ia-devops', moduleIdx: 8,
    title: 'IA / Ops — accélérateur transversal',
    desc: "À chaque étape, l'IA génère du code, explique les erreurs et optimise les configs (K8sGPT, Copilot).",
  },
};
