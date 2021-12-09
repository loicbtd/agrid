FROM node:16.13.1-alpine
COPY . /app
WORKDIR /app
RUN npm install && npm
EXPOSE 80
RUN ["chmod", "+x", "/app/entrypoint/start.sh"]
CMD /app/entrypoint/start.sh $ENVIRONMENT