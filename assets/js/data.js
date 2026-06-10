/* ============================================================
   VIAOPS — data.js
   Single source of truth for all modules & pipeline stages
   ============================================================ */

const MODULES = [
  {
    id:    'devops',
    icon:  '♾️',
    label: 'DevOps',
    tag:   'Culture & CALMS',
    time:  '~10 min',
    stage: 'culture',
  },
  {
    id:    'docker',
    icon:  '🐳',
    label: 'Docker',
    tag:   'Conteneurisation',
    time:  '~10 min',
    stage: 'build',
  },
  {
    id:    'jenkins',
    icon:  '🔧',
    label: 'Jenkins',
    tag:   'CI/CD',
    time:  '~10 min',
    stage: 'ci',
  },
  {
    id:    'sonarqube',
    icon:  '🔍',
    label: 'SonarQube',
    tag:   'Qualité du code',
    time:  '~10 min',
    stage: 'test',
  },
  {
    id:    'kubernetes',
    icon:  '☸️',
    label: 'Kubernetes',
    tag:   'Orchestration',
    time:  '~10 min',
    stage: 'deploy',
  },
  {
    id:    'terraform',
    icon:  '🌍',
    label: 'Terraform',
    tag:   'IaC',
    time:  '~10 min',
    stage: 'infra',
  },
  {
    id:    'prometheus',
    icon:  '📊',
    label: 'Prometheus / Grafana',
    tag:   'Monitoring',
    time:  '~10 min',
    stage: 'monitor',
  },
  {
    id:    'trivy',
    icon:  '🛡️',
    label: 'Trivy',
    tag:   'Sécurité',
    time:  '~10 min',
    stage: 'security',
  },
  {
    id:    'ia-devops',
    icon:  '🤖',
    label: 'IA pour DevOps',
    tag:   'AI/Ops',
    time:  '~10 min',
    stage: 'ai',
  },
  {
    id:    'argocd',
    icon:  '🔄',
    label: 'ArgoCD',
    tag:   'GitOps · CD',
    time:  '~10 min',
    stage: 'gitops',
    bonus: true,
  },
];

/* Pipeline stages — GitLab CI grouping */
const STAGES = [
  { label: 'Culture',  jobs: [0] },
  { label: 'Build',    jobs: [1] },
  { label: 'CI/CD',    jobs: [2, 3] },
  { label: 'Security', jobs: [7] },
  { label: 'Deploy',   jobs: [4, 5] },
  { label: 'Monitor',  jobs: [6] },
  { label: 'AI/Ops',   jobs: [8] },
  { label: 'GitOps',   jobs: [9], bonus: true },
];
