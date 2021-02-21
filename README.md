# Knowledge and Snippet Database 

The frontend application for the knownledge and snippet database.

## Deployment

Build the solution, and upload it to a S3 bucket with website hosting enabled. You may want to substitute the pool-id and region in the configuration file yourself, as this was not possible with a limited AWS educate account.

**ToDo:**

* IaC for website hosting, bucket creating, and proper staging.
* A third repository for IaC: Shared cognito stack between frontend and backend (not possible with AWS Educate)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

