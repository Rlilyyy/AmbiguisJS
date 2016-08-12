# AmbiguisJS
Simply configure the mobile terminal responsive page

Thanks @amfe: [lib-flexible](https://github.com/amfe/lib-flexible)

## Build

Install modules
```bash
$ npm install
```
Transform ES6 to ES5
```bash
$ gulp default
```
Minify and Uglify
```bash
$ gulp compress
```

## Usage

### Use `<scipt></script>`
```javascript
<script src="./dist/ambiguis.js"></script>

<script type="text/javascript">
  ambiguis({
    initialDpr: 1,
    maximumDpr: 3,
    fontSize: 16,
    maxWidth: 517
  })
</script>
```

### Use `webpack`
```bash
$ npm install ambiguis --save
```

```javascript
require('ambiguis')({
  initialDpr: 1,
  maximumDpr: 3,
  fontSize: 16,
  maxWidth: 517
});
```

### Properties
ambiguis({
  [initialDpr],
  [maximumDpr],
  [fontSize],
  [maxWidth]
})

* initialDpr——The dpr will be set to the number you want.
* maximumDpr——The dpr will never largest than the number you want.
* fontSize——The body's default `font-size` will be set to the number you want.(Default: 12)
* maxWidth——When the `window.innerWidth` larger than this number, we use `maxWidth` instead of `window.innerWidth`.So the root font size will be limited.

There is a global variable `ele` provides the basic information of the current page

## License
This content is released under the [MIT](This content is released under the MIT License.) License.
