# budgeting-app-api
[![BadgeNodeJS](https://img.shields.io/badge/MADE%20WITH-NODEJS-brightgreen?style=for-the-badge&logo=Node.js)](https://shields.io/) [![BadgeExpress](https://img.shields.io/badge/USES-EXPRESS-red?style=for-the-badge)](https://shields.io/) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

### :dvd: Installation
#### 1. Getting Started

``` sh
# Clone this repo to your local machine using
git clone https://github.com/MazenOth/budgeting-app-api

# Get into the directory
cd budgeting-app-api

# Make it your own
rm -rf .git && git init
```

#### 2. Setting up JWT Private Key
```sh
# On command line or treminal paste this line
set budgeting_jwtPrivateKey=mySecureKey

```

#### 3. Setup MongoDB database


In db.js in the startup package, you can insert your local Mongodb server.
``` sh
module.exports = function () {
  mongoose
    .connect("mongodb://127.0.0.1:27017/budgeting-app-api")
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error("Connection failed..."));
};
```


#### 4. Setting up node js

``` sh
# Install dependencies
npm install

# Run the server locally with nodemon
nodemon

```

### :man_astronaut: (Optional) Testing using Postman
You can test the endpoints using Postman!

Enjoy :)



