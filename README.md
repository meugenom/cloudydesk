# NeetCloud App

[![Version](https://img.shields.io/badge/version-0.2.3-yellow.svg)](https://semver.org/spec/v1.0.0.html)
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
  <b>Important: Anonymous User was deleted. Please create own account:</b>
</p>

<p align="center">
  <img src="./assets/screenshot06092022.png" data-canonical-src="./assets/screenshot06092022.png"/>
</p>

## About
Neetcloud App is in a progressive state.
NeetCloud is an app for the web. It’s a dynamic site with a database Postgres on board. The main goal of this website is to make a useful and friendly cloud like a desktop manager, which is a little bit similar to shell OS. So we plan to have our small functional embedded applications like a terminal app, draw app, text editor, photo viewer, media player, etc. It would be workable with simple functionality.
NeetCloud App is Open Source App. You can download the code and make your changes.

## Features (Application in Progress)

- Animated web view with a space-themed background, taskbar, and app icons.
- An animated progress bar that displays the progress of space settings and messages.
- Capable desktop's full-window mode, allowing you to maximize the desktop view to occupy the entire screen.
- Modals that are triggered from taskbar icons, providing options to close, maximize, minimize, move, and resize windowed applications. You can also switch between active window-apps with a click, even when other window-apps are open. Resizing can be done using the left-bottom icon.
- The app terminal allows you to input commands such as "help," "ls," "whoami," and "uname." Other commands are also in progress.
- The app finder displays a list of files organized by directories.
- The app editor provides a simple text editor interface without saving options.
- The app camera allows you to connect your webcam and view yourself.
- Context-menu functionality, including uploading files to the server.
- Login and register forms and functionality, including server calls and a widget panel with User Info.
- Visual display of file lists and the ability to upload files to storage by the current user.
- Download files by double-clicking on file icons.
- Notifications have been added to the project.
- A loading spinner is activated to indicate when processes are in progress.

## Development

### Important for local usage

- Our development uses reverse proxy server. In this file [nginx.conf](./nginx/nginx.conf) you can find example proxy settings. Front-end server starts on port 8081 and backend starts in port 3000.
- File Store uses by default ```home:/user:/uploads``` directories. Please make dir ```/uploads``` in your /Home:/User: dir and change [application.properties:40](./server/src/main/resources/application.yml#L26).

### Docker meugenom/neetcloud image from Docker Hub

Here is a way to run the project locally:

```bash
	# install docker and download image using command below
	docker pull meugenom/neetcloud:0.2.3
	# see images
	docker images
	# run image with the folowing command
	docker run -d --name neetcloud-container -e POSTGRES_USER=neetcloud -e POSTGRES_PASSWORD=password -p 5432:5432 -p 8080:8080 -p 8081:8081 -v data:/var/lib/postgresql/data neetcloud:0.2.3
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

How to remove docker build cache
```bash
	docker builder prune
```

NeetCloud App was created with TypeScript, Angular, Ng Redux, Java, Spring Framework, and Postgres. Please see:

- Code:
  - [client code in progress](./client/)
  - [server code in progress](/server/)

- Info:
  - [client readme](./client/README.md)
  - [server readme](./server/README.md)

I'll be glad and pleased to listen to some critiques about the code or ideas. **Helping is welcome**.

### Used Resources

- All icons uploaded from [www.svgrepo.com](https://www.svgrepo.com) and will be changed later in our versions.
- Space Background's Picture downloaded from Unsplash.com (Gary Scott).


## Contributors

_You could be here!_

## Author

- [meugenom](https://meugenom.com)

## License

This project is open source and available under the [MIT License](./LICENSE).
