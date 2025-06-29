# ToDoApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.11.

Simple To-Do app in Angular to add tasks to the list. No database integration, only local storage.

## Getting Started

### Clone the Repository

To get started with this project, clone it from GitHub:

```bash
git clone https://github.com/dipoz/to-do-app.git
cd to-do-app
```
Install Dependencies
This project uses npm for dependency management. Install all required packages with:

```bash
npm install
```
This will install Angular v20+ and all other dependencies defined in package.json, including the signal-based reactive libraries and standalone components.

For developers who prefer to use a specific npm version or manage multiple projects, consider using nvm (Node Version Manager):

```bash
# Use the version specified in .nvmrc (if present)
nvm use
# Or specify a version explicitly
nvm use 20.11.1
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Docker Development Environment

For a consistent development experience with all dependencies properly containerized, use Docker Compose:

```bash
# Start the containerized development environment
docker compose up

# Run in detached mode (background)
docker compose up -d
```
This launches the application with full hot module reload support optimized for Angular's signal-based reactivity system. Access the application at http://localhost:4200/.

Benefits of Docker Development
Consistent environment across team members
No need to install Node.js or Angular CLI locally
Properly configured volume mounts for optimal change detection
Preserves signal propagation performance across container boundaries

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests (not implemented in this To-Do app)

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests (not implemented in this To-Do app)

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
