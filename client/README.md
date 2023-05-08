## Web-based desktop client (frontend code)

see **[Demo](https://neetcloud.dev)**

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.6. 
Used [SASS](https://sass-lang.com) and [Typescript](https://www.typescriptlang.org).
Used node version 16.14.2, npm version 8.9.0

External Libraries:
1. [ng2-dragula](https://www.npmjs.com/package/ng2-dragula) version 2.1.1
2. [@viselect/vanilla](https://www.npmjs.com/package/@viselect/vanilla) version 3.0.0
3. [express](https://www.npmjs.com/package/express) version 4.18.1
4. [screenfull](https://www.npmjs.com/package/screenfull) version 6.0.2
5. [ngrx](https://ngrx.io) version 14.2.0

### Development server

!Important:
- Our development uses reverse proxy server. In this file [nginx.conf](../nginx/nginx.conf) you can find example proxy settings. Front-end server starts on port 8081 and backend starts in port 3000. 
- [Frontend: environment.ts](./src/environments/environment.ts)

### How to start

Run `npm install` and to start dev server `npm run dev`

### Build

Run `npm run build` to build the project. The build artifacts will be stored in the `build/` directory.

### Run generated build

Run `node front-server.js` to start local . Navigate to `http://localhost:8081/`.

Directories: is not actual, need new checking a little bit later
```
src
 |--app
 |	 |--global.ts 
 |	 |--app.module.ts
 |	 |--app.component.ts
 |	 |--app.component.html
 |	 |--app.component.sass
 |	 |--app-routing.module.ts
 |	 |--app-component.spec.ts
 |
 |--camera
 |   |--camera.component.ts
 |	 |--camera.component.spec.ts
 |	 |--camera.component.html
 |	 |--camera.component.sass
 |
 |--context-menu
 |   |--context-menu.component.ts
 |	 |--context-menu.component.spec.ts
 |	 |--context-menu.component.html
 |	 |--context-menu.service.ts
 |	 |--context-menu.component.sass
 |
 |--desktop
 |	 |--desktop.component.ts
 |	 |--desktop.component.spec.ts
 |	 |--desktop.component.html
 |	 |--desktop.component.sass
 |
 |--draw
 |   |--draw.component.ts
 |	 |--draw.component.spec.ts
 |	 |--draw.component.html
 |	 |--draw.component.sass
 |
 |--editor
 |   |--editor.component.ts
 |	 |--editor.component.spec.ts
 |	 |--editor.component.html
 |	 |--editor.component.sass
 |
 |--file-list
 |   |--file-list.component.ts
 |	 |--file-list.component.spec.ts
 |	 |--file-list.component.html
 |	 |--file-list.component.sass
 |
 |--finder
 |   |--finder.component.ts
 |	 |--finder.component.spec.ts
 |	 |--finder.component.html
 |	 |--finder.component.sass
 |
 |--fullscreen
 |	 |--fullscreen.directive.ts
 |	 |--fullscreen.directive.spec.ts
 |
 |--mod
 |	 |--mod.module.ts
 |	 |--mod.service.ts
 |	 |--mod.component.ts
 |	 |--mod.component.sass
 |	 |--mod.component.html
 |
 |--store
 |	 |--actions
 |	 |    |--navigator.action.ts
 |	 |
 |	 |--models
 |	 |	  |--navigator-state.model.ts
 |	 |	  |--navigator.model.ts
 |   |
 |	 |--reducers
 |		  |--navigator.reducer.ts
 |
 |--taskbar
 |	 |--taskbar.component.ts
 |	 |--taskbar.component.spec.ts
 |	 |--taskbar.component.sass
 |	 |--taskbar.component.html
 |
 |--terminal
 |   |--terminal.component.ts
 |	 |--terminal-core.js
 |	 |--terminal.component.spec.ts
 |	 |--terminal.component.html
 |	 |--terminal.component.sass
 |
 |--settings
 |   |--settings.component.ts
 |	 |--settings.component.spec.ts
 |	 |--settings.component.html
 |	 |--settings.component.sass
 |
 |--assets
 |	 |--css
 |	 | 	 |-- styles.sass
 |	 |	 |--components/...
 |   |
 |	 |--img/
 |
 |--index.html
 |--main.ts
```