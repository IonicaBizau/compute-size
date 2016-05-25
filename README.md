
# compute-size

 [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![AMA](https://img.shields.io/badge/ask%20me-anything-1abc9c.svg)](https://github.com/IonicaBizau/ama) [![Version](https://img.shields.io/npm/v/compute-size.svg)](https://www.npmjs.com/package/compute-size) [![Downloads](https://img.shields.io/npm/dt/compute-size.svg)](https://www.npmjs.com/package/compute-size) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> Helper tool for resizing the things.

## :cloud: Installation

```sh
$ npm i --save compute-size
```


## :clipboard: Example



```js
const computeSize = require("compute-size");

console.log(computeSize({
    // Wanted size
    width: 10
    // 40% of the screen height
  , height: "40%"
}, {
    // Object width (e.g. an image)
    width: 10
    // ..and the height
  , height: 50
}, {
    screen_size: {
        width: 100
      , height: 200
    },
    preserve_aspect_ratio: false
}));
// { width: 10, height: 80 }

console.log(computeSize({
    // Wanted size
    width: 10
    // 40% of the screen height
  , height: "40%"
}, {
    // Object width (e.g. an image)
    width: 10
    // ..and the height
  , height: 50
}, {
    screen_size: {
        width: 100
      , height: 200
    }
}));
// { width: 10, height: 50 }

console.log(computeSize({
    // Wanted size
   height: "100%"
}, {
    width: 10
  , height: 50
}, {
    screen_size: {
        width: 100
      , height: 400
    }
}));
// { width: 80, height: 400 }
```

## :memo: Documentation


### `computeSize(wantedSize, realSize, options)`
Computes a wanted size based on the object, pixel and screen sizes.

#### Params
- **Object** `wantedSize`: An object containing the following fields:
 - `width` (Number): The wanted width.
 - `height` (Number): The wanted height.
- **Object** `realSize`: An object containing the following fields:
 - `width` (Number): The existing object width (e.g. an image).
 - `height` (Number): The existing object height (e.g. an image).
- **Object** `options`: An object containing the following fields:
 - `screen_size` (Object): The screen size (defaults to terminal width and height):
  - `width` (Number): The screen width.
  - `height` (Number): The screen height.
 - `px_size` (Object): The pixel size.
  - `width` (default: `1`)
  - `height` (default: `1`)
 - `preserve_aspect_ratio` (Boolean): If `false`, the aspect ratio will not be preserved (default: `true`).
 - `fit_screen` (Boolean): If `false`, the result size will not fit to screen (default: `true`).

#### Return
- **Object** The result size:
 - `width` (Number): The computed width.
 - `height` (Number): The computed height.



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## :dizzy: Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:


 - [`image-to-ascii`](https://github.com/IonicaBizau/image-to-ascii)—A Node.JS module that converts images to ASCII art.

## :scroll: License

[MIT][license] © [Ionică Bizău][website]

[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2016#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
