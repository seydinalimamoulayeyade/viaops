# ViaOps — Changelog

**Dernière mise à jour :** 16 juin 2026

---

## 🎨 v1.3.0 — 16 juin 2026

### Refonte design complète — « Modern SaaS + Editorial »

**Identité visuelle**
- Direction premium inspirée des produits SaaS modernes (Linear, Vercel)
- Typographie **Inter** (interface) + **JetBrains Mono** (code/terminal)
- Dégradés violet→indigo, halo ambiant, ombres douces
- Palette enrichie : violet signature + accents émeraude, cyan, ambre

**Mode clair adouci**
- Fond gris-lavande doux (`#ECEAF2`) au lieu de blanc pur
- Texte gris foncé (moins agressif que noir pur), halo violet atténué

**Composants migrés**
- Navbar glassmorphism léger (blur), logo dégradé, chip de progression
- Cartes premium arrondies, valeurs stats en dégradé, badges en pilules
- Terminal raffiné, hero avec titre dégradé violet→cyan
- Vue module : colonne de lecture confortable, coloration syntaxique enrichie
- Quiz : feedback vert = correct

**Pipeline responsive**
- Desktop : s'enroule sur plusieurs lignes (plus de scroll horizontal)
- Mobile : empilement vertical fluide, sans scroll latéral

**Contenu**
- Mise à jour partout : 10 modules · ~100 min

---

## 🔄 v1.2.0 — 10 juin 2026

### Module bonus : ArgoCD (GitOps)
- Ajout d'un 10ᵉ module optionnel sur le déploiement continu GitOps
- Concepts : GitOps, Application, Sync, Drift Detection
- Commandes ArgoCD CLI + configuration d'application complète
- Quiz de validation et questions d'entretien
- Badge « bonus » pour le différencier des modules fondamentaux
- Certificat : mention du module bonus s'il est complété (le bonus ne compte pas
  dans les 9 modules requis)

---

## 🚀 v1.1.0 — 9 juin 2026

### Bugs corrigés
- Navigation clavier ←/→ entre modules (`shortcuts.js`)
- Affichage du certificat à la complétion des modules (`modules.js`)

### Nouvelles fonctionnalités
- Bouton « scroll to top »
- Recherche de modules en temps réel dans la sidebar
- Menu de progression (export JSON, partage, réinitialisation)
- Export de la progression au format JSON

### Améliorations design
- États de focus accessibles (WCAG 2.1 AA)
- Transitions fluides entre les vues
- États de chargement optimisés
