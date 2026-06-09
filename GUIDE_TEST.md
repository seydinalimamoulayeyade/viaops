# Guide de Test — ViaOps v1.1.0

**Date :** 9 juin 2026  
**Version testée :** v1.1.0

---

## 🚀 **Lancement rapide**

### Option 1 : Ouvrir directement (Recommandé)
```bash
# Windows
start index.html

# Mac/Linux
open index.html
```

### Option 2 : Serveur local
```bash
# Python 3
python -m http.server 8000

# Node.js (si http-server installé)
npx http-server -p 8000

# Puis ouvrir : http://localhost:8000
```

### Option 3 : Docker (Production-like)
```bash
docker-compose up
# Ouvrir : http://localhost
```

---

## ✅ **Checklist de test**

### 1. Bugs corrigés (Priorité haute)

#### Bug #1 : Navigation clavier ←/→
- [ ] Ouvrir n'importe quel module
- [ ] Appuyer sur **→** (flèche droite)
- [ ] ✅ **Attendu :** Passe au module suivant
- [ ] Appuyer sur **←** (flèche gauche)
- [ ] ✅ **Attendu :** Revient au module précédent
- [ ] Vérifier console : Aucune erreur `ModuleView.load is not a function`

#### Bug #2 : Certificat à 9/9 modules
- [ ] Compléter les 9 modules (cliquer "Marquer comme vu" sur chacun)
- [ ] ✅ **Attendu :** Modal certificat apparaît automatiquement
- [ ] Vérifier console : Aucune erreur `Router.show('recap')`

---

### 2. Nouvelles fonctionnalités

#### Scroll to Top 🔝
- [ ] Scroller vers le bas (>400px)
- [ ] ✅ **Attendu :** Bouton violet ↑ apparaît en bas à droite
- [ ] Cliquer sur le bouton
- [ ] ✅ **Attendu :** Scroll smooth vers le haut
- [ ] Bouton disparaît en haut de page

#### Recherche de modules 🔍
- [ ] Aller dans **Modules** (nav ou bouton)
- [ ] Observer la sidebar : Input de recherche au-dessus de la liste
- [ ] Taper "docker" dans l'input
- [ ] ✅ **Attendu :** Seul Docker s'affiche
- [ ] Taper "ci"
- [ ] ✅ **Attendu :** Jenkins et SonarQube s'affichent
- [ ] Taper "xyz123"
- [ ] ✅ **Attendu :** Message "Aucun module trouvé"
- [ ] Appuyer sur **ESC**
- [ ] ✅ **Attendu :** Input effacé, tous les modules réaffichés

#### Menu progression 📊
- [ ] Observer la navbar : Bouton **⋮** (après le toggle thème)
- [ ] Cliquer sur **⋮**
- [ ] ✅ **Attendu :** Menu dropdown avec 4 options
- [ ] Vérifier l'affichage de progression : "X/9 (XX%)"

**Test Export JSON :**
- [ ] Cliquer sur "💾 Exporter (JSON)"
- [ ] ✅ **Attendu :** Fichier `viaops-progress-YYYY-MM-DD.json` téléchargé
- [ ] Ouvrir le fichier JSON
- [ ] ✅ **Attendu :** Structure valide avec version, timestamp, modules

**Test Partager :**
- [ ] Cliquer sur "📤 Partager"
- [ ] ✅ **Attendu (Mobile) :** Web Share API s'ouvre
- [ ] ✅ **Attendu (Desktop) :** Toast "Copié dans le presse-papier"
- [ ] Coller dans un éditeur
- [ ] ✅ **Attendu :** Texte "J'ai complété X/9 modules ViaOps..."

**Test Réinitialiser :**
- [ ] Cliquer sur "🔄 Réinitialiser"
- [ ] ✅ **Attendu :** Popup de confirmation
- [ ] Cliquer "OK"
- [ ] ✅ **Attendu :** 
  - Progression remise à 0/9
  - Navbar affiche 0/9
  - Pipeline affiche tous les modules en "pending"
  - Toast "Progression réinitialisée"

---

### 3. Améliorations design

