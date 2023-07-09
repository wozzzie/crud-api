# crud-api  
To work with the project you should to clone the repository

```
git clone https://github.com/wozzzie/crud-api.git
```

switch to the develop branch

```

git checkout develop

```

install the dependencies

```

npm install

```

You can use the project in developer mode

```

npm run start:dev

```
or in production mode

```

npm run start:prod

```


After launching the application, launch Postman.

Response - an array of all users,
Method - GET
Address - http://localhost:3000/api/users

```
GET
http://localhost:3000/api/users

```
Response - one specific use,
Method - GET
Address - http://localhost:3000/api/users/{userId}

```
GET
http://localhost:3000/api/users/21aa4cc0-dccd-4857-9d86-915225ca5223

```
Response - add a new user,
Method - POST
Address - http://localhost:3000/api/users

```
POST
http://localhost:3000/api/users

{
  "username": "JohnDoe1",
  "age": 24,
  "hobbies": ["Swimming", "Gaming"]
}

```

Response - change the user's data,
Method - PUT
Address - http://localhost:3000/api/users/{userId}

```
PUT
http://localhost:3000/api/users/21aa4cc0-dccd-4857-9d86-915225ca5223

{
  "username": "John Liam",
  "age": 70,
  "hobbies": ["Gaming"]
}

```
Response - delete a user,
Method - DELETE
Address - http://localhost:3000/api/users/{userId}

```

DELETE
http://localhost:3000/api/users/21aa4cc0-dccd-4857-9d86-915225ca5223

```

To start the server

```

npm run start:dev
npm run start:prod

```

To run the tests

```

npm run test

```


