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
    fontSize: 16
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
  fontSize: 16
});
```

### Properties
ambiguis({
  [initialDpr],
  [maximumDpr],
  [fontSize]
})

* initialDpr——the dpr will be set to the number you want
* maximumDpr——the dpr will never largest than the number you want
* fontSize——the body's default `font-size` will be set to the number you want

There is a global variable `ele` provides the basic information of the current page

## License
This content is released under the [MIT](This content is released under the MIT License.) License.
