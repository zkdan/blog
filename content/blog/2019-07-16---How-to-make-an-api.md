---
title: How to make a REST API
date: "2019-07-17T16:20:09.121Z"
template: "post"
draft: false
slug: "/posts/how-to-make-an-api/"
category: "JavaScript"
tags:
  - "Node.js"
  - "JavaScript"
  - "Code-along"
  - "Web Development"
  - "MongoDB"
  - "Heroku"
  - "API"
description: "Step-by-step instructions on how to make an API with Node.js, Express, Heroku, MongoDB, and a file of JSON data."
---

## What you will need
* A [Heroku account](https://id.heroku.com/login)
* The [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line)
* A [GitHub account](https://github.com/)
* [Node installed on your computer](https://nodejs.org/en/)
* Proficiency with your computer's terminal
* Proficiency with JavaScript
* Familiarity with HTTP methods
* A JSON file with some data in it 
  * If you don't have one, [you can use this one](https://raw.githubusercontent.com/zkdan/sharing/master/inventorySingleDocument.json).

## Glossary
**MongoDB**: a database-making tool that stores data in a format similar to JSON.
> Historically, databases have used a [relational structure](https://en.wikipedia.org/wiki/Relational_database). You use SQL (structured query language) to interact with these kinds of databases, not JavaScript.

**Node.js**: An environment for JavaScript that is not in a browser. Node runs on a server (initally on your own computer, then usually on some hosting company's servers). You can interact with Node through the terminal.  
> Anything you `console.log()` will show up in the terminal, not the browser console.

**Mongoose**: a(n object modelling) tool for dealing with MongoDB via Node.js. Mongoose offers a way to organize your MongoDB data and provides methods for dealing with said data. (Among other things.)

**Express**: a web application framework for Node, which basically means Express is a bunch of JavaScript code that someone else wrote that does stuff you often want to do in a web app.

**JSON** (JavaScript object notation): A pattern for organizing data that looks like a JavaScript object.

**GitHub**: A web application that hosts code files.

**Heroku**: A web application that hosts code files *and* can connect those files to a database. 
> Heroku is set up to run Node applications. You could set up your own host (e.g. on GoDaddy or something) to run Node if you wanted.

### MongoDB vocabulary
Anecdotally, it seems that 'mongo' is part of 'humongous' and merely means 'huge'. Big ol' database, in other words. MondoDB would be much chiller, IMHO.

**mongo shell**: a command line interface through which you are able to interact with your databases.

**databases** (`dbs`): a database is a collection of information. It can be structured in many different ways. We are going to define the structure of our database using Mongoose [schemata](https://www.merriam-webster.com/dictionary/schema) .

**collection**: a group of documents.

**document**: a piece of information. You can have a single document with lots of items inside a single collection in a database (e.g. a file called `inventory` that has many nested objects in it). Or a document for each item you want in the database (e.g. for each item in `inventory`).

#### MongoDB commands
These are common commands you will find useful if you're following along with this post.

Command | what it does
---|---|
`mongo`| starts up the mongo shell |
`use` | precedes the name of a database. If the named database does not exist, it is created.
`mongod` | makes your local databases available to you (e.g. runs Mongo locally)
`show dbs` | shows you the names of every database you've created so far.
`show collections` | shows you the collections you have in the database you are currently in. Kind of like `ls` from inside a directory.  
`db`| refers to the database you're currently using. Kind of like `./`
`db.getName()`| tells you the name of the database you're currently in.
`db.<your database name>.find()` | with no arguments, lists everything in the database. with an argument, it finds that thing 
`db.<your database name>.createCollection()` | I'll give you one guess | 
`db.<your database name>.count()` | counts the number of documents in the database
`db.<your database name>.insert()` | adds a document to a database |
`db.<your database name>.remove()` | removes a document from a database |
`db.dropDatabase()` | deletes a database completely (you must be `use`ing the database you wish to delete)
`crtl + C` or `cmd + C`| gets you out of the mongo shell

## Level 1: Setting up an API

1. Make a repo in GitHub (or wherever). 
1. Clone it locally.
1. Using the terminal, navigate to the locally cloned folder.
1. Create a `README` and a `.gitignore` that has `node_modules` in it.
1. `npm init` will walk you through creating a [`package.json`](https://www.zoecodes.com/posts/what-is-package.json/) file.
  > I made my main file `server.js`. You can make your `test : "echo \"Error: no test specified\" && exit 1"` or leave it blank.

1. `npm install express mongo-hacker --save`
    * `express` will help us work with our data by providing pre-written functions for common tasks.
    * `mongo-hacker` makes MongoDB look a bit more legible in the terminal.
> This should automatically generate a `package-lock.json` file.
1. `npm install nodemon --save-dev`
    * `nodemon` monitors your node application and hot refreshes.
1. Create a file that has the same name as whatever you put for `main` in your `package.json` and set up your constant variables.
  > For me, that's `server.js`.
```js
  // express for common application functions
  const express = require('express');
  // we create an app using express's express() function
  const app = express();
```

9. Then we're going to set up our `port` variable. When we make our API live, the port will be determined by where our API is hosted. Right now, we just get to pick a port.
  ```js
  const port = 3000;
  ```
1. Attach an Express method called `.get()` to the `app` variable we created. `.get()` is a method Express has provided for us. It takes two arguments: a path and a callback. This code says: when a request is successfully completed, return something in the form of JSON.

```js
  app.get('/', (req, res) => {
    res.json({ "message": "Yes! It's working!" });
  });
```
> [This blog post](https://www.keycdn.com/support/put-vs-post) explains the difference between PUT and POST.

11. How do we know if a request is being made? Same as in real life: we listen.

```js
app.listen(port, () => {
  console.log(`I'm here, I care, I'm listening on ${port}.`);
});
```
12. My `server.js` file looks like this right now:

```js
// express for common application functions
const express = require('express');

// create an app using Express's express() function
const app = express();

const port = 3000;

app.get('/', (req, res) => {
  res.json({ "message": "Yes! It's working!" });
});

app.listen(port, () => {
console.log(`I'm here, I care, I'm listening on ${port}.`);
});
```
> This way of writing import (e.g. `require()`) is CommonJS.

13. In your terminal, type `nodemon` to run `server.js` _and_ hot refresh.
1. You should see `I'm here, I care, I'm listening.` in the terminal and be able to go to `localhost:3000` and see `Yes! It's working!`

> The terminal acts like the console for Node programs, remember?


#### 🎉 BOOM IT WORKED YOU DID IT YOU MADE AN API🎉

## Level 2: Deploying this API with Heroku
1. Go to [Heroku](https://www.heroku.com/) and log in.
1. Click 'New' in the top right corner and choose 'Create new app'. 
1. Name it something.
  > Mine is called `clothing-store-api`
1. Type `heroku login` in the terminal and follow the prompts.
1. Because the folder we're in already has initialized Git, type `heroku git:remote -a <your repo name>` in the terminal.
  > Mine will be `heroku git:remote -a clothing-store-api` because my GitHub repo is called `clothing-store-api`
1. `git push origin master` to add the most up-to-date `server.js` file. 
1. `git push heroku master` to tell Heroku to use these files to do its magic.*
1. Once that's done, you should be able to go to `https://your-app-name.herokuapp.com` and see `{"message":"Yes! It's working!"}`.

*(It's not magic, it's just someone else's code).

#### 🎉 BOOM IT WORKED YOU DID IT YOU MADE A LIVE API🎉

## Level 3: Creating a database with mLab
mLab is a [cloud database service that hosts MongoDB databases](https://en.wikipedia.org/wiki/MLab). 

1. In Heroku, go to the 'Resources' tab.
1. Go to the 'Add-ons' search bar and type `mLab`.
1. Choose the free 'Sandbox' option.
1. Hit 'Provision'.
1. Click on the go to icon next to mLab.
> This will open up an interface for that specific Heroku project.

### Configuring mLab
1. Go to the 'Users' tab and add a user.
  > My username is `Boggly` and my password is `6weather6`.

### Accessing your mLab database from your terminal
1. Go back to your terminal.
1. Using the username and password you just created, copy-paste the line under 'To connect using the mongo shell' on your database's mLab homepage.
  > Mine would be something like `mongo ds247378.mlab.com:47307/heroku_57q5z6s -u Boggly -p 6weather6`
1. Congrats! You're connected to the mongo shell and can interact with that database.

### Adding real data
We need to create a [collection](https://www.zoecodes.com/posts/how-to-make-an-api/#mongodb-vocabulary) and some [documents](https://www.zoecodes.com/posts/how-to-make-an-api/#mongodb-vocabulary). The commands we'll be using are all in [the Mongo docs](https://docs.mongodb.com/manual/reference/command/).

> If you have trouble with permissions, I found [this thread](https://stackoverflow.com/questions/42446931/mongodb-exception-in-initandlisten-20-attempted-to-create-a-lock-file-on-a-rea) to be helpful.

1. You're already [in your mLab database](https://wwww.zoecodes.com/posts/how-to-make-an-api/#accessing-your-mlab-database-from-your-terminal) via your terminal, so we're going to add a collection called `inventory`: `db.createCollection('inventory')`.
1. Verify that it worked using `show collections`.
1. Add a piece of information (i.e. a document) to that collection using the `.insert()` method.
  I used:
  ```bash 
  db.inventory.insert("shorts": {
     "style":"running",
     "sizes":["S", "M", "L", "XL", "XXL"],
     "price": 33,
     "currency":"CAD",
     "colors":["green", "lavender"]
    });
  ```
1. Verify that it worked using `db.inventory.find()`.
1. Remove with `db.remove({"shorts.price:{ $eq:33 }"})`.
  * [More ways to query items](https://docs.mongodb.com/manual/reference/operator/query/) are in the MongoDB docs.

You can see how if you have a lot of data, this will get tedious.

Luckily, we've got options.

### `mongoimport`
You can use the `mongoimport` command to import a JSON file to a node in your database.

> If you don't have one, you can use [this one](https://raw.githubusercontent.com/zkdan/sharing/master/inventorySingleDocument.json).

1. Get out of the mongo shell: `ctrl + C` / `cmd + C`.
1. In your regular terminal, use the `mongoimport` command along with your host name, database name, username and password. Mine was:
  ```bash
  mongoimport --host ds247378.mlab.com:47307 --db heroku_57q5z6s --username Boggly --password 6weather6 inventorySingleDocument.json
  ```

A JSON file that looks like this:
```json
// inventorySingleDocument.json
{ "inventory": {
    "tShirt": {
      "style":"Palm tree logo",
      "sizes":["S", "M", "L", "XL", "XXL"],
      "price": 18.50,
      "currency":"CAD",
      "colors":["green"]
    },
    "capriPants":{
      "style":"geometric pattern",
      "sizes":["S", "M", "L", "XL", "XXL"],
      "price": 38,
      "currency":"CAD",
      "colors":["pink", "black", "white"]
    },
    "hat": {
      "style":"knit beanie",
      "sizes":["one size"],
      "price": 14.50,
      "currency":"CAD",
      "colors":["orange", "black", "white"]
    },
    "jacket": {
      "style":"duffel",
      "sizes":["S", "M", "L", "XL", "XXL"],
      "price": 140,
      "currency":"CAD",
      "colors":["red", "black", "purple", "blue"]
    }
  }
}
```

Will beget a database that looks like this:

```json
// DATABASE
{
  "_id": {
      "$oid": "5d1faa2baacd63290ffc1"
  },
  "inventory": {
    "tShirt": {
      "style":"Palm tree logo",
      "sizes":["S", "M", "L", "XL", "XXL"],
      "price": 18.50,
      "currency":"CAD",
      "colors":["green"]
    },
    "capriPants":{
      "style":"geometric pattern",
      "sizes":["S", "M", "L", "XL", "XXL"],
      "price": 38,
      "currency":"CAD",
      "colors":["pink", "black", "white"]
    },
    "hat": {
      "style":"knit beanie",
      "sizes":["one size"],
      "price": 14.50,
      "currency":"CAD",
      "colors":["orange", "black", "white"]
    },
    "jacket": {
      "style":"duffel",
      "sizes":["S", "M", "L", "XL", "XXL"],
      "price": 140,
      "currency":"CAD",
      "colors":["red", "black", "purple", "blue"]
    }
  }
}
```

#### `mongoimport` options
If you want to change the name of the collection to be something other than the file name (e.g. `storeOneInventory`), add the collection flag before the document: 
  ```bash 
  --collection storeOneInventory inventorySingleDocument.json
  ``` 

You can verify that it worked by [getting back into the mongo shell](https://www.zoecodes.com/posts/how-to-make-an-api/#accessing-your-mlab-database-from-your-terminal) and seeing what documents you have (`db.storeOneInventory.find()`).

If you wanted each item (i.e. `capriPants`, `hat`, `shorts`, etc.) to be its own document, you would need to use the `--jsonArray` flag and refactor the data to be an array of objects. If you don't have one, you can [use this one](https://raw.githubusercontent.com/zkdan/sharing/master/inventoryArray.json).

```bash
mongoimport --host ds247378.mlab.com:47307 --db heroku_57q5z6s --username Boggly --password 6weather6 --jsonArray --collection storeTwo inventoryArray.json
```

[To remove collections](https://docs.mongodb.com/manual/reference/method/db.collection.drop/index.html), use `db.<collection name>.drop()`.

Importing each object as a document is a good idea if you want those unique IDs.

> As a first troubleshooting step, [validate your JSON](https://jsonformatter.curiousconcept.com/).

More on optional flags and how to import CSVs or other data files in the [Mongo docs](https://docs.mongodb.com/manual/reference/program/mongoexport/#cmdoption-mongoexport-authenticationdatabase).

### mLab
You can also create collections and upload documents straight into the mLab GUI. Click the 'Collections' tab and 'Add collection' button on the top right to create a collection. Click into that cell on the table to upload a document.

#### 🎉 BOOM IT WORKED YOU DID IT YOU MADE A DATABASE 🎉

## Level 4: Making endpoints
Right now, the URL for our deployed API is giving us a message we wrote in the `server.js` file. How do we make it so we get see our data instead? How do we make multiple endpoints for different sets of data?

### Using Express to create routes

We've got to set up our **routes**! Routes correspond to the endpoints you'd like users of your API to be able to hit. 

To add a router to the `server.js` file, we can use Express' `Router()` method:
```js
// express for common application functions
const express = require('express');

// create an app using Express's express() function
const app = express();

// create a router using Express's Router() function
const router = express.Router();

const port = 3000;

app.get('/', (req, res) => {
  res.json({ "message": "Yes! It's working!" });
});

app.listen(port, () => {  
  console.log(`I'm here, I care, I'm listening on ${port}.`);
});
```

Then tell our file to use this router:
```js
app.use('/', router);
```

Then, we'll refactor our code using the router and add some other routes:
```js
router.route('/')
    .get((req,res) =>  {
      res.json({ "message": "Yes! It's working!" });
    });

router.route('/tShirts')
    .get((req,res) =>  {
      res.json({ "message": "This tShirts!" });
    });

router.route('/xl')
    .get((req,res) =>  {
      res.json({ "message": "This XL!" });
    });    
```

Our complete file looks like this:

```js
// express for common application functions
const express = require('express');

// create an app using Express's express() function
const app = express();

// we'll make a router using Express's Router() function
const router = express.Router();

const port = 3000;

router.route('/')
  .get((req, res) => {
    res.json({ "message": "Yes! It's working!" });
  });

router.route('/tShirts')
  .get((req, res) => {
    res.json({ "message": "This is tShirts!" });
  });

router.route('/xl')
  .get((req, res) => {
      res.json({ "message": "This XL!" });
  });

app.use('/', router);

// listen on port 3000
app.listen(port, () => {
  console.log(`I'm here, I care, I'm listening on ${port}.`);
});
```

So now, locally, when we run `nodemon` inside the folder that has this `server.js` file, we should be able to go to `localhost:3000/xl` and see `This is XL!`. 

How do we make it so our live endpoints correspond with the data in our database?

<!-- ## Connecting our local environment to our remote database
Until now we've been working with two sets of databases: one local and one remote (on Heroku's servers). It's very easy to get these confused. By default, the `mongo` command gets you access to your local databases. We are using the `--username`, `--password`, `--db`, and `--host` flags, to sign into a remote database.

Even if our local database and our remote one have the same name, they don't share information. 

```js
const dbURL = process.env.MONGODB_URI || 
``` -->

Mongoose, as mentioned previously, is a way to organize your data. In service of that goal, it offers you something called `Schema`. A `Schema` looks like this:
### Mongoose

```js
const mongoose = require('mongoose');
const ExampleSchema = new mongoose.Schema({
    firstKey: Array,
    secondKey: String,
    thirdKey: Boolean
});
```

A `Schema` is a way of describing how you expect your data to look. Take this `ItemSchema`:

```js
const mongoose = require('mongoose');
const ItemSchema = new mongoose.Schema({
    style: String,
    sizes: Array,
    price: Number,
    currency: String,
    colors: Array
});
```

It's saying that I expect every document in my database to look like this: 
```json
{
  "style":"capri pants",
  "sizes": ["S","M"],
  "price":18.5,
  "currency":"CAD",
  "colors":["white"]
}
```

You can write your [schemata](https://www.merriam-webster.com/dictionary/schema) straight in your `server.js` file, but a more organized way to do it is to create a `models` folder and export the schemata from their own files:

```js
// models/item.js
const mongoose = require('mongoose');
const ItemSchema = new mongoose.Schema({
    style: String,
    sizes: Array,
    price: Number,
    currency: String,
    colors: Array
});

module.exports = mongoose.model('Item', ItemSchema);
```

Then import the schema into the `server.js` file to be able to use it when querying the database.

```js
// express for common application functions
const express = require('express');

// create an app using Express's express() function
const app = express();

// we'll make a router using Express's Router() function
const router = express.Router();

const port = 3000;

const Item = require('./models/item.js');

router.route('/')
  .get((req, res) => {
    res.json({ "message": "Yes! It's working!" });
  });

router.route('/tShirts')
  .get((req, res) => {
    res.json({ "message": "This is tShirts!" });
  });

router.route('/xl')
  .get((req, res) => {
      res.json({ "message": "This XL!" });
  });

app.use('/', router);

// listen on port 3000
app.listen(port, () => {
  console.log(`I'm here, I care, I'm listening on ${port}.`);
});
```

Our database and our code are not currently connected. Let's fix that. 
1. Go to the Heroku page for your project. 
1. Under 'Settings' you should see an option called 'Config Vars' and next to that, a button that says 'Reveal Config Vars'. 
1. Click on it!

In your `server.js` file, create a new variable to hold this information:
```js
const dbURL = `mongodb://heroku_j9d:pq1v1nfreslms6tps@ds2407.mlab.com:4607/heroku_j9d`
```

This is you telling your code where to find the database you'll be working with. 
  > If you're working with a local mongo datbase, this URL will be `mongodb://localhost/<name of the local database>`
To make sure we can always access our database, we're going to add one more thing to the `dbURL`:

```js
const dbURL = process.env.MONGODB_URI || `mongodb://heroku_j9d:pq1v1nfreslms6tps@ds2407.mlab.com:4607/heroku_j9d`
```

Here, we're saying "Use whatever is set as the `MONGODB_URI`, or this exact URL." Right now they're the same, but they could conceivably change. (Don't worry about that possibility too much.)

Now that we know which database we're using, let's connect Mongoose using `mongoose.connect()`:
```js
// express for common application functions
const express = require('express');

// create an app using Express's express() function
const app = express();

// we'll use mongoose to structure our queries and our data
const mongoose = require('mongoose');

// we'll make a router using Express's Router() function
const router = express.Router();

const port = 3000;
const dbURL = process.env.MONGODB_URI || `mongodb://heroku_j9d:pq1v1nfreslms6tps@ds2407.mlab.com:4607/heroku_j9d`

const Item = require('./models/item.js');

// tell mongoose which database to use
mongoose.connect(dbURL);

router.route('/')
  .get((req, res) => {
    res.json({ "message": "Yes! It's working!" });
  });

router.route('/tShirts')
  .get((req, res) => {
    res.json({ "message": "This is tShirts!" });
  });

router.route('/xl')
  .get((req, res) => {
      res.json({ "message": "This XL!" });
  });

app.use('/', router);

// listen on port 3000
app.listen(port, () => {
  console.log(`I'm here, I care, I'm listening on ${port}.`);
});
```

If you haven't added, committed, and pushed all your code to your version control system yet, now's a great time. After you `git push origin master`, you should also `git push heroku master` to see your latest changes deployed.

Now we're going to write the content of the routes. The plain `/` route should get every item in our inventory.

We're using `Item` as a guide for what the query is looking for. `find()` is a database method that returns everything that matches the query. Here, `.find()` takes two arguments: an object and a callback. When the object passed as the first argument is empty, the query returns everything in the database. 

Inside the callback, we are saying "If there is an error, send a response with the error message in it and let us know it's a client error (400). If not, let us know it's a good request (200) and give us back whatever matches the query."

```js
router.route('/')
  .get((req,res) => {
    // using the Item schema, find anything that matches it
    Item.find({}, (err, items) =>{
      // if there is an error
      if(err){
        res
        // the response's status should be 400
          .status(400)
        // and what we should get back from this function
          .send({
        // is an error message
            error:err
          });
          // then, stop running this code
        return;
      }
      // if there is no error
      res
      // the response's status should be 200
        .status(200)
      // and we should get back our data from this function
        .send(items);
    });
  });
```

To get any item whose style is `tShirt` and show it at the `/tShirt` route:
```js
router.route('/tShirt')
  .get((req,res) => {
    Item.find({"style":"tShirt"}, (err, items) =>{
      if(err){
        res
          .status(400)
          .send({
            error:err
          });
        return;
      }
      res
        .status(200)
        .send(items);
    });
  });
```

To get any item that comes in an XL and show it at the `/xl` route:
```js
router.route('/xl')
  .get((req,res) => {
    Item.find({"size":"xl"}, (err, items) =>{
      if(err){
        res
          .status(400)
          .send({
            error:err
          });
        return;
      }
      res
        .status(200)
        .send(items);
    });
  });

```

When the object passed to the `.find()` method has a key-value pair, the query is for `Item`s who have a matching pair. More ways to query are in [the Mongoose docs](https://mongoosejs.com/docs/api.html#model_Model.find).

#### CORS it up, baby
CORS stands for cross-origin resource sharing and means that the server doesn't think that the client is allowed to access this data its asking for.

The solution? Headers!

Headers are information that clients and servers use to talk about the request you're making. Unsurprisingly, Mongoose has you covered. [Add a header line](https://dzone.com/articles/cors-in-node) inside each of your routes:

```js
router.route('/xl')
  .get((req,res) => {
    // this is the new line!↓↓↓↓↓↓↓↓
    res.header("Access-Control-Allow-Origin", "*");
    // riiiight up here ^^^^^^
    Item.find({"size":"xl"}, (err, items) =>{
      if(err){
        res
          .status(400)
          .send({
            error:err
          });
        return;
      }
      res
        .status(200)
        .send(items);
    });
  });
```

#### 🎉 BOOM IT WORKED YOU DID IT YOU MADE AN API🎉

Hope this helped! If you have any q's, feel free to [ask](https://www.twitter.com/zoecodes). 