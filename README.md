### Web Desktop (Under construction)

#### Hello! 

I want to create an open source prototype of a small web desktop written on javascript (angular) front-end and java on the back-end. It's a gut idea to have functional applications like a terminal app, draw app, text editor, photo viewer, and media player onboard. It would be workable with primitive functionality. See later!
I will be glad and pleased to listen to some critiques about my code or ideas. Helping is welcome.

Best Regards!

### **What do we have just now?** see [**Demo**](https://neetcloud.dev)

A little bit, but still:
- animated web view with space background, taskbar, and app icons
- capable desktop's full-window mode
- modals start from taskbar icons:
	- closing, maximize, minimize, moving window-app / back to small window-app
	- make window-app active with click when we have other opened window-apps
	- resizing window-app by left-bottom icon
- in app terminal ability to input commands, "clear" for example, others in progress
- selection files on the desktop and in Finder and change places between (drag and drop)
- context-menu (only visually)

![web desktop screenshot](./assets/screenshot16092022.png)

All icons uploaded from [www.svgrepo.com](https://www.svgrepo.com) and will be changed later in our versions.
Space Background's Picture downloaded from Unsplash.com (by Gary Scott)

dirs:
```
src
 |--app
	 |--global.ts
	 |--app.module.ts
	 |--app.component.ts
	 |--app.component.html
	 |--app.component.sass
	 |--app-routing.module.ts
	 |--app-component.spec.ts

 |--camera
     |--camera.component.ts
	 |--camera.component.spec.ts
	 |--camera.component.html
	 |--camera.component.sass

 |--context-menu
     |--context-menu.component.ts
	 |--context-menu.component.spec.ts
	 |--context-menu.component.html
	 |--context-menu.service.ts
	 |--context-menu.component.sass

 |--desktop
	 |--desktop.component.ts
	 |--desktop.component.spec.ts
	 |--desktop.component.html
	 |--desktop.component.sass

 |--draw
     |--draw.component.ts
	 |--draw.component.spec.ts
	 |--draw.component.html
	 |--draw.component.sass

 |--editor
     |--editor.component.ts
	 |--editor.component.spec.ts
	 |--editor.component.html
	 |--editor.component.sass
  
 |--file-list
     |--file-list.component.ts
	 |--file-list.component.spec.ts
	 |--file-list.component.html
	 |--file-list.component.sass

 |--finder
     |--finder.component.ts
	 |--finder.component.spec.ts
	 |--finder.component.html
	 |--finder.component.sass

 |--fullscreen
	 |--fullscreen.directive.ts
	 |--fullscreen.directive.spec.ts

 |--mod
	 |--mod.module.ts
	 |--mod.service.ts
	 |--mod.component.ts
	 |--mod.component.sass
	 |--mod.component.html

 |--taskbar
	 |--taskbar.component.ts
	 |--taskbar.component.spec.ts
	 |--taskbar.component.sass
	 |--taskbar.component.html

 |--terminal
     |--terminal.component.ts
	 |--terminal-core.js
	 |--terminal.component.spec.ts
	 |--terminal.component.html
	 |--terminal.component.sass

 |--settings
     |--settings.component.ts
	 |--settings.component.spec.ts
	 |--settings.component.html
	 |--settings.component.sass

 |--assets
	 |--css
	 	 |-- styles.sass
		 |--components/...

	 |--img/
 |--index.html
 |--main.ts
```