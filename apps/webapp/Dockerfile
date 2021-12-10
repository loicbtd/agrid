FROM node:16.13.1-alpine AS builder
COPY . /app
WORKDIR /app
RUN npm install && npm run postinstall
RUN npx nx build webapp --configuration=production

FROM nginx:1.19.8-alpine
COPY --from=builder /app/dist/apps/webservice /app
