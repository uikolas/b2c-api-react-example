FROM node:8.11.1

## Update global server dependencies repos
#RUN apt-get update

## Install global server dependencies
#RUN apt-get install -y \
#  libcurl3 libcurl4-gnutls-dev curl

## Install global npm dependencies
## ...

# Create app directory
WORKDIR /usr/src/app

# Copy local npm dependencies list
COPY package*.json ./

# Install local npm dependencies
RUN npm i

# Bundle app source
COPY . .

# Transpile app code
RUN npm run dist

# Expose ports without publishing them to the host machine - they’ll only be accessible to linked services.
# Only the internal port can be specified.
# Open ports
EXPOSE 80

# Command to run app in container
CMD [ "npm", "start" ]
