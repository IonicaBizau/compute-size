"use strict";

const ul = require("ul")
    , percent = require("percent-value")
    , isPercent = require("is-percent")
    ;

// computeSize({
//    width: "10%"
// }, {
//    width: 400
//  , height: 200
// });
function computeSize(wantedSize, realSize, options) {

    options = ul.deepMerge(options, {
        screen_size: {
            width: process.stdout.columns || 239
          , height: process.stdout.rows || 60
        }
      , pxSize: {
            width: 1
          , height: 1
        }
      , preserve_aspect_ratio: true
    });

    // [width, height]
    let computedSize = [wantedSize.width, wantedSize.height];

    // 400 .... 400
    // x  .... 50
    // x = 80 * 50 / 200
    //
    // 10 ..... 50
    // x  ..... 400
    //
    // x = 10 * 400 / 50

    if (isPercent(wantedSize.width)) {
        computedSize[0] = percent(wantedSize.width).from(options.screen_size.width);
    }

    if (isPercent(wantedSize.height)) {
        computedSize[1] = percent(wantedSize.height).from(options.screen_size.height);
    }

    let setPxSize = (input)  => {
            return [
                input[0] * options.pxSize.width
              , input[1] * options.pxSize.height
            ];
        }
      , ratio = realSize.height / realSize.width
      , wasNaN = false
      ;

    if (isNaN(computedSize[0])) {
        computedSize[0] = computedSize[1] /  realSize.height * options.screen_size.width;
        wasNaN = true;
    }

    let prepared = setPxSize(computedSize);

    if (options.preserve_aspect_ratio) {

        //hr    hc
        //-- =  --
        //wr    wc
        //hc = hr * wc / wr

        if (!wasNaN) {
            prepared[1] = ratio * prepared[0];
        }

        if (prepared[1] > options.screen_size.height) {
            prepared = setPxSize(computedSize);
            prepared[0] = ratio * prepared[1];
            if (prepared[0] > options.screen_size.width) {
                prepared = setPxSize(computedSize);
            }
        } else if (prepared[0] > options.screen_size.width) {
            // 10 ..... 50
            // x  ..... 400
            // x = 800 * 50 / 10
            let before = ul.clone(prepared);
            prepared = setPxSize(computedSize);
            prepared[0] =  realSize.width * before[1] / realSize.height;
            if (prepared[0] > options.screen_size.width) {
                prepared = setPxSize(computedSize);
            }
        }
    }

    return setPxSize(prepared);
}

module.exports = computeSize;