#### Focus states (Accessibilité)
- [ ] Appuyer sur **TAB** plusieurs fois
- [ ] ✅ **Attendu :** Outline violet visible sur chaque élément
- [ ] Naviguer avec **TAB** jusqu'à un bouton
- [ ] Appuyer sur **ENTER** ou **SPACE**
- [ ] ✅ **Attendu :** Action exécutée

#### Transitions de vue
- [ ] Aller sur **Accueil** → **Modules** → **À propos**
- [ ] ✅ **Attendu :** Animation fade-in + slide-up (400ms)
- [ ] Pas de flash ou saccade

#### Loading states
- [ ] Ouvrir un module (la première fois)
- [ ] ✅ **Attendu :** Loading bar animée + texte "Chargement..."
- [ ] Après ~200ms : Contenu affiché

---

### 4. Raccourcis clavier (existants)

| Touche | Action attendue |
|--------|----------------|
| **H** | Retour Accueil |
| **M** | Ouvrir Modules |
| **A** | Ouvrir À propos |
| **ESC** | Retour Accueil (de n'importe où) |
| **←** | Module précédent (dans vue Modules) |
| **→** | Module suivant (dans vue Modules) |
| **?** | Afficher modal aide |

**Test complet :**
- [ ] Appuyer sur **M** → Modules s'ouvre
- [ ] Appuyer sur **→** plusieurs fois → Navigation modules
- [ ] Appuyer sur **ESC** → Retour accueil
- [ ] Appuyer sur **?** → Modal aide s'affiche
- [ ] Appuyer sur **ESC** → Modal se ferme

---

### 5. Fonctionnalités existantes (non-régression)

#### Mode sombre/clair
- [ ] Cliquer sur icône 🌙/☀️ dans navbar
- [ ] ✅ **Attendu :** Transition douce (300ms) vers light mode
- [ ] Cliquer à nouveau
- [ ] ✅ **Attendu :** Retour dark mode
- [ ] Recharger la page
- [ ] ✅ **Attendu :** Thème sauvegardé persiste

#### Certificat
- [ ] Compléter 9/9 modules
- [ ] Modal certificat apparaît
- [ ] Entrer un nom (ex: "John Doe")
- [ ] Cliquer "Générer"
- [ ] ✅ **Attendu :** 
  - PNG téléchargé : `ViaOps_Certificat_John_Doe.png`
  - Image 1200×800px avec nom personnalisé
  - Toast "Certificat téléchargé avec succès"

#### Progression
- [ ] Compléter 3 modules
- [ ] Observer navbar : Progression "3/9"
- [ ] Observer barre de progression : ~33% remplie
- [ ] Aller dans Modules
- [ ] Observer sidebar footer : Même progression
- [ ] Recharger la page
- [ ] ✅ **Attendu :** Progression sauvegardée (localStorage)

---

## 📱 **Tests responsive**

### Mobile (375px - iPhone SE)
- [ ] Navbar : Logo + 2 nav items + CTA visible
- [ ] Stat "progression" sans label texte
- [ ] Progress bar présente mais courte
- [ ] Scroll to top : 44×44px, positionné 20px du bord
- [ ] Menu progression : Dropdown adapté
- [ ] Toast : Pleine largeur
- [ ] Pipeline : Scroll horizontal fluide

### Tablette (768px - iPad)
- [ ] Sidebar modules : 260px de large
- [ ] Content : Adapté automatiquement
- [ ] Navbar : Tous les éléments visibles
- [ ] Aucun élément coupé ou débordant

### Desktop (1920px)
- [ ] Layout optimal, centré max-width 1100px
- [ ] Aucun élément étiré
- [ ] Espacement cohérent

---

## 🐛 **Vérification console**

Ouvrir DevTools (F12) → Console

### Erreurs à NE PAS voir :
- ❌ `ModuleView.load is not a function`
- ❌ `Router.show('recap') failed`
- ❌ `Cannot read property 'includes' of undefined`
- ❌ `Failed to fetch modules/*.html`

### Messages attendus (OK) :
- ✅ `⌨️ Shortcuts initialized. Press ? for help`
- ✅ `🎨 Theme manager initialized: dark`
- ✅ `⬆️ Scroll to top initialized`
- ✅ `🔍 Module search initialized`
- ✅ `📊 Progress menu initialized`

---

## 🧪 **Tests de compatibilité**

### Navigateurs desktop
- [ ] Chrome/Edge 90+ (Chromium)
- [ ] Firefox 88+
- [ ] Safari 14+

### Navigateurs mobile
- [ ] Safari iOS 14+
- [ ] Chrome Mobile (Android)
- [ ] Samsung Internet

---

## 🔍 **Tests d'accessibilité**

### Contraste (WCAG AA)
- [ ] Vérifier avec DevTools Lighthouse
- [ ] Score Accessibility > 90

### Navigation clavier complète
- [ ] Toute l'interface accessible sans souris
- [ ] Focus visible partout
- [ ] Pas de focus trap

### Screen reader (optionnel)
- [ ] NVDA (Windows) ou VoiceOver (Mac)
- [ ] Tous les boutons ont des labels
- [ ] Structure de headings logique

---

## 📊 **Performance**

### Lighthouse (DevTools)
**Cibles :**
- Performance : >90
- Accessibility : >90
- Best Practices : >90
- SEO : >90

### Métriques
- First Contentful Paint : <1s
- Time to Interactive : <2s
- Cumulative Layout Shift : <0.1

---

## ✅ **Validation finale**

### Checklist globale
- [ ] Aucune erreur console
- [ ] Tous les bugs corrigés fonctionnent
- [ ] Toutes les nouvelles fonctionnalités opérationnelles
- [ ] Raccourcis clavier 100% fonctionnels
- [ ] Responsive OK sur 3 tailles
- [ ] Accessibilité WCAG AA
- [ ] Performance optimale
- [ ] Thème sombre/clair fonctionne
- [ ] Certificat se génère correctement
- [ ] Progression sauvegardée

---

## 🚨 **En cas de problème**

### Problème : Scripts ne chargent pas
**Solution :**
```bash
# Vérifier que tous les fichiers existent
ls assets/js/*.js
ls assets/css/*.css
```

### Problème : Fonctionnalités ne marchent pas
**Solution :**
1. Vider cache navigateur (Ctrl+Shift+Delete)
2. Hard reload (Ctrl+F5)
3. Ouvrir en navigation privée

### Problème : localStorage ne sauvegarde pas
**Solution :**
1. Vérifier que cookies/localStorage autorisés
2. Ouvrir depuis `http://` ou `https://` (pas `file://`)

### Problème : Certificat PNG ne télécharge pas
**Solution :**
1. Vérifier permissions téléchargement navigateur
2. Tester dans Chrome (meilleur support Canvas API)

---

## 📝 **Rapport de test**

Après avoir testé, remplir ce tableau :

| Fonctionnalité | Status | Note |
|---------------|--------|------|
| Bug #1 (Navigation ←/→) | ⬜ OK / ⬜ KO | |
| Bug #2 (Certificat 9/9) | ⬜ OK / ⬜ KO | |
| Scroll to top | ⬜ OK / ⬜ KO | |
| Recherche modules | ⬜ OK / ⬜ KO | |
| Menu progression | ⬜ OK / ⬜ KO | |
| Export JSON | ⬜ OK / ⬜ KO | |
| Partager | ⬜ OK / ⬜ KO | |
| Réinitialiser | ⬜ OK / ⬜ KO | |
| Focus states | ⬜ OK / ⬜ KO | |
| Transitions vues | ⬜ OK / ⬜ KO | |
| Responsive | ⬜ OK / ⬜ KO | |
| Performance | ⬜ OK / ⬜ KO | |

---

## 🎉 **Si tous les tests passent**

**Félicitations !** ViaOps v1.1.0 est prêt pour :
- ✅ Production
- ✅ Déploiement GitHub Pages
- ✅ Démo client
- ✅ Portfolio

**Prochaines étapes :**
1. Commit & Push vers GitHub
2. Activer GitHub Pages
3. Partager l'URL : `https://username.github.io/viaops`

---

**Guide rédigé le :** 9 juin 2026  
**Par :** Kiro AI Assistant  
**Pour :** ViaOps v1.1.0
