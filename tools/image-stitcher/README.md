# Image Stitcher Tool
This tool will stitch all images together in to a single file. All images that
are located in the subdirectory labelled `sources` will be selected for the
stitching. Image stitching can be configured in `index.js`.

## Notes
- Image stitching probably uses a lot of memory, you may need to give Node more
  heap space to get the job done if your images are big enough.
- Currently only supports `.png` files.
- When I'm not lazy I'll make the operation async
- Currently all images must be same dimensions.

## Usage
1. Add image sources to `./sources` directory (relative to this file)
2. Execute NPM script `npm run start`
3. Image will be generated in `output.png`, I suggest compressing afterwards.