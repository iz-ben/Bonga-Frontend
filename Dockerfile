# Use the docker image node:9.4
FROM node:9.4
# Into which the source will be copied inside the destination container.
WORKDIR /app
# It will copy the existing files to the `/app` directory.
COPY . /app
# Run npm install
RUN npm install; exit 0
#install cross-env
RUN npm i -g cross-env
#build dll
RUN npm run build:dll; exit 0
#build production
RUN npm run build; exit 0
# Start the app.
CMD cross-env NODE_ENV=${NODE_ENV} node server
# Expose the port of the app thats running in the container.
EXPOSE 3000
