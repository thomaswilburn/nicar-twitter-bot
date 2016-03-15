Building Twitter Bots in Node
=============================

.. image:: http://i.giphy.com/I7kkegrRyNrk4.gif

This repo contains notes, sample code, and reference links for the NICAR 2016 class on building Twitter bots with Node. You can clone this to get started in the class, but you don't have to. A final version of the code is available in the ``finished`` branch.

Requirements
------------

* A computer with Node installed, preferably the newest version.
* A syntax-highlighting text editor.
* A network connection for installing packages from NPM and talking to the APIs.

Class goals
-----------

In this class, we're going to create a simple bot that connects to the Twitter Stream APIs, watches for tweets with a specified search term, and replies to them with information based on the original tweet.

In addition to learning the specifics of the API, we'll also be talking about Node's runtime model, how to handle asynchronicity and callbacks, and methods for splitting a Node application into easily-managed modules.

(Rough) Class Outline
---------------------

* Running Node scripts
* Installing from NPM
* Continuation-passing style in Node APIs
* Connecting to Twitter (apps and auth)
* Making our own Twitter wrapper module
* Putting it all together

Helpful links
-------------

* `Twitter App access control panel <https://apps.twitter.com/>`_
* `REST API documentation <https://dev.twitter.com/rest/public>`_
* `Stream API documentation <https://dev.twitter.com/streaming/reference/post/statuses/filter>`_
* `Twitter client module on NPM <https://www.npmjs.com/package/twitter>`_
* `Sample app written for Seattle's May Day protests <https://github.com/seattletimes/mayday-twitter/blob/master/index.js>`_
* Fun bots for inspiration: `Appropriate Tributes <https://twitter.com/godtributes>`_, `Hottest Startups <https://twitter.com/hotteststartups>`_


