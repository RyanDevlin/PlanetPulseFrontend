FROM node:17.3 AS runtime
WORKDIR /opt/apifrontend
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install
COPY . .
EXPOSE 5000/tcp
CMD [ "node", "app.js" ]