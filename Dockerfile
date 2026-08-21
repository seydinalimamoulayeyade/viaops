# ============================================================
# ViaOps — image statique nginx non-root
# ============================================================

FROM nginxinc/nginx-unprivileged:1.29-alpine

LABEL maintainer="Virtual Voyager <linkedin.com/in/limamou-laye>"
LABEL project="ViaOps"
LABEL version="1.6.2"

# Installer les correctifs de sécurité publiés après la construction de l'image de base.
USER root
RUN apk upgrade --no-cache
USER 101

COPY index.html design-system.html /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/
COPY modules/ /usr/share/nginx/html/modules/
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:8080/ > /dev/null || exit 1

CMD ["nginx", "-g", "daemon off;"]
