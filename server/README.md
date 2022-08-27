## Web-based desktop client (backend code)

see **[Demo - https://neetcloud.dev](https://neetcloud.dev)**

This project was generated with:

- [Spring Boot](https://spring.io) version 2.6.2
- [Spring MongoDB Starter](https://spring.io/guides/gs/accessing-data-mongodb/) version 2.6.2
- JWT API (jjwt-api) version 0.11.2
- [Lombok](https://projectlombok.org)

! Important: 
- Added CORS-configuration to working with frontend on http port 8081 for API calls. 
- Need preinstalled MongoDb [mongodb-community version](https://www.mongodb.com/try/download/community), all settings are default.

### **Features**
- **API**:
	- **Login** with response a new JWT-token
	- **Registration** with creating a new user and return a new JWT-token
	- ... in progress

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
