const fs = require('fs');
const path = require('path');
const PNG = require("pngjs").PNG;

// Check and make dir.
const DIR_INPUT = path.join(__dirname, 'sources');
if(!fs.existsSync(DIR_INPUT)) fs.mkdirSync(DIR_INPUT);

// Scan for PNG files.
// You could sort the files var to change the order in the output file.
const files = fs.readdirSync(DIR_INPUT).filter(file => {
  return file && file.toLowerCase().endsWith('.png');
});

if(!files || !files.length) {
  console.error(`There are no source PNG files.`)
  return;
}

// Logic
let imageWidth, imageHeight, fileData, filePng;
let outWidth, outHeight, outPng;

for(let i = 0; i < files.length; i++) {
  fileData = fs.readFileSync(path.join(DIR_INPUT, files[i]));
  filePng = PNG.sync.read(fileData);

  // Take metadata from first image.
  if(i === 0) {
    imageWidth = filePng.width;
    imageHeight = filePng.height;
    outWidth = imageWidth;
    outHeight = imageHeight * files.length;
    outPng = new PNG({
      width: outWidth,
      height: outHeight
    });
  } else {
    if(imageWidth !== filePng.width || imageHeight !== filePng.height) {
      console.error(`The image`, files[i], `is incorrectly sized.`)
      return;
    }
  }

  let outI = (filePng.width * filePng.height * 4) * i;
  
  console.log('Buffering image', i);
  for(let j = 0; j < filePng.width * filePng.height * 4; j++) {
    outPng.data[outI+j] = filePng.data[j];
  }
}

console.log('Finished buffering', outWidth, 'x', outHeight, 'px', 'with', files.length, 'rows');
fs.writeFileSync('output.png', PNG.sync.write(outPng));