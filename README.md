# ViaOps — La voie DevOps

> Plateforme d'apprentissage DevOps open source — 9 outils essentiels, structurés comme un vrai pipeline CI/CD.

![Version](https://img.shields.io/badge/version-1.0.0--phase1-8B5CF6)
![Status](https://img.shields.io/badge/status-actif-23D160)
![License](https://img.shields.io/badge/license-MIT-22D3EE)

---

## Présentation

**ViaOps** s'adresse à tout développeur ou étudiant qui veut comprendre les outils DevOps incontournables — sans se noyer dans la documentation.

Chaque outil est présenté en ~10 minutes avec :
- Le **problème** qu'il résout
- Les **concepts clés** (3 à 5, pas plus)
- La **commande / config de référence**
- Sa **place dans le pipeline** CI/CD
- Un **quiz** de validation + ce qu'il faut savoir en entretien

---

## Outils couverts

| # | Outil | Catégorie | Stage pipeline |
|---|-------|-----------|---------------|
| 01 | ♾️ DevOps | Culture & CALMS | culture |
| 02 | 🐳 Docker | Conteneurisation | build |
| 03 | 🔧 Jenkins | CI/CD | ci |
| 04 | 🔍 SonarQube | Qualité du code | test |
| 05 | ☸️ Kubernetes | Orchestration | deploy |
| 06 | 🌍 Terraform | IaC | infra |
| 07 | 📊 Prometheus / Grafana | Monitoring | monitor |
| 08 | 🛡️ Trivy | Sécurité | security |
| 09 | 🤖 IA pour DevOps | AI/Ops | ai |

---

## Stack technique

```
Frontend     →  HTML / CSS / JS (vanilla, zéro framework)
Container    →  Docker
CI/CD        →  GitHub Actions
Hosting      →  GitHub Pages
```

---

## Structure du projet

```
viaops/
├── index.html                  # Point d'entrée
├── assets/
│   ├── css/
│   │   ├── main.css            # Tokens, reset, layout
│   │   ├── navbar.css          # Barre de navigation
│   │   ├── panels.css          # Système de panels Grafana
│   │   ├── pipeline.css        # Pipeline GitLab CI + terminal
│   │   └── modules.css         # Sidebar + vue module
│   └── js/
│       ├── data.js             # Source de vérité des 9 modules
│       ├── progress.js         # Tracker localStorage
│       ├── router.js           # Gestion des vues
│       ├── pipeline.js         # Build pipeline dynamique
│       ├── sidebar.js          # Build sidebar
│       └── modules.js          # Renderer module
├── modules/                    # (Phase 2) contenu HTML par outil
├── Dockerfile
├── docker-compose.yml
└── .github/
    └── workflows/
        └── deploy.yml
```

---

## Lancer en local

### Sans Docker

```bash
git clone https://github.com/seydinalimamoulayeyade/viaops.git
cd viaops
# Ouvrir index.html dans le navigateur
open index.html
```

### Avec Docker

```bash
docker build -t viaops:latest .
docker run -p 8080:80 viaops:latest
# Accéder à http://localhost:8080
```

### Avec Docker Compose

```bash
docker compose up -d
# Accéder à http://localhost:8080
```

---

## Roadmap

- [x] **Phase 1** — Shell, navigation, pipeline GitLab CI, progress tracker
- [ ] **Phase 2** — Contenu des 9 modules (concepts, commandes, quiz)
- [ ] **Phase 3** — Dockerisation + pipeline GitHub Actions + déploiement

---

## Design

Inspiré de :
- **Grafana** — système de panels, densité, dark theme
- **GitLab CI** — pipeline stages avec statuts job
- **Sentry** — alert bars, feedback inline

Palette **Midnight Aurora DevOps** — `#0F0F0F` · `#8B5CF6` · `#22D3EE` · `#23D160`

---

## Auteur

**Virtual Voyager** — MERN Stack Developer → Cloud & DevOps Engineer  
Dakar, Sénégal · 2026  
[linkedin.com/in/limamou-laye](https://linkedin.com/in/limamou-laye)

---

## License

MIT — libre d'utilisation, de modification et de distribution.
