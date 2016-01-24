const tester = require("tester")
    , computeSize = require("../lib")
    ;

tester.describe("compute-size", test => {
    test.should("handle aspect ratio for pixels", () => {
        test.expect(computeSize({
            width: 90
          , height: 90
        }, {
            width: 90
          , height: 100
        })).toEqual({
            width: 90
          , height: 100
        });
    });
    test.should("handle disabled aspect ratio for pixels", () => {
        test.expect(computeSize({
            width: 90
          , height: 90
        }, {
            width: 90
          , height: 100
        }, { preserve_aspect_ratio: false })).toEqual({
            width: 90
          , height: 90
        });
    });
    test.should("handle aspect ratio and pixel size", () => {
        test.expect(computeSize({
            width: 90
          , height: 90
        }, {
            width: 90
          , height: 100
        }, {
            px_size: {
                width: 2
              , height: 2
            }
        })).toEqual({
            width: 180
          , height: 200
        });
    });
    test.should("handle screen size and percent values (height)", () => {
        test.expect(computeSize({
            height: "10%"
        }, {
            width: 90
          , height: 100
        }, {
            screen_size: {
                width: 100
              , height: 200
            }
        })).toEqual({
            width: 18
          , height: 20
        });
    });
    test.should("handle screen size and percent values (width)", () => {
        test.expect(computeSize({
            width: "10%"
        }, {
            width: 90
          , height: 100
        }, {
            screen_size: {
                width: 90
              , height: 200
            }
        })).toEqual({
            width: 9
          , height: 10
        });
    });
});
