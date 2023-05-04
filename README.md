# NeetCloud App

[![Version](https://img.shields.io/badge/version-0.2.0-yellow.svg)](https://semver.org/spec/v1.0.0.html)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

<p align="center">
  <img src="./neetcloud-logo.svg" data-canonical-src="./neetcloud-logo.svg" width="200" height="200" />
</p>

<p align="center">
  NeetCloud App - A web-based cloud desktop for users (In Progress)
</p>

<p align="center">
  <a href="https://neetcloud.dev" >See Demo</a>
  <br>
  <b>Important: Anonymous User was deleted. Please use tester or create own account:</b>
  <br>
  <b>login:</b> tester
  <br>
  <b>password:</b> tester
</p>

<p align="center">
  <img src="./assets/screenshot06092022.png" data-canonical-src="./assets/screenshot06092022.png"/>
</p>

## About
Neetcloud App is in a progressive state.
NeetCloud is an app for the web. It’s a dynamic site with a database MongoDB on board. The main goal of this website is to make a useful and friendly cloud like a desktop manager, which is a little bit similar to shell OS. So we plan to have our small functional embedded applications like a terminal app, draw app, text editor, photo viewer, media player, etc. It would be workable with simple functionality.
NeetCloud App is Open Source App. You can download the code and make your changes.

## Features (Application in Progress)

- Animated web view with space background, taskbar, and app icons
- Capable desktop's full-window mode
- Modals start from taskbar icons:
  - Closing, maximize, minimize, moving window-app / back to small window-app
  - Make window-app active with click when we have other opened window-apps
  - Resizing window-app by left-bottom icon
- In app terminal ability to input commands, "clear" for example, others in progress
- Selection files on the desktop and in Finder and change places between (drag and drop)
- Context-menu (works uploading file to the server)
- Login's and register's forms and functionality, actions, calls to the server, widget panel
- Getting file list visual and uploading file to the storage by current user
- Download file by double clicking on file icon
- Added Notifications into the project


All icons uploaded from [www.svgrepo.com](https://www.svgrepo.com) and will be changed later in our versions.
Space Background's Picture downloaded from Unsplash.com (Gary Scott).

## Development

### Important for local usage

- Our development uses reverse proxy server. In this file [nginx.conf](./nginx/nginx.conf) you can find example proxy settings. Front-end server starts on port 8081 and backend starts in port 3000. 
-  Other way to proxy, please uncomment string [Backend: NeetCloudApplication.java:70](./server/src/main/java/dev/neetcloud/api/NeetCloudApplication.java#L70) and change port from 8080 to 3000 in [Frontend: environment.ts](./client/src/environments/environment.ts)
- File Store uses by default ```home:/user:/uploads``` directories. Please make dir ```/uploads``` in your /Home:/User: dir and change [application.properties:26](./server/src/main/resources/application.properties#L26).

### Docker meugenom/neetcloud image from Docker Hub

Here is a way to run the project locally:

```bash
	# install docker and download image using command below
	docker pull meugenom/neetcloud:0.2.0
	# see images
	docker images
	# run image with the folowing command
	docker run -d --name neetcloud-container -e POSTGRES_USER=neetcloud -e POSTGRES_PASSWORD=password -p 5432:5432 -p 8080:8080 -p 8081:8081 -v data:/var/lib/postgresql/data neetcloud:0.2.0
	# see started containers
	docker ps
	# after wann container is launched, run the command to connect to the container
	docker exec -it neetcloud-container bin/bash
	# in the opened console start each service one by one with the following commands:
	nginx && start-frontend && start-backend
	# you can see all started processes
	htop
	# and quit from the terminal of container
	exit
```
	- Access the project in web browser at `http://localhost:8080`.
	By default database is empty.
	- Register new user by button bottom-right
	- Log in as new user 
	- Upload file by right click on the screen->see menu->select Uploading File
	- Download file from the screen -> double click on icon of downloaded file


NeetCloud App was created with TypeScript, Angular, Ng Redux, Java, Spring Framework, and Postgres. Please see:

- Code:
  - [client code in progress](./client/)
  - [server code in progress](/server/)

- Info:
  - [client readme](./client/README.md)
  - [server readme](./server/README.md)

I'll be glad and pleased to listen to some critiques about the code or ideas. **Helping is welcome**.

## Contributors

_You could be here!_

## Author

- [meugenom](https://meugenom.com)

## License

This project is open source and available under the [MIT License](./LICENSE).
