const computeSize = require("../lib");

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
