---
title: What is a package.json file?
date: "2019-07-03T16:20:37.121Z"
template: "post"
draft: false
slug: "/posts/what-is-package.json/"
category: "JavaScript"
tags:
  - "Node.js"
  - "JavaScript"
  - "Explainer"
  - "Web Development"
description: "What's the difference between a package.json and package-lock.json file?"
---

`package.json` is a required file that contains information about your Node program. The smallest possible `package.json` file would look like this:

```js
{
  "name":"test-application",
  "version":"0.0.3"
}
```

Here is an annotated package file:
```js
{
  /* what is this application named?*/
  "name": "test-application",

  /* which version of the application is this?*/
  "version": "0.0.3",

  /* what does this thing do?*/
  "description": "An application that creates random multiple choice quizzes.",

  /* what is the main file necessary for this application to run?*/
  "main": "server.js",

  /* what commands will be able to run inside the command line for this application?*/
  "scripts": {

    /* what will run when I type "npm test" in the command line?*/
    "test": "echo \"Error: no test specified\" && exit 1",
    /* what will run when I type "npm start" in the command line? */
    "start":  "node server.js"
  },
  /* where can someone else find the code for this project?*/
  "repository": {
    /* e.g. git, bitbucket, etc. */ 
    "type": "git",
    "url":"https://www.github.com/username/repo-name"
  },
  "keywords": [
     /* an array of strings */
    /* used when/if you upload this package to npm */
    "quiz", "test", "mc", "scantron"
  ],
  "author": /* your name */,
  "license": /* license under which you release this code */, 
  "bugs": {
    "url":  /* where to report bugs; probably an issues tab on your repo */
    "https://www.github.com/username/repo-name/issues"
  },
  "homepage": /* www.yourapp.com */,
  "dependencies": {
    /* which dependencies does this application need to run in production? */
  },
  "devDependencies": {
    /* which dependencies does this application need to run in development? */
  }
}
```

`dependencies` and `devDependencies` can be installed via the command line using the `npm install --save <package-name> ` and `npm install --save-dev <package-name>` respectively.
  > You can see your dependencies in your `node_modules` folder. 
  > Bear in mind that your dependencies have dependencies so your `node_modules` folder will contain packages you did not explicitly `npm install`.

`scripts` are executable in the command line (e.g. `npm start`, `npm run build`, `firebase deploy`) and serve a specific purpose. 

`license` is often [MIT](https://spdx.org/licenses/MIT.html), [GPL-3.0-or-later](https://spdx.org/licenses/GPL-3.0-or-later.html), or [ISC](https://spdx.org/licenses/ISC.html). 

## Example `package.json` files
I find the easiest way to get a sense of what is and is not allowed is to see other peoples' files. 

This is a handful I got by [searching the npm registry](https://www.npmjs.com/search?q=pudding) and navigating to each package's homepage.

* <https://github.com/code-dot-org/dance-party/blob/master/package.json>
* <https://github.com/firebase/firebase-tools/blob/master/package.json>
* <https://github.com/ashleygwilliams/robokitty-pkg/blob/master/package.json>
* <https://github.com/dnaf/keh/blob/master/package.json>
* <https://github.com/okize/hubot-chicken-dance/blob/master/package.json>

## Resources
* The basics of `package.json` [here](https://nodesource.com/blog/the-basics-of-package-json-in-node-js-and-npm/).
* [npm docs on --save and --save-dev flags](https://docs.npmjs.com/creating-a-package-json-file#the-save-and-save-dev-install-flags).
* [npm docs on every property in package.json](https://docs.npmjs.com/files/package.json.html)
* A list of possible [licenses](https://spdx.org/licenses/) and their complete text.

## How does `package.json` differ from `package-lock.json`?
You can write a `package.json` file from scratch, though you may also copy paste and modify an old one or [use `npm init` to build your own](https://docs.npmjs.com/creating-a-package-json-file#creating-a-default-packagejson-file). You'll never write a `package-lock.json` file from scratch. `package-lock.json` files are automatically generated when something in your `package.json` file changes (e.g. if you add another dependency).

Modules and packages are bits of code that other people write and make available to you. When you `npm install` something, you are usually getting the most current version of that thing. However, the most current version of that thing _might_ contain changes that mess with your application or your other dependencies. `package-lock.json` is a file that lists exactly which versions of everything you are using. Then, it is used by anyone else trying to share your code to download _exactly the same_ versions of everything that you have.

* [npm docs on `package-lock.json`](https://docs.npmjs.com/files/package-lock.json)