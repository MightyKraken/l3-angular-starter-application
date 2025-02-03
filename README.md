# Prerequisite installations

1. Nodejs(Optional) : https://nodejs.org/en/download
2. Deno(Optional) : https://deno.com/
3. Bun(Optional): https://bun.sh/
4. Docker (Required): https://www.docker.com/
5. Git (Required): https://git-scm.com/downloads
6. VScode (Optional): https://code.visualstudio.com/

# Starter Guide.

1. clone: git clone https://github.com/MightyKraken/l3-angular-starter-application.git (must have git installed)
2. install: `npm install`
3. run: `npm run start`
4. test: `npm run test`
5. lint: `npm run lint`
6. format: `npm run format`
7. build: `npm run build`
8. docker-image-create: `npm run docker-build` or `docker build -t l3-angular-starter-application -f Dockerfile.prod .`
9. run-docker-container: `npm run docker-run` or `docker run --detach --publish 80:80 --name l3-angular-starter-application l3-angular-starter-application`
10. stop-docker-container: `npm run docker-stop` or `docker stop l3-angular-starter-application`
11. delete-docker-container: `npm run docker-container-remove` or `docker rm -f l3-angular-starter-application`
12. delete-docker-image: `npm run docker-image-remove` or `docker rmi -f l3-angular-starter-application`

# Features With Starter Repo

- Angular with Docker file
- Tailwind support
- Material support
- Prettier ESLint stylelint htmlhint support
- commitlint husky lint-staged support
- Tsconfig configured
- Generic modules and components
- Font setup
- Icons setup
- Theme setup
