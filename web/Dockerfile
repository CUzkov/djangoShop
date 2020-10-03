FROM node
WORKDIR /usr/src/web
COPY . .
RUN npm install
RUN npm run build

FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=0 /usr/src/web /usr/web/static
RUN chown -R nginx:nginx /usr/web/static
RUN chmod -R 755 /usr/web/static


WORKDIR /etc/nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
