
FROM node:14-alpine as base
RUN apk add \
            curl \
            nano \
            unzip \
            mc \
            vim \
            findutils-locate 
 
ENV NODE_ENV=development
WORKDIR /var/www/html
# temp out CMD npm start
EXPOSE 4000