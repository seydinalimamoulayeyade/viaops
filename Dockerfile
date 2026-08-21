# ============================================================
# ViaOps — image statique nginx non-root
# ============================================================

FROM nginxinc/nginx-unprivileged:1.29-alpine

LABEL maintainer="Virtual Voyager <linkedin.com/in/limamou-laye>"
LABEL project="ViaOps"
LABEL version="1.6.2"

COPY --chown=nginx:nginx index.html /usr/share/nginx/html/
COPY --chown=nginx:nginx assets/ /usr/share/nginx/html/assets/
COPY --chown=nginx:nginx modules/ /usr/share/nginx/html/modules/
COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:8080/ > /dev/null || exit 1

CMD ["nginx", "-g", "daemon off;"]
