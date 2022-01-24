FROM node:16.13.1-alpine AS builder
COPY ./ /app
WORKDIR /app
RUN npm install && npm run postinstall
RUN npx nx build webservice --configuration=production

FROM node:16.13.1-alpine
COPY --from=builder /app/dist/apps/webservice /app
WORKDIR /app
EXPOSE 80
CMD node main.js
