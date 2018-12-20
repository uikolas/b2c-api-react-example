This application is released for the sole purpose of illustrating API usage. It is part of the documentation and should not under any circumstances be used as a starting point for any project. Excluded from MIT-License are all "product images, product data, other images, and fonts”. These are for display purposes only and are subject to their own rights of use, which must be purchased independently.

Spryker API Demo Shop
===========

## Spryker API Demo Shop (React single page application) with devserver, typescript, redux for Spryker Glue API.

## Requirements

- [Node](https://nodejs.org) 8.9.3 or newer

- (TODO: replace) ~~(optional) [PM2](https://www.npmjs.com/package/pm2) 2.9.1 or newer (for web server)~~

- (optional) [Docker](https://www.docker.com/) 18.03.0-ce or newer (for containers)

- (optional) [docker-compose](https://github.com/docker/compose) 1.20.1 or newer (for containers)

## Installation
Once installed nodejs, cloned git repository and switched to the project directory
```sh
npm i
```
Or if you have installed yarn (npm i yarn -g)
```sh
yarn
```

## Building
To run dev server with hot replacement inside virtual machine (vagrant)
```sh
npm run serve:vm
```
To run dev server with hot replacement on local machine
```sh
npm run serve:local
```
To build assets for development and running locally run
```sh
npm run dist:dev
```
To build assets for development and running via docker run
```sh
npm run start:docker
```
To build assets for production run
```sh
npm run dist:prod
```
To build node server script for production run
```sh
npm run start
```
To build daemon node server for production run
```sh
npm run pm2:start
```

## Usage
Configure your webserver to serve static build/web directory, edit *.env files to set correct functionality.

## Web server
Before running webserver you have to build it for correct environment (see "Building" section).

To restart webserver run
```sh
npm run pm2:restart
```
To stop webserver run
```sh
npm run pm2:stop
```
To start docker container run
```sh
docker-compose up
```
If you are working on Windows - do not forget to forward port 80 from docker machine to your host
