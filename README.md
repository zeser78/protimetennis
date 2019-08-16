# ProTimeTennis

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.0.

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

Steps for deploy

1. copy keys to environment.prod
2. ng build --prod => create dist folder with inside folder of the project
3. Install firebase CLI
4. Install => npm install -g firebase-tools
5. Choose Hosting and then the project
6. Choose the public directory "dist/"name of the project"
7. single-page app = yes
8. no overwrite = no
9. command = firebase deploy

git init
git checkout -b <new branch> // to create new branch
git -d <branch> //to delete
git merge <branch> // you have to be on master
