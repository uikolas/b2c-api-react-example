Boilerplate
===========

## React boilerplate with devserver, typescript, redux, scss, css modules and unit tests.

## Requirements

- [Node](https://nodejs.org) 8.9.3 or newer

- (optional) [PM2](https://www.npmjs.com/package/pm2) 2.9.1 or newer (for web server)

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
To run dev server with hot replacement
```sh
npm run serve
```
To build assets for development and running locally run
```sh
npm run dist:dev
```
To build assets for development and running via docker run first
```sh
npm run dist:docker
```
And then to build docker container run
```sh
docker-compose build
```
To build assets for production run
```sh
npm run dist:prod
```
To build server script for production run
```sh
npm run build:server:prod
```

## Usage
Configure your webserver to serve static build/web directory, edit *.env files to set correct API and run API server

## Web server
Before running webserver you have to build it for correct environment (see "Building" section).

To start webserver run
```sh
npm run start
```
To restart webserver run
```sh
npm run restart
```
To stop webserver run
```sh
npm run stop
```
To start docker container run
```sh
docker-compose up
```
If you are working on Windows - do not forget to forward port 80 from docker machine to your host


## Unit tests
Before running webserver you have to build it for correct environment (see "Building" section).

To run unit tests run
```sh
npm run unit
```
To run unit tests with coverage report run
```sh
npm run coverage
```
To run all tests (now only unit) run
```sh
npm run test
```


## License

The project is under proprietary license, please see the LICENSE file provided with the repository.
