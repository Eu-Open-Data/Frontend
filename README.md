# Frontend IP

This repository contains the client application for the IP project.

## Environments
| Env   |      domain      |
|----------|:-------------:|
| production  |  holidayadvisor.eu |
| staging | dev.holidayadvisor.eu |

## Workflow (branches)

```
                        task1             task2
                        _____             _____
                      /       \         /       \
main        _________/_________\_______/_________\_______  ______ main
                                                          \
release-1   _______________________________________________\_____ release-1
```

- main : every build is incremented with patch + 1 and deployed to staging environment.
- release-1 : every build is incremented with minor + 1 and deployed to production environment. This operation will be done manually and the end of every sprint.

### Commits
- At the moment are 4 commits checks, for build, linting, unit-tests and commit message correctitude.
- Find more about commit messages [Here](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional).

## Pull Requests
Pull Requests should have a proper naming respecting the tempalte
`[CU-123456789] This is a PR`. Pay attention that the CU-123456789 represent the ticket id in clickup, so for the sake of tracking, write a correct id.

## Local Setup

1. Clone the remote repo locally so you can start the development process. 
- `git clone https://github.com/Eu-Open-Data/Frontend.git`

2. Please run `npm install` to install all the necesary dependencies.
3. Please verify that you have node version 18 or greater. Use `node -v`. In the case the version is less than 18, use `nvm use 18` to set the version.
4. To start the local dev server use `npm run dev`
5. Go in any browser to `http://localhost:5173/` to see the application running. Pay attention that hot reloading is available, so any change in the code will be instantly visible in the web browser.

## Project Guidelines

- All under `/src`.
- Exemple of structure:

```
 - main.jsx
 - shared
    - App.jsx
    - App.css
 - pages
    - page-one
        - component-one
          - ComponentOne.jsx
          - ComponentOne.test.js
          - ComponentOne.css
        - component-two
    - page-two
    - page-three
```

### Naming
- folders : kebab-case (folder-one, exemple-two, ...)
- files   : Pascal-case (ComponentOne, ComponentTwo, ...)
