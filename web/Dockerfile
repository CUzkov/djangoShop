FROM node
WORKDIR /usr/src/web
COPY . .
RUN npm install
RUN npm run build

FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=0 /usr/src/web /usr/app/static
WORKDIR /etc/nginx
RUN chmod -R 755 /usr/app/static

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
