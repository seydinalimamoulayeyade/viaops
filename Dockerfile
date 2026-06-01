# ============================================================
# ViaOps — Dockerfile
# Multi-stage build : builder + nginx production
# ============================================================

# ── STAGE 1 : builder ────────────────────────────────────────
# Pas de build step nécessaire (vanilla HTML/CSS/JS)
# On utilise alpine pour valider les fichiers avant copie
FROM alpine:3.19 AS builder

WORKDIR /app

# Copier tous les assets statiques
COPY index.html       ./
COPY assets/          ./assets/
COPY modules/         ./modules/

# Vérification basique — le fichier principal existe
RUN test -f index.html && echo "✓ index.html présent"

# ── STAGE 2 : production ─────────────────────────────────────
FROM nginx:1.25-alpine AS production

# Metadata
LABEL maintainer="Virtual Voyager <linkedin.com/in/limamou-laye>"
LABEL project="ViaOps"
LABEL version="1.0.0"

# Supprimer le site par défaut nginx
RUN rm -rf /usr/share/nginx/html/*

# Copier les fichiers buildés
COPY --from=builder /app /usr/share/nginx/html

# Config nginx optimisée pour SPA statique
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Port exposé
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:80 || exit 1

# Démarrage nginx en foreground
CMD ["nginx", "-g", "daemon off;"]
