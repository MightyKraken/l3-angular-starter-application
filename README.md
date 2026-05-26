# Clone

## Angular 21

`npx degit MightyKraken/l3-angular-starter-application#v21 --cache=false`

## Angular 20

`npx degit MightyKraken/l3-angular-starter-application#v20 --cache=false`

# Angular Code Snippets

A repository to show how common code can be reused

# Todo After cloning

1. Replace l3-angular-starter-application with new application name
2. Replace brand.ico to a new ico file
3. Replace Angular Starter with Application portal title
4.

## Prerequisite installations

1. Nodejs(Required) : <https://nodejs.org/en/download>
2. Deno(Optional) : <https://deno.com/>
3. Bun(Optional): <https://bun.sh/>
4. Docker (Required): <https://www.docker.com/>
5. Git (Required): <https://git-scm.com/downloads>
6. VScode (Optional): <https://code.visualstudio.com/>

## Starter Guide

1. clone: npx degit MightyKraken/l3-angular-starter-application#v21 --cache=false
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
- Source map bundle analyzer support ✔

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
- LoadingUntilDirective -> will show a certain loader in place until condition becomes true. Great for reusability of loader
- RoleBasedDirectiveRender -> Without using if condition and checking roles in multiple places the role checking is in a directive and that is then used across application
- Breakpoint detector service -> A service that has multiple properties that becomes true or false based on screensize. useful for different screen size logics
- ConfirmationModalDirective -> A reusable directive on buttons so that a confirmation dialog will popup before executing the buttons actual work
- virtual Scroll Container -> A reusable component or directive that will render certain content in performance mode with virtual scroll or infinite scroll

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
- Vitest/Karma
- Angular Material

## TODO

1. Make css mixins for reuse
2. Learn about extract-i18n
3. Make resuable animation and make a feature component that will have examples of all these animations
4. Understand how colors are done in app and make a component explaing it
5. Make a component that renders code with tabs init
6. Make a nested Sidebar menu dropdown
7. ShareReplay -> https://dev.to/softheartengineer/how-does-sharereplay-works-in-rxjsangular-1moo
8. Make an interface or service to get environment values it will be easier and type safe
9. Make a footer and add dynamic layout for that
10. Figure out a way to use routes for navigation items. Also a way to add values to it so that we can manually configure which route to show and hide
11. ANgular profiler idea continue on it
