Twitter Bots with Node.js
=========================

Node basics
-----------

* You should have Node installed already. If you need to install it, or reinstall it, I highly recommend `NVM <https://github.com/creationix/nvm>`_ on Linux or OS X.
* Node was designed for building high-traffic network services. It also ended up being popular with the front-end web community, and a lot of tools are written in it. There's potential for it to be popular on the "Internet of Things" if you wanted something to haunt your nightmares.
* Unlike Python or PHP web frameworks, Node processes are long-running and persistent. Remember ``Ctrl-C`` will kill Node for you (the C stands for "cancel").

NPM
---

* NPM is a package manager for Node. They insist that it doesn't stand for Node Package Manager.
* Because of the way that Node packages are installed, we don't need virtualenv or rvm. You should .gitignore your node_modules directory, and save anything your application needs to the package.json file.
* Use ``npm init`` to create a package.json file, and ``npm install module --save`` to add something to it later.
* You can load NPM modules with ``require("module_name")``, which returns the exported values.

Continuation-passing style
--------------------------

* Most Node functions are "asynchronous," meaning that they don't immediately return a result. You'll also hear this referred to as "non-blocking." This is why it's so good at high-concurrency applications, and also why it's hard for many people to learn.
* Instead of returning a value immediately, you give the function a callback, and which will be called when the result is ready. The callback is always the last parameter of the function, and its first argument should always be an error object.
* When you get a result, it's important to pass errors up through the chain if they exist.

Connecting to Twitter
---------------------

* First, let's go get our access tokens. It's a good idea to put them in a .gitignored file, if you ever plan on open-sourcing your code.
* Next, we load the ``twitter`` module and create a client from those tokens.
* Twitter's REST API is used for discrete requests, such as getting a list of followers or posting a tweet.
* The Stream API is used for long-running requests, like real-time searches or watching a user's feed.
* Let's start by getting a list of our followers.
* Next, let's connect to the stream for those followers. Streams are a special Node type that will fire off events as values come in (they can also be piped around, which is nice).

Writing a module
----------------

* The Twitter API isn't super-complex, but we can abstract it a little bit by writing functions that wrap the API calls in easier-to-understand functions.
* Files can export values by setting ``module.exports``. See the included ``emojify`` module as an example. Exports can be any JS value: functions, objects, or primitives.
* To import a local file, require its relative path without the .js extension: ``var module = require("./module")``
* Let's write a tweets.js module that exports an object with API wrapper functions in it.

Extending this into a real bot
------------------------------

1. similar to this method, respond when the stream updates
2. run this script as a task every few hours (the @hotteststartups method)
3. respond to outside criteria, either from inside or outside Node

Closing tips
------------

* Beware the callback pyramid! Name your functions and chain them together in discrete steps, instead of building an eternal cone of tragedy.
* When writing async procedures, try to handle errors near the code that requested them. Don't let it spread into random callbacks.
* If you're going to write a lot of Node, learn how the ``async`` module works (or one of its alternatives). Managing asynchronicity is going to be your biggest challenge, so make it easier on yourself.
* When writing a larger application, think of how to package this up for integrating into the larger app. One good way to do it is to export a constructor for an interface object, and then dispatch events on it