"use strict";

const ul = require("ul")
    , fixedOrPercent = require("fixed-or-percent")
    , mapo = require("map-o")
    ;

/**
 * computeSize
 * Computes a wanted size based on the object, pixel and screen sizes.
 *
 * @name computeSize
 * @function
 * @param {Object} wantedSize An object containing the following fields:
 *
 *  - `width` (Number): The wanted width.
 *  - `height` (Number): The wanted height.
 *
 * @param {Object} realSize An object containing the following fields:
 *
 *  - `width` (Number): The existing object width (e.g. an image).
 *  - `height` (Number): The existing object height (e.g. an image).
 *
 * @param {Object} options An object containing the following fields:
 *
 *  - `screen_size` (Object): The screen size (defaults to terminal width and height):
 *   - `width` (Number): The screen width.
 *   - `height` (Number): The screen height.
 *  - `px_size` (Object): The pixel size.
 *   - `width` (default: `1`)
 *   - `height` (default: `1`)
 *  - `preserve_aspect_ratio` (Boolean): If `false`, the aspect ratio will not be preserved (default: `true`).
 *  - `fit_screen` (Boolean): If `false`, the result size will not fit to screen (default: `true`).
 *
 * @return {Object} The result size:
 *
 *  - `width` (Number): The computed width.
 *  - `height` (Number): The computed height.
 *
 */
module.exports = function computeSize(wantedSize, realSize, options) {

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
      , fit_screen: true
    });

    let resultObj = {
        width: fixedOrPercent(wantedSize.width, options.screen_size.width)
      , height: fixedOrPercent(wantedSize.height, options.screen_size.height)
    };

    if (!~resultObj.width && !~resultObj.height) {
        throw new Error("Invalid input size.");
    }

    let resizeByAspectRatio = () => {
        if (!~resultObj.width) {
            resultObj.width = realSize.width * resultObj.height / realSize.height;
        } else if (!~resultObj.height || resultObj.height / options.px_size.height > options.screen_size || resultObj.height / resultObj.width !== realSize.height / realSize.width) {
            resultObj.height = realSize.height * resultObj.width / realSize.width;
        }
    };

    // Keep the aspect ratio
    if (options.preserve_aspect_ratio) {
        resizeByAspectRatio();
    }

    let checkScreenSize = () => {
        let realWidth = resultObj.width / options.px_size.width
          , realHeight = resultObj.height / options.px_size.height
          , screenWidth = options.screen_size.width
          , screenHeight = options.screen_size.height
          ;

        if (realWidth > screenWidth && realHeight > screenHeight) {
            resultObj.height = screenHeight;
            resultObj.width = -1;
            resizeByAspectRatio();
        } else {
            if (realWidth > options.screen_size.width) {
                resultObj.width = screenWidth;
                resizeByAspectRatio();
            } else if (realHeight > options.screen_size.height) {
                resultObj.height = screenHeight;
                resizeByAspectRatio();
            }
        }
    };

    if (options.fit_screen) {
        checkScreenSize();
    }


    mapo(resultObj, (v, k) => {
        return options.px_size[k] * v;
    });

    return resultObj;
};
