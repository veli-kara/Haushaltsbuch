FROM nginx:alpine

RUN apk update && apk add git

RUN git clone https://github.com/veli-kara/Haushaltsbuch.git /tmp/repo

RUN cp /tmp/repo/index.html /usr/share/nginx/html
RUN cp /tmp/repo/script.js /usr/share/nginx/html
RUN cp /tmp/repo/styles.css /usr/share/nginx/html

RUN chmod -R 755 /usr/share/nginx/html


CMD ["nginx", "-g", "daemon off;"]
