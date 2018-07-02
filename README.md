![poster](https://i.imgur.com/51ke1mo.png)

The website can be reached on [pony.aitai.nl](http://pony.aitai.nl)

## Contents of this project
* test - this folder contains all code that we used to test out different packages that could draw a diagram on the screen.
* express - an API that generates graphs. It requires the database.
* opdracht ... - school assignments
* ponypicnotpy - an angular app to show the diagrams
* scrapers - a scrapy project that has spiders for all major Dutch nieuwsarchives that still have a public archive with news from 2014.
* tools - these are a few python script to automate somethings.

## Team
* [Hilko Janssen](https://github.com/hilkojj)
* [Timo Strating](https://github.com/timostrating) 
* [and sometimes Chris Roscher](https://github.com/aitai)

## installation

The API - create a file named database-connection.json in the express folder. Server.js will show an example of how this file should look.

```Bash
cd ./express
npm install
node server
```

The website
```Bash
cd ./ponypicnotpy
npm install
npm install -g @angular/cli    # If you don't have angular installed already
ng serve
```
