# ViaOps — La voie DevOps 🚀

**Plateforme d'apprentissage DevOps** — 9 outils essentiels en 10 minutes par outil, structurés comme un vrai pipeline CI/CD.

[![Version](https://img.shields.io/badge/version-1.0.0-violet.svg)](https://github.com)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-production-success.svg)](https://github.com)

---

## 🎯 Vision

**ViaOps** n'est pas un cours, pas une doc, pas un tutoriel YouTube. C'est un **compagnon de démarrage** — on entre sans savoir, on sort avec l'essentiel opérationnel et ce qu'il faut dire en entretien.

### Le problème résolu

Quand on débute en DevOps :

- La documentation est **massive**
- Les tutoriels sont **éparpillés**
- On ne sait **pas par où commencer**

**ViaOps** répond : une ressource gratuite, structurée comme un vrai pipeline CI/CD, pour comprendre les outils essentiels sans se noyer.

---

## ⚡ Quick Start

```bash
# Clone
git clone https://github.com/username/viaops.git
cd viaops

# Ouvrir
open index.html
# ou
python -m http.server 8000
```

**C'est tout !** Aucune dépendance, 100% vanilla.

---

## 🛠️ Les 9 modules

| # | Module | Durée | Thème |
|---|--------|-------|-------|
| 01 | **DevOps** | 10 min | Culture & Concepts |
| 02 | **Docker** | 10 min | Conteneurisation |
| 03 | **Jenkins** | 10 min | CI/CD Automation |
| 04 | **SonarQube** | 10 min | Code Quality |
| 05 | **Kubernetes** | 10 min | Orchestration |
| 06 | **Terraform** | 10 min | Infrastructure as Code |
| 07 | **Prometheus/Grafana** | 10 min | Monitoring |
| 08 | **Trivy** | 10 min | Security Scanning |
| 09 | **IA pour DevOps** | 10 min | Automation AI |

**Total : ~90 minutes** pour maîtriser l'essentiel.

---

## 📚 Structure de chaque module

Chaque module suit **exactement la même structure** :

```text
01 · Le problème
    ↓ Quelle douleur existait avant ?

02 · Concepts clés
    ↓ 3-5 notions fondamentales

03 · Commandes de référence
    ↓ Config centrale annotée

04 · Place dans le pipeline
    ↓ Où l'outil s'insère

05 · Quiz & Entretien
    ↓ Validation + préparation recruteur
```

**Prédictible. Efficace. Dense.**

---

## ✨ Fonctionnalités

### 🎨 Design "Paper Mode"

- Mode sombre/clair (toggle navbar)
- Typographie lisible (15px+)
- Espacement généreux
- Une seule couleur d'accent (violet)
- Focus sur le contenu

### ⌨️ Raccourcis clavier

- `H` → Accueil
- `M` → Modules
- `←/→` → Navigation modules
- `ESC` → Retour
- `?` → Aide

### 🏆 Gamification

- Suivi progression (localStorage)
- Certificat PNG auto-généré à 9/9
- Toast de succès
- Badges modules

### 📱 Responsive

- Mobile-first
- Sidebar collapse
- Touch-friendly
- Progressive web app ready

---

## 🏗️ Architecture

```text
viaops/
├── index.html              # SPA entry point
├── assets/
│   ├── css/
│   │   ├── main.css        # Tokens + layout
│   │   ├── navbar.css      # Top nav + theme toggle
│   │   ├── panels.css      # Cards + badges
│   │   ├── pipeline.css    # Pipeline view
│   │   ├── modules.css     # Module content
│   │   ├── shortcuts.css   # Keyboard modal
│   │   └── certificate.css # Cert modal
│   └── js/
│       ├── data.js         # Modules data
│       ├── router.js       # SPA routing
│       ├── progress.js     # localStorage tracking
│       ├── pipeline.js     # Pipeline rendering
│       ├── sidebar.js      # Module sidebar
│       ├── modules.js      # Module view
│       ├── shortcuts.js    # Keyboard nav
│       ├── theme.js        # Dark/Light mode
│       └── certificate.js  # PNG generation
└── modules/
    ├── devops.html
    ├── docker.html
    ├── jenkins.html
    └── ... (9 total)
```

**Stack :**

- HTML5 / CSS3 / Vanilla JS
- 0 dépendances
- 0 build step
- ~3,500 lignes de code

---

## 🚢 Déploiement

### GitHub Pages (recommandé)

```bash
# Push vers GitHub
git push origin main

# Activer Pages
# Settings → Pages → Source: main branch
```

### Docker

```bash
# Build
docker build -t viaops:1.0 .

# Run
docker run -p 8080:80 viaops:1.0

# Visit
open http://localhost:8080
```

### Netlify / Vercel

Drag & drop le dossier dans l'interface. C'est tout !

---

## 🎨 Design System

### Couleurs

```css
/* Dark mode (default) */
--bg:     #1A1A1A
--panel:  #252525
--text:   #E8E8E8
--violet: #8B5CF6

/* Light mode */
--bg:     #FAFAFA
--panel:  #FFFFFF
--text:   #1A1A1A
--violet: #8B5CF6  (inchangé)
```

### Typographie

```css
--font:      'IBM Plex Mono'
--font-sans: 'IBM Plex Sans'

Body:     15px / 1.7
Headings: 20-48px
Code:     13px / 1.8
```

### Spacing

```text
Dashboard:  32px padding
Panels:     32px padding
Gaps:       16-24px
Borders:    6-8px radius
```

---

## 📊 Métriques

### Contenu

- **9 modules** complets
- **54+ concepts** clés
- **90+ commandes** référencées
- **9 quiz** interactifs
- **27 questions** entretien

### Code

- **3,500 lignes** de code
- **0 dépendances** externes
- **100% vanilla** JS/CSS
- **<500KB** total

### Performance

- **First Paint** : <200ms
- **Interactive** : <300ms
- **Lighthouse** : 95+ score
- **A11y** : WCAG AA compliant

---

## 🤝 Contribution

ViaOps est open source ! Contributions bienvenues :

1. **Fork** le projet
2. **Créer** une branche (`git checkout -b feature/ma-feature`)
3. **Commit** vos changements (`git commit -m 'Add: ma feature'`)
4. **Push** (`git push origin feature/ma-feature`)
5. **Ouvrir** une Pull Request

### Guidelines

- Suivre la structure existante (5 sections par module)
- Respecter le design system (Paper Mode)
- Tester sur mobile + desktop
- Ajouter des tests si nécessaire

---

## 📄 License

MIT License - voir [LICENSE](LICENSE)

**En résumé :** Utilisez, modifiez, partagez librement. Attribution appréciée.

---

## 👤 Auteur

**Virtual Voyager**  
MERN Stack Developer → Cloud & DevOps Engineer  
Dakar, Sénégal

- LinkedIn: [linkedin.com/in/limamou-laye](https://linkedin.com/in/limamou-laye)
- Portfolio: Coming soon
- Email: contact@viaops.dev

---

## 🙏 Remerciements

- **IBM Plex** pour la typographie
- **Grafana** pour l'inspiration UI
- **GitLab CI** pour la logique pipeline
- **La communauté DevOps** pour le feedback

---

## 🗺️ Roadmap

### Phase 1 ✅ (Complétée)

- [x] Shell & Navigation SPA
- [x] 9 modules complets
- [x] Design Paper Mode
- [x] Responsive mobile

### Phase 2 ✅ (Complétée)

- [x] Raccourcis clavier
- [x] Mode sombre/clair
- [x] Certificat complétion
- [x] Progression tracking

### Phase 3 🚧 (En cours)

- [ ] Déploiement GitHub Pages
- [ ] CI/CD pipeline complet
- [ ] Docker Hub push
- [ ] Analytics intégration

### Phase 4 📅 (Planifiée)

- [ ] Multi-langue (EN, ES)
- [ ] Recherche modules
- [ ] Notes personnelles
- [ ] Export PDF modules

---

## 📞 Support

**Des questions ?** **Des bugs ?** **Des suggestions ?**

- Ouvrir une [Issue](https://github.com/username/viaops/issues)
- Discussion [GitHub Discussions](https://github.com/username/viaops/discussions)
- Email: support@viaops.dev

---

<div align="center">

**Construit avec ❤️ à Dakar, Sénégal**

⭐ **Star ce projet** si tu l'as trouvé utile !

[Documentation](https://docs.viaops.dev) · [Demo Live](https://viaops.dev) · [Changelog](CHANGELOG.md)

</div>
