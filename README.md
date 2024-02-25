# Prerequisites

## MongoDb

Run local mongodb instance at port 27017 (which is default).

Follow instructions to install MongoDB Community Edition:

- [MacOS](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#installing-mongodb-7.0-edition-edition)
- [Windows](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/#install-mongodb-community-edition)
- [Ubuntu](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/#install-mongodb-community-edition)

## Dependencies

Install dependencies

```shell
npm install
```

# Editor

Run applications, which are _main_ and _editor_ applications as frontend (nextJS) and _api_ as backend (nestJS)

```shell
npm run dev
```

At the first run, admin user and example content are created in mongoDB.

Go to `http://localhost:3042`. Login with `admin/admin`
