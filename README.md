threegen
========

Three.js game engine. Stay tuned!

* [Engine source code](https://github.com/codenameyau/threegen/tree/master/app/assets/js/lib/engine)
* [Game Demo source code](https://github.com/codenameyau/threegen/tree/master/app/assets/js/game)
* [Documentation (Coming Soon)](https://github.com/codenameyau/threegen/wiki)


##ThreeGen Architecture

####Core Engine
* [+] Engine startup
* [+] Clock system
* [+] Keyboard input
* [+] Clock pause and resume
* [+] Custom keybindings
* [+] Mouse input
* World model
* Loading screens
* Memory optimization
* Level loader
* Engine shutdown

####Rendering Engine
* [+] Three.js renderer
* [+] TargetCamera perspective
* [+] Lighting
* Keyframe animations
* Skinning animations
* Morphing animations

####Physics Engine
* [+] Gravity
* [+] Raycasting collision detection
* [+] Projectile physics
* Air Friction

####Player Entity
* [+] Player target cam
* [+] Player 'wasd' movement
* [+] Player jumping
* [+] Custom keybindings
* [+] Player collision detection
* [+] Player POV toggle

####Entities
* [+] Entity creation
* [+] Entity destruction
* [+] Entity health/stats
* [+] Entity movement
* Static and Dynamic Entities
* Wrapper for Object3D, Mesh, Model

####Resource Loader
* [+] Mesh texture
* [+] Preloader
* [+] Resource cache
* [+] Sound loader
* [+] Music loader
* Model loader

####Utilities
* [+] Debug floor grid
* [+] FPS/MS stats moniter
* Basic math functions
* Dot product tests
* Numerical solver

####Game
* [+] Game instructions HUD
* [+] Game pause
* Damage indicators
* Health HUD
* Pause menu
* Saving
* Loading
* AI support
* Documentation
* Three.js encapsulation

####Level
* World boundary
* Level editor

####Miscellaneous Tasks
* Script loader with Browserify
* Gulp task: `gulp build`
* Bower package



##Deployment and Build

Build coming soon as a gulp task.

Before deploying run `gulp`, which minifies and concats your CSS and JS files
and outputs them into a `dist/` folder. See `gulpfile.js` for more details.


##Learning Resources

####Books
* [Jason Gregory - Game Engine Architecture (Jun 2009)](http://www.gameenginebook.com/index.html)
* [Christer Ericson - Real-time Collision Detection (Dec 2004)](http://realtimecollisiondetection.net/)
* [Ian Millington - Game Physics Engine Development (Jul 2010)](http://procyclone.com/)
* [Jim Hefferon - Linear Algebra (Free Text)](http://joshua.smcvt.edu/linearalgebra/)

####Topics
* [Udacity - Interactive 3D Graphics](https://www.udacity.com/course/cs291)
* [Wikipedia - Octree](https://en.wikipedia.org/wiki/Octree)
