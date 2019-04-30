# NEST AUTHENTICATION STARTER KIT

- before im starting an API or a services one of my best practice is to create a `UML (Unified Modeling language)`
- after UML flow chat
- (will create a more documentation about this)

##### Please check the UML version 1.1:
![image](https://i.ibb.co/61DryXz/UML-accounts-v1-1.png)

##### Please check the flowchart  1.1:
![image](https://i.ibb.co/GcMLq9Z/flowchart-accounts-v1.png)

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

##### configurations

- this folder is added from `gitignore`
- environment configurations, secrets and etc. `example: mongoodb connection`

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
