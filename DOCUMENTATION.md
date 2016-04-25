## Documentation

You can see below the API reference of this module.

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

