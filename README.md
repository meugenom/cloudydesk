### Web Desktop (Under construction)

#### Hey! 

I want to create an open source prototype of a small web desktop written on javascript (angular) front-end and java on the back-end. It's a gut idea to have functional applications like a terminal app, draw app, text editor, photo viewer, and media player onboard. It would be workable with primitive functionality. See later!
I will be glad and pleased to listen to some critiques about my code or ideas. Helping is welcome.

Best Regards!

**What do we have just now?** 
A little bit, but still:
- web view with background, taskbar, and app icons
- ability to select regions on the web view(let's see in web console)
- capable full-window mode
- modal for explorer

![web desktop screenshot](./assets/screenshot01072022.png)
![web desktop screenshot](./assets/screenshot02072022.png)

All icons uploaded from [www.svgrepo.com](https://www.svgrepo.com) and will be changed later in our versions.

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
 |--desktop
	 |--desktop.component.ts
	 |--desktop.component.spec.ts
	 |--desktop.component.html
	 |--desktop.component.sass
 |--modal
	 |--modal.module.ts
	 |--modal.service.ts
	 |--modal.component.ts
	 |--modal.component.sass
	 |--modal.component.html
 |--taskbar
	 |--taskbar.component.ts
	 |--taskbar.component.spec.ts
	 |--taskbar.component.sass
	 |--taskbar.component.html
 |--fullscreen
	 |--fullscreen.directive.ts
	 |--fullscreen.directive.spec.ts
 |--assets
	 |--css/
	 |--img/
 |--index.html
 |--main.ts
```