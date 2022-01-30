FROM node:16.13.1-alpine AS builder
COPY . /app
WORKDIR /app
RUN npm install && npm run postinstall
RUN npx nx build webapp --configuration=development

FROM nginx:1.20-alpine
COPY --from=builder /app/dist/apps/webapp /usr/share/nginx/html
