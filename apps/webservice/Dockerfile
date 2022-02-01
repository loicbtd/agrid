FROM node:16.13.1-alpine
COPY . /solution
WORKDIR /solution
RUN npm install && npm run postinstall
RUN npm run nx build -- webservice --configuration=production

WORKDIR /solution/dist/apps/webservice
EXPOSE 80
CMD node main.js
