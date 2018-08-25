# Use the docker image node:9.4
FROM node:alpine
# Into which the source will be copied inside the destination container.
WORKDIR /app
# It will copy the existing files to the `/app` directory.
COPY . /app
# Run npm install
RUN npm install
# Start the app.
CMD npm run start:prod
# Expose the port of the app thats running in the container.
EXPOSE 3000
