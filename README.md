# NEST NODEJS STARTER KIT

## Folder structure

##### rootApp

    - for application settings
    - app.module = collections imports of services, modules, and controller
    - global settings
    - common settings

##### common

    - related for reusable settings
    - utilities
    - constant
    - methods
    - settings

##### modules

    - compose of documents.
    - documents must compose of `module`, `controller`, `services` and `tests`
    - documents must have interfaces, dto, and schemas.
    - module must imported to app.module

##### shared

- a shared module that can be a reusable services, tests and controller.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
