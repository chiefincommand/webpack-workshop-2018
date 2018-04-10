## Webpack 2018:

the instructor: @thelarkinn

## History

problem:
too many script tags
browsers have max num scripts they download simalteanously

scope
size
readability
fragility
monolith files

what's the solution?

IIFE'S
Revealing module pattern -> result of IIFE's function


Read Javascript Design patterns by Addy Osmani

Using IIFE's we can "safely" combile files without concern of scope collision

That's what grunt, gulp help us do

Problems with this methodology:
Full rebuilds everytime!

* Have to concatenate everything everytime even if one line changes
* dead code: concat doesn't help tie usages across files

+ Lots of IIFE's are sloooooow. It causes the browser to do eager evaluation to parse and evaulate it. They call it scope poisining or collapsing

Doesn't perform any Dynamic loading.
Cannot lazy load anything


Came the birth of javascript node modules with NodeJS & commonJS (modules 1.0)

Example NodeJS:

const path = require("path")
const {add, subscract} = require("./math");
const lodash = require("loadash"); if there is no ./ it will look for it in node_modules and it's going to read package.js and will look
for property main for a function to execuate
but for math that has ./ if looks for math.json first and looks for math.js in it, if not looks for math/index.js

root dir:
--index.js
--node_modules
---lodash

static analysis

npm + node + modules => mass distribution

The beginning of module system
They were all using module system

Problems:
* No browser support: people started shipping browser code as node modules
* No live bindings in common.js, cannot handle cicular references and cuase a lot of problems
* sysnc module resolution and loaders were slow

it was slow to write node modules


came Bundlers/linkers:
browserify(static)
requireJS(loader)
systemJS(loader)


No relative paths in url, needed a system to translate relative paths to abosluate paths at runtime, so came requireJS

No static async/lazing loading (no way to do code splitting). All bundles are built up front
CommonKS bloat too dynamic

example:

