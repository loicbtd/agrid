FROM node:16.13.1-alpine AS builder
COPY . /solution
WORKDIR /solution
RUN npm install && npm run postinstall
RUN npm run nx build -- webapp --configuration=production

FROM nginx:1.20-alpine
COPY --from=builder /solution/dist/apps/webapp /usr/share/nginx/html
EXPOSE 80
