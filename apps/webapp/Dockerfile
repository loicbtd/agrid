ARG ENVIRONMENT=staging

FROM node:14.16.0-alpine AS builder
COPY . /src
ARG ENVIRONMENT
WORKDIR /src
RUN npm install && npm install -g @angular/cli
RUN ng build --configuration=$ENVIRONMENT --output-path=/app

FROM nginx:1.19.8-alpine
COPY --from=builder /src/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app /usr/share/nginx/html