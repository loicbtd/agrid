FROM node:16.13.1-alpine
COPY . /app
WORKDIR /app
RUN npm install && npm run postinstall
RUN npx nx build webservice --configuration=development
WORKDIR /app/dist/apps/webservice
EXPOSE 3333
CMD node main.js
