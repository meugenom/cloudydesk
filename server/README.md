## Web-based desktop client (backend code)

see **[Demo - https://neetcloud.dev](https://neetcloud.dev)**

This project was generated with:

- [Spring Boot](https://spring.io) version 3.0.6
- [PostgreSQL DB](https://www.postgresql.org)
- JWT API (jjwt-api) version 0.9.1
- [Lombok](https://projectlombok.org)

!Important: 
- Our development uses reverse proxy server. In this file [nginx.conf](./nginx/nginx.conf) you can find example proxy settings. Front-end server starts on port 8081 and backend starts in port 3000. 
- File Store uses by default ```home:/user:/uploads``` directories. Please make dir ```/uploads``` in your /Home:/User: directory.

### **Features**
- **Endpoints**:
	- **/api/v1/auth/authenticate**[POST] return valid JWT-token
	- **/api/v1/auth/register**[POST] create a new user and return user and valid JWT-token
	- **/api/v1/auth/logout**[POST] return JWT-token with null body
	-
    - **api/v1/users/user**[GET] check JWT-token and return user credential
    - **api/v1/users/list**[GET] get users list only when user has ROLE_ADMIN
	- 
    - **api/v1/files/ls**[GET] files and directories list for current user
    - **api/v1/files/file**[GET] get file info by id
    - **api/v1/files/file**[POST] create new file info without file content
    - **api/v1/files/file**[PUT] update file info without file content
    - **api/v1/files/file**[DELETE] delete file info by id
    - **api/v1/files/file/{fileId}** delete file by id
	- **api/v1/files/uploadFile:**[POST] uploading file to the storage and get file info
	- **api/v1/files/downloadFile/{fileId}**[GET] downloading file from the storage (by web desktop - double click on icon of file)
	... other in progress

### Development server

Run `mvn spring-boot:run` for a dev server from console.
Or please start batch files: `./start-dev-server.sh`
Server starts on port 3000. The application will automatically reload if you change any of the source files.

### Postgres
Install and run `Docker`
```bash
	# open shell and pull docker image 
	docker pull postgres
	# see this images in the list
	docker images
	# start new docker container
	docker run -d --name postgres-container -e POSTGRES_USER=neetcloud -e POSTGRES_PASSWORD=password -p 5432:5432 -v data:/var/lib/postgresql/data postgres
	# see started containers, in your case is postgres-container
	docker ps
```

### Build

Run `mvn clean package` to build the project. The build artifacts will be stored in the `target/` directory.


### Tests

- JUnit Tests in progress;
