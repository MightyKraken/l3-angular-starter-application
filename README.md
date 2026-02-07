# Angular Code Snippets

A repository to show how common code can be reused

## Prerequisite installations

1. Nodejs(Optional) : <https://nodejs.org/en/download>
2. Deno(Optional) : <https://deno.com/>
3. Bun(Optional): <https://bun.sh/>
4. Docker (Required): <https://www.docker.com/>
5. Git (Required): <https://git-scm.com/downloads>
6. VScode (Optional): <https://code.visualstudio.com/>

## Starter Guide

1. clone: git clone <https://github.com/MightyKraken/l3-angular-starter-application.git> (must have git installed)
2. install: `npm install`
3. run: `npm run start`
4. test: `npm run test`
5. lint: `npm run lint`
6. lint:fix: `npm run lint:fix`
7. format: `npm run prettier`
8. build: `npm run build`
9. docker-image-create: `npm run docker-build` or `docker build -t l3-angular-starter-application -f Dockerfile.prod .`
10. run-docker-container: `npm run docker-run` or `docker run --detach --publish 80:80 --name l3-angular-starter-application l3-angular-starter-application`
11. stop-docker-container: `npm run docker-stop` or `docker stop l3-angular-starter-application`
12. delete-docker-container: `npm run docker-container-remove` or `docker rm -f l3-angular-starter-application`
13. delete-docker-image: `npm run docker-image-remove` or `docker rmi -f l3-angular-starter-application`

## Features With Starter Repo

- Angular with Docker file ✔
- Prettier eslint setup ✔
- Tailwind support ✔
- stylelint htmlhint support ✔
- commitlint husky lint-staged support ✔
- Tsconfig configured ✔
- Material Support
- Generic modules and components
- Font setup ✔
- Material symbols for Icons setup ✔
- Theme setup
- environment setup ✔
- Storybook support
- Logo Support ✔
- Color support

## Common Features For Frontend

- Toast Component
- Toolbar
- Left Side Menu Big screen small screen
- Right Panel side bar dynamic component support
- Notification Support
- Making Rest api calls
- Making server sent event calls
- Making web socket calls
- Making view transition animations
- Making route guards
- File uploader
- Form component -> text, number, autocomplete, multiselect, dropdown, Textarea, Radio, MultiOption select
- Tutorial guiding on a webpage implementation
- Not found page design
- Home page design
- Breadcrumbs design
-

## Important Branches

- angular19 -> angular 19 version compatible
- v19/ui-kit -> angular 19 ui kit in development
- angular21 -> angular 20 version compatible

## Customization

- To change logo change the brand.ico file in public folder
- To change font apply the fonts in styles/fonts.scss. Currently gantari is used
- You can use material
-

## Technologies or Libraries used

- Angular
- Typescript
- Docker
- Htmlhint
- Prettier
- Commitlint
- Stylelint
- Eslint
- Huksy
- Jest
- Tailwind
- Angular Material

## Code Examples

1. Screen Resize event handling -> break-point-detector.service.ts
2.
