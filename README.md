![](https://img.shields.io/github/license/bluewave-labs/bluewave-uptime)
![](https://img.shields.io/github/repo-size/bluewave-labs/bluewave-uptime)
![](https://img.shields.io/github/commit-activity/w/bluewave-labs/bluewave-uptime)
![](https://img.shields.io/github/last-commit/bluewave-labs/bluewave-uptime)
![](https://img.shields.io/github/languages/top/bluewave-labs/bluewave-uptime)
![](https://img.shields.io/github/issues-pr/bluewave-labs/bluewave-uptime)
![](https://img.shields.io/github/issues/bluewave-labs/bluewave-uptime)

![]()

# BlueWave Uptime

BlueWave uptime monitoring application

## Getting Started

- Clone this repository to your local machine

1.  [Installation (Client)](#client)
2.  [Installation (Server)](#server)
3.  [Configuration(Server)](#config-server)
    - [Environment](#environmental-variables)
    - [Database](#databases)
      - [Docker Images](#docker-images)
4.  [Endpoints](#endpoints)
    ###### Auth
    - <code>POST</code> [/api/v1/auth/register](#post-register)
    - <code>POST</code> [/api/v1/auth/login](#post-login)
    - <code>POST</code> [/api/v1/auth/user/{userId}](#post-auth-user-edit-id)
    - <code>POST</code> [/api/v1/auth/recovery/request](#post-auth-recovery-request-id)
    - <code>POST</code> [/api/v1/auth/recovery/validate](#post-auth-recovery-validate-id)
    - <code>POST</code> [/api/v1/auth/recovery/reset](#post-auth-recovery-reset-id)
    ###### Monitors
    - <code>GET</code> [/api/v1/monitors](#get-monitors)
    - <code>GET</code> [/api/v1/monitor/{id}](#get-monitor-id)
    - <code>GET</code> [/api/v1/monitors/user/{userId}](#get-monitors-user-userid)
    - <code>POST</code> [/api/v1/monitors](#post-monitors)
    - <code>POST</code> [/api/v1/monitors/delete/{monitorId}](#post-monitors-del-id)
    - <code>POST</code> [/api/v1/monitors/edit/{monitorId}](#post-monitors-edit-id)
    ###### Checks
    - <code>POST</code> [/api/v1/checks/{monitorId}](#post-checks)
    - <code>GET</code> [/api/v1/checks/{monitorId}](#get-checks)
    - <code>POST</code> [/api/v1/checks/delete/{monitorId}](#delete-checks)
    ###### Alerts
    - <code>POST</code> [/api/v1/alerts/{monitorId}](#create-alert)
    - <code>GET</code> [/api/v1/alerts/user/{userId}](#get-alerts-user-id)
    - <code>GET</code> [/api/v1/alerts/monitor/{monitorId}](#get-alerts-monitor-id)
    - <code>GET</code> [/api/v1/alerts/{alertId}](#get-alert-alert-id)
    - <code>POST</code> [/api/v1/alerts/edit/{alertId}](#edit-alert)
    - <code>POST</code> [/api/v1/alerts/delete/{alertId}](#delete-alert)
5.  [Error Handling](#error-handling)
6.  [Contributors](#contributors)

---

### Client

#### Installation

1.  Change directory to the `Client` directory
2.  Install all dependencies by running `npm install`

#### Starting Development Server

1.  Run `npm run dev` to start the development server.

---

### Server

#### Installation

1.  Change directory to the `Server` directory
2.  Install all dependencies by running `npm install`

---

#### Configuration <a id="config-server"></a>

##### Environmental Variables

Configure the server with the following environmental variables:

| ENV Variable Name    | Required/Optional | Type      | Description                                                                                 | Accepted Values     |
| -------------------- | ----------------- | --------- | ------------------------------------------------------------------------------------------- | ------------------- |
| CLIENT_HOST          | Required          | `string`  | Frontend Host                                                                               |                     |
| JWT_SECRET           | Required          | `string`  | JWT secret                                                                                  |                     |
| DB_TYPE              | Optional          | `string`  | Specify DB to use                                                                           | `MongoDB \| FakeDB` |
| DB_CONNECTION_STRING | Required          | `string`  | Specifies URL for MongoDB Database                                                          |                     |
| PORT                 | Optional          | `integer` | Specifies Port for Server                                                                   |                     |
| SENDGRID_API_KEY     | Required          | `string`  | Specifies API KEY for SendGrid email service                                                |                     |
| SYSTEM_EMAIL_ADDRESS | Required          | `string`  | Specifies System email to be used in emailing service, must be a verified email by sendgrid |                     |
| LOGIN_PAGE_URL       | Required          | `string`  | Login url to be used in emailing service                                                    |                     |
| REDIS_HOST           | Required          | `string`  | Host address for Redis database                                                             |                     |
| REDIS_PORT           | Required          | `integer` | Port for Redis database                                                                     |                     |

---

##### Databases

This project requires a number of databases to run:

1.  Main database for the application. This project includes an implementation for a MongoDB database as well as a MongoDB Docker image.
2.  A Redis database is required for the Queue implementation in the PingService. This project includes a Redis docker image.

You may run your own databases locally, or you may use the docker images included in the project to get up and running quickly.

###### (Optional) Running Docker Images <a id="docker-images"></a>

Docker images are located in `./Server/docker`

<details>
<summary><b>MongoDB Image</b></summary>
Located in `./Server/docker/mongo`

The `./Server/docker/mongo/mongo_data` folder should be mounted to the MongoDB container in order to persist data.

From the `mongo` folder run

1.  Build the image: `docker build -t <db_image_name> .`
2.  Run the docker image: `docker run -d -p 27017:27017 -v $(pwd)/../mongo/mongo_data:/data/db --name uptime_database_mongo uptime_database_mongo`

</details>
<details>
<summary><b>Redis Image</b></summary>
Located in `./Server/docker/redis`

the `./Server/docker/redis/redis_data` folder should be mounted to the Redis container in order to persist data.

From the `Redis` folder run

1.  Build the image: `docker build -t <db_image_name>`
2.  Run the image: `docker run -d -p 6379:6379 -v $(pwd)/../redis/redis_data:/data --name uptime_redis uptime_redis`
</details>

---

#### Starting the Development Server

1.  run `npm run dev` to start the development server

---

#### Endpoints

All endpoints return a response in this format:

| Name    | Type      | Notes                         |
| ------- | --------- | ----------------------------- |
| success | `boolean` | Success or failure of request |
| msg     | `string`  | Message describing response   |
| data    | `Object`  | Arbitrary Payload             |

Example:

```
{success: true, msg: "Successful Request", data: {test: testData}}
```

---

##### Data Types

<details>
<summary><code>User</code></summary>

| Name          | Type      | Notes                 |
| ------------- | --------- | --------------------- |
| firstname     | `string`  | First name            |
| lastname      | `string`  | Last name             |
| email         | `string`  | User's email          |
| profilePicUrl | `string`  | URL to User's picture |
| isActive      | `boolean` | Default to `true`     |
| isVerified    | `boolean` | Default to `false`    |
| updated_at    | `Date`    | Last update time      |
| created_at    | `Date`    | Time created at       |

</details>

<details>
<summary><code>Monitor</code></summary>

| Name        | Type      | Notes                                    |
| ----------- | --------- | ---------------------------------------- |
| userId      | `string`  | Unique ID identifying monitor creator    |
| name        | `string`  | Name of the monitor                      |
| description | `string`  | Description of the monitor               |
| url         | `string`  | Url the monitor will ping                |
| isActive    | `boolean` | Whether or not the monitor is active     |
| interval    | `integer` | Interval with which to ping monitor (ms) |
| updatedAt   | `Date`    | Last time the monitor was updated        |
| CreatedAt   | `Date`    | When the monitor was updated             |

</details>

<details>
<summary><code>Check</code></summary>

| Name         | Type      | Notes                                           |
| ------------ | --------- | ----------------------------------------------- |
| monitorId    | `string`  | Unique ID for the monitor                       |
| status       | `boolean` | Indicates the service is Up or Down             |
| responseTime | `integer` | Indicates the response time of the service (ms) |
| statusCode   | `integer` | Status Code returned from the service           |
| message      | `string`  | Message returned from the service               |
| updatedAt    | `Date`    | Last time the check was updated                 |
| CreatedAt    | `Date`    | When the check was created                      |

</details>

<details>
<summary><code>Alert</code></summary>

| Name              | Type      | Notes                                             |
| ----------------- | --------- | ------------------------------------------------- |
| checkId           | `string`  | Unique ID for the associated check                |
| monitorId         | `string`  | Unique ID for the associated monitor              |
| userId            | `string`  | Unique ID for the associated user                 |
| status            | `boolean` | Indicates the service is Up or Down               |
| message           | `string`  | Message for the user about the down service       |
| notifiedStatus    | `boolean` | Indicates whether the user is notified            |
| acknowledgeStatus | `boolean` | Indicates whether the user acknowledged the alert |
| updatedAt         | `Date`    | Last time the alert was updated                   |
| CreatedAt         | `Date`    | When the alert was created                        |

</details>

---

###### Auth

<details>
<summary id='post-register'><code>POST</code> <b>/api/v1/auth/register</b></summary>

##### Method/Headers

> | Method/Headers | Value            |
> | -------------- | ---------------- |
> | Method         | POST             |
> | content-type   | application/json |

##### Body

> | Name      | Type     | Notes               |
> | --------- | -------- | ------------------- |
> | firstname | `string` |                     |
> | lastname  | `string` |
> | email     | `string` | Valid email address |
> | password  | `string` | Min 8 chars         |

##### Response Payload

> | Type | Notes                              |
> | ---- | ---------------------------------- |
> | JWT  | JSON Web Token containing a `User` |

##### Sample CURL request

```
curl --request POST \
  --url http://localhost:5000/api/v1/auth/register \
  --header 'Content-Type: application/json' \
  --data '{
	"firstname" : "User First Name",
	"lastname": "User Last Name",
	"email" : "user@gmail.com",
	"password": "user_password"
}'
```

##### Sample Response

```json
{
  "success": true,
  "msg": "User created",
  "data": "<encoded_user>"
}
```

</details>

<details>
<summary id='post-login'><code>POST</code> <b>/api/v1/auth/login</b></summary>

##### Method/Headers

> | Method/Headers | Value            |
> | -------------- | ---------------- |
> | Method         | POST             |
> | content-type   | application/json |

##### Body

> | Name     | Type     | Notes               |
> | -------- | -------- | ------------------- |
> | email    | `string` | Valid email address |
> | password | `string` | Min 8 chars         |

##### Response Payload

> | Type | Notes                              |
> | ---- | ---------------------------------- |
> | JWT  | JSON Web Token Containing a `User` |

##### Sample CURL request

```
curl --request POST \
  --url http://localhost:5000/api/v1/auth/login \
  --header 'Content-Type: application/json' \
  --data '{
	"email" : "user@gmail.com",
	"password": "user_password"
}'
```

##### Sample response

```json
{
  "success": true,
  "msg": "Found user",
  "data": "<encoded_user>"
}
```

</details>

<details>
<summary id='post-auth-user-edit-id'><code>POST</code><b>/api/v1/auth/user/{userId}</b></summary>

###### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | POST  |

##### Body

> | Name          | Type     | Notes       |
> | ------------- | -------- | ----------- |
> | firstname     | `string` |             |
> | lastname      | `string` |             |
> | profilePicUrl | `string` |             |
> | password      | `string` | Min 8 chars |

###### Response Payload

> | Type   | Notes                    |
> | ------ | ------------------------ |
> | `User` | Returns the updated user |

##### Sample CURL request

```
curl --request POST \
  --url http://localhost:5000/api/v1/auth/user/6654d156634754f789e1f10e \
  --header 'Authorization: <bearer_token>' \
  --header 'Content-Type: application/json' \
  --data '{
	"firstname": "First Name",
  "lastname: "Last Name"
}'
```

###### Sample Response

```json
{
  "success": true,
  "msg": "User updated",
  "data": {
    "_id": "6654d156634754f789e1f10e",
    "firstname": "First Name",
    "lastname": "Last Name",
    "email": "me@gmail.com",
    "isActive": true,
    "isVerified": false,
    "createdAt": "2024-05-27T18:30:46.358Z",
    "updatedAt": "2024-05-27T19:21:51.747Z",
    "__v": 0
  }
}
```

</details>

<details>
<summary id='post-auth-recovery-request-id'><code>POST</code><b>/api/v1/auth/recovery/request</b></summary>

###### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | POST  |

##### Body

> | Name  | Type     | Notes        |
> | ----- | -------- | ------------ |
> | email | `string` | User's email |

###### Response Payload

> | Type            | Notes                                   |
> | --------------- | --------------------------------------- |
> | `RecoveryToken` | Returns a recovery token if email found |

##### Sample CURL request

```
curl --request POST \
  --url http://localhost:5000/api/v1/auth/recovery/request \
  --header 'Content-Type: application/json' \
  --data '{
	"email" : "ajhollid@gmail.com"
}'
```

###### Sample Response

```json
{
  "success": true,
  "msg": "Created recovery token",
  "data": {
    "email": "your_email@gmail.com",
    "token": "f519da5e4a9be40cfc3c0fde97e60c0e6d17bdaa613f5ba537a45073f3865193",
    "_id": "6668878263587f30748e968e",
    "expiry": "2024-06-11T17:21:06.984Z",
    "createdAt": "2024-06-11T17:21:06.985Z",
    "updatedAt": "2024-06-11T17:21:06.985Z",
    "__v": 0
  }
}
```

</details>

<details>
<summary id='post-auth-recovery-validate-id'><code>POST</code><b>/api/v1/auth/recovery/validate</b></summary>

###### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | POST  |

##### Body

> | Name          | Type     | Notes                               |
> | ------------- | -------- | ----------------------------------- |
> | recoveryToken | `string` | Token issued in `/recovery/request` |

###### Response Payload

> | Type            | Notes                      |
> | --------------- | -------------------------- |
> | `RecoveryToken` | Returns the recovery token |

##### Sample CURL request

```
curl --request POST \
  --url http://localhost:5000/api/v1/auth/recovery/validate \
  --header 'Content-Type: application/json' \
  --data '{
	"recoveryToken" : "f519da5e4a9be40cfc3c0fde97e60c0e6d17bdaa613f5ba537a45073f3865193"
}'
```

###### Sample Response

```json
{
  "success": true,
  "msg": "Token is valid",
  "data": {
    "_id": "6668894263587f30748e969a",
    "email": "ajhollid@gmail.com",
    "token": "457d9926b24dedf613f120eeb524ef00ac45b3f0fc5c70bd25b1cc8aa83a64a0",
    "expiry": "2024-06-11T17:28:34.349Z",
    "createdAt": "2024-06-11T17:28:34.349Z",
    "updatedAt": "2024-06-11T17:28:34.349Z",
    "__v": 0
  }
}
```

</details>

<details>
<summary id='post-auth-recovery-reset-id'><code>POST</code><b>/api/v1/auth/recovery/reset</b></summary>

###### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | POST  |

##### Body

> | Name          | Type     | Notes                                         |
> | ------------- | -------- | --------------------------------------------- |
> | recoveryToken | `string` | Token issued returned by `/recovery/validate` |
> | password      | `string` | User's new password`                          |

###### Response Payload

> | Type   | Notes                    |
> | ------ | ------------------------ |
> | `User` | Returns the updated user |

##### Sample CURL request

```
curl --request POST \
  --url http://localhost:5000/api/v1/auth/recovery/reset \
  --header 'Content-Type: application/json' \
  --data '{
	"recoveryToken" : "f519da5e4a9be40cfc3c0fde97e60c0e6d17bdaa613f5ba537a45073f3865193",
	"password": "testtest"
}'
```

###### Sample Response

```json
{
  "success": true,
  "msg": "Password reset",
  "data": {
    "_id": "66675891cb17336d84c25d9f",
    "firstname": "User First Name",
    "lastname": "User Last Name",
    "email": "your_email@gmail.com",
    "isActive": true,
    "isVerified": false,
    "createdAt": "2024-06-10T19:48:33.863Z",
    "updatedAt": "2024-06-11T17:21:22.289Z",
    "__v": 0
  }
}
```

</details>

---

###### Monitors

<details>
<summary id='get-monitors'><code>GET</code> <b>/api/v1/monitors</b></summary>

##### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | GET   |

##### Response Payload

> | Type             | Notes                 |
> | ---------------- | --------------------- |
> | `Array<Monitor>` | Array of all monitors |

###### Sample cURL Request

```
curl --request GET \
  --url http://localhost:5000/api/v1/monitors \
  --header '<bearer_token>' \
```

###### Sample Response

```json
{
  "success": true,
  "msg": "Monitors found",
  "data": [
    {
      "_id": "664d070786e62625ac612ca1",
      "userId": "6645079aae0b439371913972",
      "name": "Wha3",
      "description": "Description",
      "url": "https://monitor0.com",
      "isActive": true,
      "interval": 60000,
      "createdAt": "2024-05-21T20:41:43.051Z",
      "updatedAt": "2024-05-21T20:45:10.496Z",
      "__v": 0
    },
    {
      "_id": "664e5ccf189c864800debc16",
      "userId": "6645079aae0b439371913972",
      "name": "Inserting a new Monitor",
      "description": "Description",
      "url": "https://monitor0.com",
      "isActive": true,
      "interval": 60000,
      "createdAt": "2024-05-22T20:59:59.295Z",
      "updatedAt": "2024-05-22T20:59:59.295Z",
      "__v": 0
    }
  ]
}
```

</details>

<details>
<summary id='get-monitor-id'><code>GET</code> <b>/api/v1/monitor/{id}</b></summary>

###### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | GET   |

###### Response Payload

> | Type      | Notes                                               |
> | --------- | --------------------------------------------------- |
> | `Monitor` | Single monitor with the id in the request parameter |

###### Sample cURL Request

```
curl --request GET \
  --url http://localhost:5000/api/v1/monitors/664d070786e62625ac612ca1 \
  --header '<bearer_token>' \
```

###### Sample Response

```json
{
  "success": true,
  "msg": "Monitor found",
  "data": {
    "_id": "664d070786e62625ac612ca1",
    "userId": "6645079aae0b439371913972",
    "name": "My Monitor",
    "description": "Description",
    "url": "https://monitor0.com",
    "isActive": true,
    "interval": 60000,
    "createdAt": "2024-05-21T20:41:43.051Z",
    "updatedAt": "2024-05-21T20:45:10.496Z",
    "__v": 0
  }
}
```

</details>

<details>
<summary id='get-monitors-user-userid'><code>GET</code> <b>/api/v1/monitors/user/{userId}</b></summary>

###### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | GET   |

###### Response Payload

> | Type             | Notes                                                   |
> | ---------------- | ------------------------------------------------------- |
> | `Array<Monitor>` | Array of monitors created by user with specified UserID |

###### Sample cURL Request

```
curl --request GET \
  --url http://localhost:5000/api/v1/monitors/user/6645079aae0b439371913972 \
  --header '<bearer_token>' \
```

###### Sample Response

```json
{
  "success": true,
  "msg": "Monitors for user 6645079aae0b439371913972 found",
  "data": [
    {
      "_id": "664d070786e62625ac612ca1",
      "userId": "6645079aae0b439371913972",
      "name": "Wha3",
      "description": "Description",
      "url": "https://monitor0.com",
      "isActive": true,
      "interval": 60000,
      "createdAt": "2024-05-21T20:41:43.051Z",
      "updatedAt": "2024-05-21T20:45:10.496Z",
      "__v": 0
    },
    {
      "_id": "664e5ccf189c864800debc16",
      "userId": "6645079aae0b439371913972",
      "name": "Inserting a new Monitor",
      "description": "Description",
      "url": "https://monitor0.com",
      "isActive": true,
      "interval": 60000,
      "createdAt": "2024-05-22T20:59:59.295Z",
      "updatedAt": "2024-05-22T20:59:59.295Z",
      "__v": 0
    }
  ]
}
```

</details>

<details>
<summary id='post-monitors'><code>POST</code><b>/api/v1/monitors</b></summary>

###### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | POST  |

###### Response Payload

> | Type      | Notes                           |
> | --------- | ------------------------------- |
> | `Monitor` | Returns newly created `Monitor` |

##### Sample CURL request

```
curl --request POST \
  --url http://localhost:5000/api/v1/monitors \
  --header <bearer_token> \
  --header 'Content-Type: application/json' \
  --data '{"userId": "6645079aae0b439371913972",
			"name": "Inserting a new Monitor",
			"description": "Description",
			"url": "https://monitor0.com",
			"isActive": true,
			"interval": 60000}'
```

##### Sample Response

```json
{
  "success": true,
  "msg": "Monitor created",
  "data": {
    "userId": "6645079aae0b439371913972",
    "name": "Inserting a new Monitor",
    "description": "Description",
    "url": "https://monitor0.com",
    "isActive": true,
    "interval": 60000,
    "_id": "664e5ccf189c864800debc16",
    "createdAt": "2024-05-22T20:59:59.295Z",
    "updatedAt": "2024-05-22T20:59:59.295Z",
    "__v": 0
  }
}
```

</details>

<details>
<summary id='post-monitors-del-id'><code>POST</code><b>/api/v1/monitors/delete/{monitorId}</b></summary>

###### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | POST  |

###### Response Payload

> | Type | Notes               |
> | ---- | ------------------- |
> | None | No payload returned |

###### Sample CURL request

```
curl --request POST \
  --url http://localhost:5000/api/v1/monitors/delete/664e632a7a3ee9d620761938 \
  --header '<bearer_token>' \
  --header 'Content-Type: application/json' \
```

###### Sample Response

```json
{
  "success": true,
  "msg": "Monitor deleted"
}
```

## </details>

<details>
<summary id='post-monitors-edit-id'><code>POST</code><b>/api/v1/monitors/edit/{monitorId}</b></summary>

###### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | POST  |

###### Response Payload

> | Type      | Notes                       |
> | --------- | --------------------------- |
> | `Monitor` | Returns the updated monitor |

##### Sample CURL request

```
curl --request POST \
  --url http://localhost:5000/api/v1/monitors/edit/664e5ccf189c864800debc16 \
  --header '<bearer_token' \
  --header 'Content-Type: application/json' \
  --data '
		{
			"_id": "664e5ccf189c864800debc16",
			"userId": "6645079aae0b439371913972",
			"name": "Edited monitor",
			"description": "Description",
			"url": "https://monitor0.com",
			"isActive": true,
			"interval": 60000
		}'
```

###### Sample Response

```json
{
  "success": true,
  "msg": "Monitor edited",
  "data": {
    "_id": "664e5ccf189c864800debc16",
    "userId": "6645079aae0b439371913972",
    "name": "Edited monitor",
    "description": "Description",
    "url": "https://monitor0.com",
    "isActive": true,
    "interval": 60000,
    "createdAt": "2024-05-22T20:59:59.295Z",
    "updatedAt": "2024-05-22T21:34:33.893Z",
    "__v": 0
  }
}
```

</details>

---

###### Checks

<details>
<summary id='post-checks'><code>POST</code><b>/api/v1/checks/{monitorId}</b></summary>

###### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | POST  |

###### Response Payload

> | Type    | Notes                       |
> | ------- | --------------------------- |
> | `Check` | Returns newly created check |

###### Body

> | Name         | Type      | Notes                                  |
> | ------------ | --------- | -------------------------------------- |
> | monitorId    | `string`  | Monitor associated with Check          |
> | status       | `boolean` | `true` for up and `false` for down     |
> | responseTime | `number`  | How long it took the server to respond |
> | statusCode   | `number`  | HTTP Status code of response           |
> | message      | `string`  |                                        |

##### Sample CURL request

```
curl --request POST \
  --url http://localhost:5000/api/v1/checks/66562414035c4ce6a8a610ac \
  --header 'Authorization: <bearer_token>' \
  --header 'Content-Type: application/json' \
  --data '{
	"monitorId": "66562414035c4ce6a8a610ac",
	"status": true,
	"responseTime": 1,
	"statusCode": 200,
	"message": "good"
}'
```

###### Sample Response

```json
{
  "success": true,
  "msg": "Check created",
  "data": {
    "monitorId": "66562414035c4ce6a8a610ac",
    "status": true,
    "responseTime": 1,
    "statusCode": 200,
    "message": "good",
    "_id": "66576decba9f70148ea1f354",
    "createdAt": "2024-05-29T18:03:24.445Z",
    "updatedAt": "2024-05-29T18:03:24.445Z",
    "__v": 0
  }
}
```

</details>

<details>
<summary id='get-checks'><code>GET</code><b>/api/v1/checks/{monitorId}</b></summary>

###### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | GET   |

###### Response Payload

> | Type            | Notes                    |
> | --------------- | ------------------------ |
> | `Array<Checks>` | Array of `Check` objects |

##### Sample CURL request

```
curl --request GET \
  --url http://localhost:5000/api/v1/checks/66562414035c4ce6a8a610ac \
  --header 'Authorization: <bearer_token>' \
```

###### Sample Response

```json
{
  "success": true,
  "msg": "Checks retrieved",
  "data": [
    {
      "_id": "66576c0194e11c0d4409d3c1",
      "monitorId": "66562414035c4ce6a8a610ac",
      "status": true,
      "responseTime": 1,
      "statusCode": 200,
      "message": "good",
      "createdAt": "2024-05-29T17:55:13.581Z",
      "updatedAt": "2024-05-29T17:55:13.581Z",
      "__v": 0
    },
    {
      "_id": "66576c0994e11c0d4409d3c5",
      "monitorId": "66562414035c4ce6a8a610ac",
      "status": true,
      "responseTime": 2,
      "statusCode": 200,
      "message": "good",
      "createdAt": "2024-05-29T17:55:21.127Z",
      "updatedAt": "2024-05-29T17:55:21.127Z",
      "__v": 0
    }
  ]
}
```

</details>

<details>
<summary id='delete-checks'><code>POST</code><b>/api/v1/checks/delete/{monitorId}</b></summary>

###### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | POST  |

###### Response Payload

> | Type     | Notes                                                                |
> | -------- | -------------------------------------------------------------------- |
> | `Object` | `{deletedCount: n}` Returns an object showing how many items deleted |

##### Sample CURL request

```
curl --request POST \
  --url http://localhost:5000/api/v1/checks/delete/66562414035c4ce6a8a610ac \
  --header 'Authorization: <bearer_token>' \
```

###### Sample Response

```json
{
  "success": true,
  "msg": "Checks deleted",
  "data": {
    "deletedCount": 3
  }
}
```

</details>

---

###### Alerts

<details>
<summary id='create-alert'><code>POST</code><b>/api/v1/alerts/{monitorId}</b></summary>

###### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | POST  |

###### Response Payload

> | Type    | Notes                         |
> | ------- | ----------------------------- |
> | `Alert` | Returns newly created `Alert` |

###### Body

    "checkId": "66577a3fd16dcf7c1ce35148",
    "monitorId": "6657789ebf6766ee8e2d2edb",
    "userId": "6654d1a2634754f789e1f115",
    "status": false,
    "message": "This is a test alert",
    "notifiedStatus": "false",
    "acknowledgeStatus": false

> | Name              | Type      | Notes                                   |
> | ----------------- | --------- | --------------------------------------- |
> | checkId           | `string`  | Id of `Check` associated with `Alert`   |
> | monitorId         | `string`  | Id of `Monitor` associated with `Alert` |
> | userId            | `string`  | Id of `User` associated with `Alert`    |
> | status            | `boolean` | Status of `Alert`                       |
> | message           | `string`  | `Alert` message                         |
> | notifiedStatus    | `boolean` |                                         |
> | acknowledgeStatus | `boolean` |                                         |

##### Sample CURL request

```

```

###### Sample Response

```json

```

</details>

<details>
<summary id='get-alerts-user-id'><code>GET</code><b>/api/v1/alerts/user/{userId}</b></summary>

###### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | GET   |

###### Response Payload

> | Type           | Notes                                   |
> | -------------- | --------------------------------------- |
> | `Array<Alert>` | Returns all `Alert` created by a `User` |

##### Sample CURL request

```
curl --request GET \
  --url http://localhost:5000/api/v1/alerts/user/6654d1a2634754f789e1f115 \
  --header 'Authorization: <bearer_token>'
```

###### Sample Response

```json
{
  "success": true,
  "msg": "Got alerts",
  "data": [
    {
      "_id": "6657813d809adfded891a6b7",
      "checkId": "66577a3fd16dcf7c1ce35148",
      "monitorId": "6657789ebf6766ee8e2d2edb",
      "userId": "6654d1a2634754f789e1f115",
      "status": false,
      "message": "This is a test alert",
      "notifiedStatus": false,
      "acknowledgeStatus": false,
      "createdAt": "2024-05-29T19:25:49.317Z",
      "updatedAt": "2024-05-29T19:25:49.317Z",
      "__v": 0
    }
  ]
}
```

</details>
<details>
<summary id='get-alerts-monitor-id'><code>GET</code><b>/api/v1/alerts/monitor/{monitorId}</b></summary>

###### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | GET   |

###### Response Payload

> | Type           | Notes                                                          |
> | -------------- | -------------------------------------------------------------- |
> | `Array<Alert>` | Returns an array of `Alert` belonging to a specified `Monitor` |

##### Sample CURL request

```
curl --request GET \
  --url http://localhost:5000/api/v1/alerts/monitor/6657789ebf6766ee8e2d2edb \
  --header 'Authorization: <bearer_token>' \
```

###### Sample Response

```json
{
  "success": true,
  "msg": "Got alerts by Monitor",
  "data": [
    {
      "_id": "6657813d809adfded891a6b7",
      "checkId": "66577a3fd16dcf7c1ce35148",
      "monitorId": "6657789ebf6766ee8e2d2edb",
      "userId": "6654d1a2634754f789e1f115",
      "status": false,
      "message": "This is a test alert",
      "notifiedStatus": false,
      "acknowledgeStatus": false,
      "createdAt": "2024-05-29T19:25:49.317Z",
      "updatedAt": "2024-05-29T19:25:49.317Z",
      "__v": 0
    }
  ]
}
```

</details>

<details>
<summary id='get-alert-alert-id'><code>GET</code><b>/api/v1/alerts/{alertId}</b></summary>

###### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | GET   |

###### Response Payload

> | Type    | Notes                     |
> | ------- | ------------------------- |
> | `Alert` | Returns specified `Alert` |

##### Sample CURL request

```
curl --request GET \
  --url http://localhost:5000/api/v1/alerts/66577ddae5ff3c91437d0887 \
  --header 'Authorization: <bearer_token>' \
```

###### Sample Response

```json
{
  "success": true,
  "msg": "Got Alert By alertID",
  "data": {
    "_id": "66577ddae5ff3c91437d0887",
    "checkId": "66577a3fd16dcf7c1ce35148",
    "monitorId": "6657789ebf6766ee8e2d2edb",
    "userId": "6654d1a2634754f789e1f115",
    "status": false,
    "message": "This is a test alert",
    "notifiedStatus": false,
    "acknowledgeStatus": false,
    "createdAt": "2024-05-29T19:11:22.205Z",
    "updatedAt": "2024-05-29T19:11:22.205Z",
    "__v": 0
  }
}
```

</details>

<details>
<summary id='edit-alert'><code>POST</code><b>/api/v1/alerts/edit/{alertId}</b></summary>

###### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | POST  |

###### Response Payload

> | Type    | Notes                  |
> | ------- | ---------------------- |
> | `Alert` | Returns edited `Alert` |

###### Body

> | Name              | Type      | Notes                                      |
> | ----------------- | --------- | ------------------------------------------ |
> | checkId           | `string`  | ID of `Check` associated with `Alert`      |
> | monitorId         | `string`  | ID of `Monitor` id associated with `Alert` |
> | userId            | `string`  | ID of `User` associated with `Alert`       |
> | status            | `boolean` | Alert status                               |
> | message           | `string`  | Alert message                              |
> | notifiedStatus    | `boolean` |                                            |
> | acknowledgeStatus | `boolean` |                                            |

##### Sample CURL request

```
curl --request POST \
  --url http://localhost:5000/api/v1/alerts/edit/66577ddae5ff3c91437d0887 \
  --header 'Authorization: <bearer_token>' \
  --header 'Content-Type: application/json' \
  --data '{
	"acknowledgeStatus": true
}'
```

###### Sample Response

```json
{
  "success": true,
  "msg": "Edited alert",
  "data": {
    "_id": "66577ddae5ff3c91437d0887",
    "checkId": "66577a3fd16dcf7c1ce35148",
    "monitorId": "6657789ebf6766ee8e2d2edb",
    "userId": "6654d1a2634754f789e1f115",
    "status": false,
    "message": "This is a test alert",
    "notifiedStatus": false,
    "acknowledgeStatus": true,
    "createdAt": "2024-05-29T19:11:22.205Z",
    "updatedAt": "2024-05-29T19:12:23.951Z",
    "__v": 0
  }
}
```

</details>
<details>
<summary id='delete-alert'><code>POST</code><b>/api/v1/alerts/delete/{alertId}</b></summary>

###### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | POST  |

###### Response Payload

> | Type    | Notes                       |
> | ------- | --------------------------- |
> | `Alert` | Returns the deleted `Alert` |

##### Sample CURL request

```
curl --request POST \
  --url http://localhost:5000/api/v1/alerts/delete/66577ddae5ff3c91437d0887 \
  --header 'Authorization: <bearer_token>' \
```

###### Sample Response

```json
{
  "success": true,
  "msg": "Deleted alert",
  "data": {
    "_id": "66577ddae5ff3c91437d0887",
    "checkId": "66577a3fd16dcf7c1ce35148",
    "monitorId": "6657789ebf6766ee8e2d2edb",
    "userId": "6654d1a2634754f789e1f115",
    "status": false,
    "message": "This is a test alert",
    "notifiedStatus": false,
    "acknowledgeStatus": true,
    "createdAt": "2024-05-29T19:11:22.205Z",
    "updatedAt": "2024-05-29T19:12:23.951Z",
    "__v": 0
  }
}
```

</details>

---

###### Checks

<details>
<summary id='post-checks'><code>POST</code><b>/api/v1/checks/{monitorId}</b></summary>

###### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | POST  |

###### Response Payload

> | Type    | Notes                       |
> | ------- | --------------------------- |
> | `Check` | Returns newly created check |

###### Body

> | Name         | Type      | Notes                                  |
> | ------------ | --------- | -------------------------------------- |
> | monitorId    | `string`  | Monitor associated with Check          |
> | status       | `boolean` | `true` for up and `false` for down     |
> | responseTime | `number`  | How long it took the server to respond |
> | statusCode   | `number`  | HTTP Status code of response           |
> | message      | `string`  |                                        |

##### Sample CURL request

```
curl --request POST \
  --url http://localhost:5000/api/v1/checks/66562414035c4ce6a8a610ac \
  --header 'Authorization: <bearer_token>' \
  --header 'Content-Type: application/json' \
  --data '{
	"monitorId": "66562414035c4ce6a8a610ac",
	"status": true,
	"responseTime": 1,
	"statusCode": 200,
	"message": "good"
}'
```

###### Sample Response

```json
{
  "success": true,
  "msg": "Check created",
  "data": {
    "monitorId": "66562414035c4ce6a8a610ac",
    "status": true,
    "responseTime": 1,
    "statusCode": 200,
    "message": "good",
    "_id": "66576decba9f70148ea1f354",
    "createdAt": "2024-05-29T18:03:24.445Z",
    "updatedAt": "2024-05-29T18:03:24.445Z",
    "__v": 0
  }
}
```

</details>

<details>
<summary id='get-checks'><code>GET</code><b>/api/v1/checks/{monitorId}</b></summary>

###### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | GET   |

###### Response Payload

> | Type            | Notes                    |
> | --------------- | ------------------------ |
> | `Array<Checks>` | Array of `Check` objects |

##### Sample CURL request

```
curl --request GET \
  --url http://localhost:5000/api/v1/checks/66562414035c4ce6a8a610ac \
  --header 'Authorization: <bearer_token>' \
```

###### Sample Response

```json
{
  "success": true,
  "msg": "Checks retrieved",
  "data": [
    {
      "_id": "66576c0194e11c0d4409d3c1",
      "monitorId": "66562414035c4ce6a8a610ac",
      "status": true,
      "responseTime": 1,
      "statusCode": 200,
      "message": "good",
      "createdAt": "2024-05-29T17:55:13.581Z",
      "updatedAt": "2024-05-29T17:55:13.581Z",
      "__v": 0
    },
    {
      "_id": "66576c0994e11c0d4409d3c5",
      "monitorId": "66562414035c4ce6a8a610ac",
      "status": true,
      "responseTime": 2,
      "statusCode": 200,
      "message": "good",
      "createdAt": "2024-05-29T17:55:21.127Z",
      "updatedAt": "2024-05-29T17:55:21.127Z",
      "__v": 0
    }
  ]
}
```

</details>

<details>
<summary id='delete-checks'><code>POST</code><b>/api/v1/checks/delete/{monitorId}</b></summary>

###### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | POST  |

###### Response Payload

> | Type     | Notes                                                                |
> | -------- | -------------------------------------------------------------------- |
> | `Object` | `{deletedCount: n}` Returns an object showing how many items deleted |

##### Sample CURL request

```
curl --request POST \
  --url http://localhost:5000/api/v1/checks/delete/66562414035c4ce6a8a610ac \
  --header 'Authorization: <bearer_token>' \
```

###### Sample Response

```json
{
  "success": true,
  "msg": "Checks deleted",
  "data": {
    "deletedCount": 3
  }
}
```

</details>

---

###### Alerts

<details>
<summary id='create-alert'><code>POST</code><b>/api/v1/alerts/{monitorId}</b></summary>

###### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | POST  |

###### Response Payload

> | Type    | Notes                         |
> | ------- | ----------------------------- |
> | `Alert` | Returns newly created `Alert` |

###### Body

    "checkId": "66577a3fd16dcf7c1ce35148",
    "monitorId": "6657789ebf6766ee8e2d2edb",
    "userId": "6654d1a2634754f789e1f115",
    "status": false,
    "message": "This is a test alert",
    "notifiedStatus": "false",
    "acknowledgeStatus": false

> | Name              | Type      | Notes                                   |
> | ----------------- | --------- | --------------------------------------- |
> | checkId           | `string`  | Id of `Check` associated with `Alert`   |
> | monitorId         | `string`  | Id of `Monitor` associated with `Alert` |
> | userId            | `string`  | Id of `User` associated with `Alert`    |
> | status            | `boolean` | Status of `Alert`                       |
> | message           | `string`  | `Alert` message                         |
> | notifiedStatus    | `boolean` |                                         |
> | acknowledgeStatus | `boolean` |                                         |

##### Sample CURL request

```

```

###### Sample Response

```json

```

</details>

<details>
<summary id='get-alerts-user-id'><code>GET</code><b>/api/v1/alerts/user/{userId}</b></summary>

###### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | GET   |

###### Response Payload

> | Type           | Notes                                   |
> | -------------- | --------------------------------------- |
> | `Array<Alert>` | Returns all `Alert` created by a `User` |

##### Sample CURL request

```
curl --request GET \
  --url http://localhost:5000/api/v1/alerts/user/6654d1a2634754f789e1f115 \
  --header 'Authorization: <bearer_token>'
```

###### Sample Response

```json
{
  "success": true,
  "msg": "Got alerts",
  "data": [
    {
      "_id": "6657813d809adfded891a6b7",
      "checkId": "66577a3fd16dcf7c1ce35148",
      "monitorId": "6657789ebf6766ee8e2d2edb",
      "userId": "6654d1a2634754f789e1f115",
      "status": false,
      "message": "This is a test alert",
      "notifiedStatus": false,
      "acknowledgeStatus": false,
      "createdAt": "2024-05-29T19:25:49.317Z",
      "updatedAt": "2024-05-29T19:25:49.317Z",
      "__v": 0
    }
  ]
}
```

</details>
<details>
<summary id='get-alerts-monitor-id'><code>GET</code><b>/api/v1/alerts/monitor/{monitorId}</b></summary>

###### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | GET   |

###### Response Payload

> | Type           | Notes                                                          |
> | -------------- | -------------------------------------------------------------- |
> | `Array<Alert>` | Returns an array of `Alert` belonging to a specified `Monitor` |

##### Sample CURL request

```
curl --request GET \
  --url http://localhost:5000/api/v1/alerts/monitor/6657789ebf6766ee8e2d2edb \
  --header 'Authorization: <bearer_token>' \
```

###### Sample Response

```json
{
  "success": true,
  "msg": "Got alerts by Monitor",
  "data": [
    {
      "_id": "6657813d809adfded891a6b7",
      "checkId": "66577a3fd16dcf7c1ce35148",
      "monitorId": "6657789ebf6766ee8e2d2edb",
      "userId": "6654d1a2634754f789e1f115",
      "status": false,
      "message": "This is a test alert",
      "notifiedStatus": false,
      "acknowledgeStatus": false,
      "createdAt": "2024-05-29T19:25:49.317Z",
      "updatedAt": "2024-05-29T19:25:49.317Z",
      "__v": 0
    }
  ]
}
```

</details>

<details>
<summary id='get-alert-alert-id'><code>GET</code><b>/api/v1/alerts/{alertId}</b></summary>

###### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | GET   |

###### Response Payload

> | Type    | Notes                     |
> | ------- | ------------------------- |
> | `Alert` | Returns specified `Alert` |

##### Sample CURL request

```
curl --request GET \
  --url http://localhost:5000/api/v1/alerts/66577ddae5ff3c91437d0887 \
  --header 'Authorization: <bearer_token>' \
```

###### Sample Response

```json
{
  "success": true,
  "msg": "Got Alert By alertID",
  "data": {
    "_id": "66577ddae5ff3c91437d0887",
    "checkId": "66577a3fd16dcf7c1ce35148",
    "monitorId": "6657789ebf6766ee8e2d2edb",
    "userId": "6654d1a2634754f789e1f115",
    "status": false,
    "message": "This is a test alert",
    "notifiedStatus": false,
    "acknowledgeStatus": false,
    "createdAt": "2024-05-29T19:11:22.205Z",
    "updatedAt": "2024-05-29T19:11:22.205Z",
    "__v": 0
  }
}
```

</details>

<details>
<summary id='edit-alert'><code>POST</code><b>/api/v1/alerts/edit/{alertId}</b></summary>

###### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | POST  |

###### Response Payload

> | Type    | Notes                  |
> | ------- | ---------------------- |
> | `Alert` | Returns edited `Alert` |

###### Body

> | Name              | Type      | Notes                                      |
> | ----------------- | --------- | ------------------------------------------ |
> | checkId           | `string`  | ID of `Check` associated with `Alert`      |
> | monitorId         | `string`  | ID of `Monitor` id associated with `Alert` |
> | userId            | `string`  | ID of `User` associated with `Alert`       |
> | status            | `boolean` | Alert status                               |
> | message           | `string`  | Alert message                              |
> | notifiedStatus    | `boolean` |                                            |
> | acknowledgeStatus | `boolean` |                                            |

##### Sample CURL request

```
curl --request POST \
  --url http://localhost:5000/api/v1/alerts/edit/66577ddae5ff3c91437d0887 \
  --header 'Authorization: <bearer_token>' \
  --header 'Content-Type: application/json' \
  --data '{
	"acknowledgeStatus": true
}'
```

###### Sample Response

```json
{
  "success": true,
  "msg": "Edited alert",
  "data": {
    "_id": "66577ddae5ff3c91437d0887",
    "checkId": "66577a3fd16dcf7c1ce35148",
    "monitorId": "6657789ebf6766ee8e2d2edb",
    "userId": "6654d1a2634754f789e1f115",
    "status": false,
    "message": "This is a test alert",
    "notifiedStatus": false,
    "acknowledgeStatus": true,
    "createdAt": "2024-05-29T19:11:22.205Z",
    "updatedAt": "2024-05-29T19:12:23.951Z",
    "__v": 0
  }
}
```

</details>
<details>
<summary id='delete-alert'><code>POST</code><b>/api/v1/alerts/delete/{alertId}</b></summary>

###### Method/Headers

> | Method/Headers | Value |
> | -------------- | ----- |
> | Method         | POST  |

###### Response Payload

> | Type    | Notes                       |
> | ------- | --------------------------- |
> | `Alert` | Returns the deleted `Alert` |

##### Sample CURL request

```
curl --request POST \
  --url http://localhost:5000/api/v1/alerts/delete/66577ddae5ff3c91437d0887 \
  --header 'Authorization: <bearer_token>' \
```

###### Sample Response

```json
{
  "success": true,
  "msg": "Deleted alert",
  "data": {
    "_id": "66577ddae5ff3c91437d0887",
    "checkId": "66577a3fd16dcf7c1ce35148",
    "monitorId": "6657789ebf6766ee8e2d2edb",
    "userId": "6654d1a2634754f789e1f115",
    "status": false,
    "message": "This is a test alert",
    "notifiedStatus": false,
    "acknowledgeStatus": true,
    "createdAt": "2024-05-29T19:11:22.205Z",
    "updatedAt": "2024-05-29T19:12:23.951Z",
    "__v": 0
  }
}
```

</details>

---

### Error handling

Errors are returned in a standard format:

`{"success": false, "msg": "No token provided"}`

Errors are handled by error handling middleware and should be thrown with the following parameters

| Name    | Type      | Default                | Notes                                |
| ------- | --------- | ---------------------- | ------------------------------------ |
| status  | `integer` | 500                    | Standard HTTP codes                  |
| message | `string`  | "Something went wrong" | An error message                     |
| service | `string`  | "Unknown Service"      | Name of service that threw the error |

Example:

```
const myRoute = async(req, res, next) => {
  try{
    const result = myRiskyOperationHere();
  }
  catch(error){
    error.status = 404
    error.message = "Resource not found"
    error.service = service name
    next(error)
    return;
  }
}

```

Errors should not be handled at the controller level and should be left to the middleware to handle.

## Contributors

<a href="https://github.com/bluewave-labs/bluewave-uptime/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=bluewave-labs/bluewave-uptime" />
</a>

Made with [contrib.rocks](https://contrib.rocks).
