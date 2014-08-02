threegen
========

##Description
Three.js game engine. Stay tuned!

* [Engine source code](https://github.com/codenameyau/threegen/tree/master/app/assets/js/lib/engine)
* [Game Demo source code](https://github.com/codenameyau/threegen/tree/master/app/assets/js/game)
* [Documentation (Coming Soon)](https://github.com/codenameyau/threegen/wiki)
* [ThreeGen Architecture](https://github.com/codenameyau/threegen/wiki/Architecture)


##Structuring Your Game
By default, your game components are designed as modules using Browserify.
You will need to install node.js as well as globally installing Browserify
and Watchify. Here is a [simple tutorial](http://engineering.yp.com/post/browserify) to get started.

The included [Boilerplate Game Demo](https://github.com/codenameyau/threegen/tree/master/app/assets/js/game)
is one possible way to structure your game.

#####Bundling your game into one file:

```bash
cd app/assets/js/game/
browserify main.js -o game.js
```

#####Bundling all changes automatically:

Install watchify: `npm install -g watchify`

Then run: `watchify main.js -o game.js`


###Deploying Your Game with ThreeGen

Before deploying, you can follow these steps to minify and concat your CSS and JS files.

1. Run `npm install`, which will locally download the node packages found in `package.json`.
2. Next run `gulp`, which will minify and concat your files into a `dist/` folder.

See `gulpfile.js` for more details.


##Learning Resources

####Books
* [Jason Gregory - Game Engine Architecture (Jun 2009)](http://www.gameenginebook.com/index.html)
* [Christer Ericson - Real-time Collision Detection (Dec 2004)](http://realtimecollisiondetection.net/)
* [Ian Millington - Game Physics Engine Development (Jul 2010)](http://procyclone.com/)
* [Jim Hefferon - Linear Algebra (Free Text)](http://joshua.smcvt.edu/linearalgebra/)

####Topics
* [Udacity - Interactive 3D Graphics](https://www.udacity.com/course/cs291)
* [Wikipedia - Octree](https://en.wikipedia.org/wiki/Octree)
