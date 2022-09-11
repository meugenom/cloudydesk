## Web-based desktop client (backend code)

see **[Demo - https://neetcloud.dev](https://neetcloud.dev)**

This project was generated with:

- [Spring Boot](https://spring.io) version 2.6.2
- [Spring MongoDB Starter](https://spring.io/guides/gs/accessing-data-mongodb/) version 2.6.2
- JWT API (jjwt-api) version 0.11.2
- [Lombok](https://projectlombok.org)

!Important: 
- Our development uses reverse proxy server. In this file [nginx.conf](./nginx/nginx.conf) you can find example proxy settings. Front-end server starts on port 8081 and backend starts in port 3000. 
-  Other way to proxy, please uncomment string [Backend: NeetCloudApplication.java:70](./src/main/java/dev/neetcloud/api/NeetCloudApplication.java#L70) and change port from 8080 to 3000 in [Frontend: environment.ts](../client/src/environments/environment.ts)
- File Store uses by default ```home:/user:/uploads``` directories. Please make dir ```/uploads``` in your /Home:/User: dir and change [application.properties:26](../server/src/main/resources/application.properties#L26).
- Need preinstalled MongoDb [mongodb-community version](https://www.mongodb.com/try/download/community), all settings are default.

### **Features**
- **API**:
	- **Login** get a new JWT-token
	- **Registration** create a new user and return a new JWT-token
	- **Get File List** get file list for current user
	- **Uploading File** uploading file to the storage and get new file list
	... other in progress

### Development server

Run `mvn spring-boot:run` for a dev server from console.
Or please start batch files: `./start-dev-server.sh`
Server starts on port 3000. The application will automatically reload if you change any of the source files.

### Build

Run `mvn clean package` to build the project. The build artifacts will be stored in the `target/` directory.


### Tests

- JUnit Tests in progress;

- API testing with `curl`:

see example with testing `/auth/login`

```
curl -d '{"password":"tester","userName":"tester"}' -H 'Content-Type: application/json' http://localhost:3000/auth/login
```

in out:

```
{"error":false,"message":"Logged In","token":"eyJhbGciOiJIUzI1NiJ9 eyJzdWIiOiJ0ZXN0ZXIiLCJpYXQiOjE2NjE1ODkzNTIsImV4cCI6MTY2MTYwNzM1Mn0.lA9rIYmjfbw9G3cs2CWwew2JEJQrEtdlSPlc9BO0R_M"}%
```
