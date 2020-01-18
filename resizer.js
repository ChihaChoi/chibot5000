var Jimp = require("jimp");
const path = require('path');
const fs = require('fs');

//joining path of directory 
const directoryPath = path.join(__dirname, 'images');

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        const outputFile = file.slice(0,-4) + '.jpg'
        resizer(`${directoryPath}/${file}`,`resized images/${outputFile}`, [Jimp.AUTO, 300] ); 
    });
});


//resize image file from input file path to output filpath of size = [width,height]
function resizer(input, output, size){
  Jimp.read(input)
      .then(function (image) {
          image.resize(size[0],size[1]).write(output)
      })
      .catch(function (err) {
          console.error(err);
      });
  }

module.exports = resizer