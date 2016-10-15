WDA a2 part B
============================================
A Node.js project with Express.js, MongoDB, Jade, and a bunch of other modules.

The project itself is a movie blogs website with the ability for guests and registered users to add comments to blog posts. Movies are obtained from the TMDB API.

How do I get started with this shiz?
------------------------------------
1. Pull down the project
2. Run: `npm update`
3. Create a `.env` file in your project dir
4. Copy everything from .env.example to your new .env
5. The only lines you need to change are: TMDB_API_KEY, DB_HOST, DB_PORT, DB_NAME
6. You can get the api key from part a in your .env
7. Create a database in robomongo call it something and then put that something in DB_NAME
8. Default port is 27017 and default host is 127.0.0.1 unless you change them or are using Mongolab

Contributors
--------------------------------
* Ben
* Ian (the mightiest noob)
* Nancy
* Ivan
* Anthony (the biggest noob), Plox 

Plugins
--------------------------------
* [notifyjs](https://notifyjs.com)
* [express-validator](https://github.com/ctavan/express-validator)
* [express-session](https://github.com/expressjs/session)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [nodemon](https://github.com/remy/nodemon)
* [mongoose](http://mongoosejs.com/)