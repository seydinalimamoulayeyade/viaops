# ViaOps v1.1.0 — Quick Start Guide 🚀

**5 minutes pour tester toutes les nouveautés !**

---

## ⚡ Lancement ultra-rapide

### Windows
```bash
# Double-cliquer sur index.html
# OU
start index.html
```

### Mac/Linux
```bash
open index.html
# OU
python3 -m http.server 8000
# Puis ouvrir http://localhost:8000
```

---

## 🎯 Checklist des nouveautés (2 min)

### ✅ Test 1 : Raccourcis clavier (Bug corrigé)
1. Appuyer sur **M** → Ouvre Modules
2. Appuyer sur **→** plusieurs fois → Navigation modules
3. **✓ Si ça marche sans erreur, bug corrigé !**

### ✅ Test 2 : Scroll to Top (Nouvelle feature)
1. Scroller vers le bas
2. Observer le bouton violet **↑** en bas à droite
3. Cliquer dessus
4. **✓ Remonte en douceur !**

### ✅ Test 3 : Recherche modules (Nouvelle feature)
1. Aller dans **Modules**
2. Taper "docker" dans l'input de recherche
3. **✓ Seul Docker s'affiche !**

### ✅ Test 4 : Menu progression (Nouvelle feature)
1. Cliquer sur **⋮** dans la navbar
2. Observer le menu avec 4 options
3. Cliquer "Exporter JSON"
4. **✓ Fichier téléchargé !**

---

## 🔥 Démo complète (3 min)

### Étape 1 : Accueil
```
✓ Observer la navbar : Toggle thème + Menu ⋮ + Raccourcis ?
✓ Pipeline avec 9 modules
✓ Statistiques (9 outils, ~90 min)
```

### Étape 2 : Modules
```
✓ Rechercher "ci" → Affiche Jenkins + SonarQube
✓ Cliquer sur Docker → Module s'ouvre
✓ Utiliser ← et → pour naviguer
✓ Marquer comme vu (bouton en bas)
```

### Étape 3 : Progression
```
✓ Observer navbar : Progression mise à jour
✓ Cliquer ⋮ → Menu progression
✓ Exporter JSON → Télécharge fichier
✓ Partager → Copie texte
```

### Étape 4 : Certificat
```
✓ Compléter les 9 modules
✓ Modal certificat apparaît
✓ Entrer un nom → Génère PNG
✓ Certificat téléchargé !
```

---

## ⌨️ Raccourcis clavier

| Touche | Action |
|--------|--------|
| **H** | Accueil |
| **M** | Modules |
| **A** | À propos |
| **ESC** | Retour accueil |
| **←** | Module précédent |
| **→** | Module suivant |
| **?** | Aide (affiche tous les raccourcis) |

**Astuce :** Appuyer sur **?** pour afficher le modal d'aide complet

---

## 🎨 Thème sombre/clair

1. Cliquer sur **🌙** (ou **☀️**) dans la navbar
2. Transition douce (300ms)
3. Préférence sauvegardée automatiquement

---

## 📊 Menu progression (⋮)

### Actions disponibles
1. **💾 Exporter JSON** → Télécharge `viaops-progress-YYYY-MM-DD.json`
2. **📤 Partager** → Copie texte ou Web Share API
3. **🔄 Réinitialiser** → Efface progression (confirmation)

### Format JSON exporté
```json
{
  "version": "1.0",
  "timestamp": "2026-06-09T...",
  "totalModules": 9,
  "completedModules": 3,
  "percentComplete": 33,
  "modules": [...]
}
```

---

## 🔍 Recherche modules

### Dans la sidebar (vue Modules)
```
Taper "docker"   → Affiche Docker
Taper "ci"       → Affiche Jenkins + SonarQube
Taper "monitor"  → Affiche Prometheus
ESC              → Affiche tout
```

**Recherche sur :** Label, Tag, Stage

---

## 🏆 Certificat de complétion

### Comment l'obtenir
1. Compléter **9/9 modules** (cliquer "Marquer comme vu" sur chacun)
2. Modal apparaît automatiquement
3. Entrer votre nom
4. Cliquer "Générer"
5. PNG téléchargé (1200×800px)

### Utilisation
- Portfolio professionnel
- LinkedIn
- Preuve de complétion
- Partage sur réseaux sociaux

---

## 📱 Responsive

### Mobile (375px)
✓ Navbar adaptée  
✓ Pipeline scrollable  
✓ Modules lisibles  
✓ Scroll to top visible  

### Tablette (768px)
✓ Sidebar 260px  
✓ Content flexible  
✓ Tout fonctionnel  

### Desktop (1920px)
✓ Layout optimal  
✓ Max-width 1100px  
✓ Espacé et aéré  

---

## 🐛 Dépannage rapide

### Problème : Scripts ne chargent pas
**Solution :**
```bash
# Hard reload
Ctrl+F5 (Windows) ou Cmd+Shift+R (Mac)

# Ou navigation privée
Ctrl+Shift+N (Chrome) ou Ctrl+Shift+P (Firefox)
```

### Problème : Recherche ne fonctionne pas
**Solution :**
- Vérifier que vous êtes dans la vue **Modules** (pas Accueil)
- L'input doit être visible en haut de la sidebar

### Problème : Scroll to top invisible
**Solution :**
- Scroller vers le bas (>400px)
- Le bouton apparaît progressivement

### Problème : Export JSON ne télécharge pas
**Solution :**
- Vérifier permissions de téléchargement du navigateur
- Tester dans Chrome (meilleur support)

---

## 📚 Documentation complète

Pour aller plus loin :

- **[CHANGELOG.md](CHANGELOG.md)** — Tous les détails techniques
- **[GUIDE_TEST.md](GUIDE_TEST.md)** — Tests complets
- **[RESUME_AMELIORATIONS.md](RESUME_AMELIORATIONS.md)** — Vue d'ensemble
- **[TRAVAUX_REALISES.md](TRAVAUX_REALISES.md)** — Rapport détaillé

---

## ✨ Nouveautés v1.1.0

### Bugs corrigés
✅ Navigation clavier ←/→ fonctionne  
✅ Certificat s'affiche à 9/9 modules  

### Nouvelles fonctionnalités
✅ Scroll to top button  
✅ Recherche modules temps réel  
✅ Menu progression (export, partage)  
✅ Export JSON  

### Améliorations design
✅ Focus states accessibles (WCAG 2.1 AA)  
✅ Transitions fluides entre vues  
✅ États de chargement optimisés  

---

## 🚀 Prêt pour production

### Checklist
- [x] Tous les bugs corrigés
- [x] Nouvelles fonctionnalités opérationnelles
- [x] Accessibilité WCAG 2.1 AA
- [x] Performance optimale
- [x] Documentation complète

### Déploiement
```bash
# GitHub Pages
git add .
git commit -m "feat: ViaOps v1.1.0"
git push origin main

# Docker
docker build -t viaops:1.1.0 .
docker run -p 8080:80 viaops:1.1.0
```

---

## 🎉 Profitez de ViaOps !

**ViaOps v1.1.0** est maintenant :
- ✅ Plus stable (bugs corrigés)
- ✅ Plus fonctionnel (4 nouvelles features)
- ✅ Plus accessible (WCAG 2.1 AA)
- ✅ Mieux documenté (5 docs)

**Bon apprentissage DevOps ! 🚀**

---

**Guide rapide rédigé le :** 9 juin 2026  
**Version :** ViaOps v1.1.0  
**Temps de lecture :** 5 minutes
