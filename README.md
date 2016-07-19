# AmbiguisJS
Simply configure the mobile terminal responsive page

## Build
Install modules
```bash
$ npm install
```
ES6 to ES5
```bash
$ gulp default
```
minify and uglify
```bash
$ gulp compress
```

## Usage
Import `<script></script>` to your page.`./src/ambiguis.js` just only support es2015, `./dist/*.js` support es5.
```JavaScript
<script src="./src/ambiguis.js" data-initial-dpr=1 data-font-size=16 data-maximum-dpr=3 id="ambiguis"></script>
```
### properties
If you want to set these properties, you should set `id='#ambiguis'`
* data-initial-dpr=number: Dpr will be set to `number`
* data-font-size=number: Body's default font-size will be set to `number * dpr`
* data-maximum-dpr=number: The largest dpr will be set to `number`
