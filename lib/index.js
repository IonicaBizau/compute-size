"use strict";

const ul = require("ul")
    , fixedOrPercent = require("fixed-or-percent")
    , mapo = require("map-o")
    ;

function computeSize(wantedSize, realSize, options) {

    wantedSize = ul.merge(wantedSize, {
        width: -1
      , height: -1
    });

    options = ul.deepMerge(options, {
        screen_size: {
            width: process.stdout.columns || 239
          , height: process.stdout.rows || 60
        }
      , px_size: {
            width: 1
          , height: 1
        }
      , preserve_aspect_ratio: true
      , autoresize: true
    });

    let resultObj = {
        width: fixedOrPercent(wantedSize.width, options.screen_size.width)
      , height: fixedOrPercent(wantedSize.height, options.screen_size.height)
    };

    if (!~resultObj.width && !~resultObj.height) {
        throw new Error("Invalid input size.");
    }

    // Keep the aspect ratio
    if (options.preserve_aspect_ratio) {
        if (!~resultObj.width) {
            resultObj.width = realSize.width * resultObj.height / realSize.height;
        } else if (!~resultObj.height || resultObj.height / options.px_size.height > options.screen_size || resultObj.height / resultObj.width !== realSize.height / realSize.width) {
            resultObj.height = realSize.height * resultObj.width / realSize.width;
        }
    }

    let checkScreenSize = () => {
        if (resultObj.width / options.px_size.width > options.screen_size.width) {
            resultObj.width = realSize.width * resultObj.height / realSize.height;
        } else if (resultObj.height / options.px_size.height > options.screen_size.height) {
            resultObj.height = realSize.height * realSize.width / realSize.width;
        }
    };


    mapo(resultObj, (v, k) => {
        return options.px_size[k] * v;
    });

    return resultObj;
}

module.exports = computeSize;