var array = [0,1,2,3];
array.forEach(n => require(n+ 'file')

Not everyone was shipping commonJS

AMD 

define('myAwesomeLib', ['lodash', 'someDep'], function(_, someDep) => {

});

AMD + CommonJS

define((require, exports, modules) => {

});

Problem too dynamic of lazy loading (momentJS) you end up with a lot of locales even if you don't need it

Awkward now:

Standard syntax (no real module system)

Solution:

ESM

import {uniq} from 'lodash-es'
import * as utils from 'utils';

the specification was 10 years in the making

export const uniqConst = uniq([1,2,3,4,5]); 


static analysis: the ability the fully understand your code, what files dependencies on other files
dynamic anaylytics: runtime analysis/ condition analysis of dependencies 

Example of dynamic anaylitcs
const utils = require('utils') => lazy evaluation
const util = require('ut' + 'ils') =< dynamic

ESM

The browser has to evaluate everything upfront before it can run, so it's extremely slow without the help of NodeJS

Why Javascript modules?
reusable
encapsulated
organized
convinient

problems:
ESM for Node? No specification yet

ESM for browser is veerrrry slow

NPM is the most active code repository



Webpack is a module bundler

* What is module bundler? let's you write any module format(mixed!), compiles them for _the browser_
* Supports static async bundling
* Rich, vast, ecosystem: the most performant way to ship javascript today

Webpack- how to use it?

config:

webpack.config.js Yes it's a module too!!!
```javascript
module.exports = {
    entry: {
        vendor: './src/vendor.ts',
        main: './src/main.browser.ts'
    },
    output: {
        path: 'dist/',
        filename: '[name].bundle.js'
    }
}
```


You can use webpack cli

has Node API
```javascript
const webpack = require("webpack");
```
What's the downside of webpack:

on a cold build for a large project the build time is larger than linear complexity
but we can use dependency graph and watch techniques to improve


Chapter 2:

##  The core concept:

### Entry
 We have some sort of file that kicks of the application but usually requires dependencies
 
 bootstraps.js -> app.components.js -> external.lib.js -> external.lib.dep.js -> css
                                       
The first file you load kicks off the application and we pass that file to webpack and looks for depenencies
example:

import {Component} from 'app.components.js'

Tells webpack *what* to load 


### Output

./dist/ -> bundle.js

module.exports = {
    output: {
        path: '',
        
    }
}

tells webpack where and how to distribute bundles, works with entry

### Loaders and tools

Tells webpack how to interpret and translate files. transformed on a per-file basis before adding to the dependency graph.



Loaders are also javascript modules(functions) that takes the source file and returns it in a [modified] state
```javascript

module: {
    rules: {
        {test: /\.ts$/, use : 'ts-loader'},
        {test: /\.css$/, use : 'css-loader'},
        {test: /\.less$/, use: ['styles', 'css', 'less']}
    }
}
```

test a regular expression that instructs the compiler which files to run the loader against
use an array/string/function that tells 
enforce 


in the case of less, it will first pass it to less-loader and then css-loader followed by style-loader
it follows the rules top to bottom and left to right to read the metadata and then executes right to left

```javascript
style(css(less(src))) //function call
````

Loaders thll webpack how to interprete and translate and pass them to webpack

### Plugins

Adds additional functionality compilation(optimized bundled modules) mode powerful w/ more access to compilerAPI. 
Does everything else you'd ever want to in webpack.

Objects(with an 'apply' property)

Allow you to hook into the entire compilation lifecycle
webpack has a verity of built in plugin

a plugin is an es5 'class' which implements an apply function

the compiler uses it to emit events

How to use a plugins

require() plugin from node_modules into config.

add new instance of plugin to plugins key in config object

80% of webpack ecosystem is plugins

## Chapter 3

Th generated code wraps the code in IIFE's



Look at https://webpack.js.org/configuration/ for details of the configuration

npm install webpack-dev-server html-webpack-plugin --save-dev


"dev": "npm run webpack -- --env.mode development --watch",

env.mode is just creating an env variable  called mode and we can pass it a value development

then:

module.exports = (env) => {
    Object.assign({mode: env.mode}, commonConfig);
};


 
use istanbul to deal with unit test sourcemap ?!


# Day 2

Top 3 web page load time causes

* Amount of javascript for initial download (Most important)
* Amount of css fo initial download
* Amount fo network requests on initial download

Stats:
Average website takes 19 s to load
only 44% of the code is actually used 

Google the need for mobile speed: **view the pdf**
https://storage.googleapis.com/doubleclick-prod/documents/The_Need_for_Mobile_Speed_-_FINAL.pdf

53% of visitors abandoned if a mobile site takes more than 3 seconds

The most expensive process for browser engine is the css engine (formatter)

Check out windows blog css formatter
https://blogs.windows.com/msedgedev/2017/04/19/modernizing-dom-tree-microsoft-edge/


**<=200kb (uncompressed) initial javascript [total]**

**<=100kb (uncompressed) initia css [total]**
 
**HTTP: <= 6 initial network calls**

**HTTP2: <= 20 initial network calls**

**90% code coverage (only 10% code unused)**


Coverage profiling Linked in
They ship 12.6 MB of scripts but not using 10.1 MB

do the same thing for mutualofomaha.com

742 KB and 334 KB are not used

To enable coverage in the search Ctrl P then type > coverage and hit show 

## Code splitting

https://webpack.github.org/


GWT pioneered code splitting


GWT.runAync(new RunAsyncCallback() {
})


Process of splitting pieces of your code into async chunks **[at build time]**

### How does it work?

### why should I care?

The average of web is mobile



Two types of code splitting

* Static 
 ** when do you use it? 
    *** "Heavy" Javascript, 
    *** anything temporal anything that's not visible until user scrolls 
    
``` javascript    
    import Listenr from './listene.js';
    
    //has to be dynamic import syntax from webpack, it's caled a dynamic import but it's static code splitting
    const getModal = () => import ('./src/modal.js'); //always returns  promise
    
    Listener.on('didSomethingToWrannetModalBeingLoaded', () => {
            //async fetching modal code from a separate chunk
            getModel().then((module) => {
                const modalTarget = document.getElementById('Modal');
                module.initModal(modalTarget);
            });
    });
```    

Don't use Split-chunks-plugin! it's built into webpack 4.

* Dynamic
``` javascript

const getTheme = (themeName) => import(`./src/theme/${themeName}`);

```    
if it's a partial path and some expression : Hey webpack! find me all modules in this partial path

When is it good for:

* A/B testing
* Theming

Context Module!! ^^


https://www.udacity.com/course/offline-web-applications--ud899



You shouldn't code split within your libraries (such as jssdk). Only do it in the app/components


Vue has dynamic loading built in, you can lazy load any component
and the framework will handle the lazy fetching when the component is needed



Perf scenario 

HTTP/2

https://medium.com/webpack/webpack-http-2-7083ec3f3ce6

AggressiveSplittingPlugin
Offline plugin: const OfflinePlugin = require('offline-plugin');



WorkBox is a warpper for ServiceWorkers that simplifies the interface



How do you enforce file size :

use performance:

```
    performance: {
        hints: 'error',
        maxEntrypointSize: 10,
        assetFilter: (fileName) => fileName.endsWith('.js') || fileName.endsWith('.css') || fileName.endsWith('.png')
    }
```


 Let's play bundle analyzer
 
 
https://medium.com/webpack/webpack-bits-getting-the-most-out-of-the-commonschunkplugin-ab389e5f318


#Plugins

What is tapable?

~ 200 line plugin library

 
Tapable instance

* Compiler is the top level tapable instance
* Resolver
* Module Factories
* Parser
* Template data binding for your modules


 
 Go to Youtube and search for "everything is a plugin" 
 https://github.com/thelarkinn/everything-is-a-plugin




















