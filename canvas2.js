const Canvas = require("canvas")
const fs = require("fs");


var Image = Canvas.Image;
var backgroundImage = new Image();
backgroundImage.src = `resized images/lava.jpg`;

canvas = Canvas.createCanvas(backgroundImage.width, backgroundImage.height);
context = canvas.getContext('2d');
context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);



backgroundImage.onload = function(){

}

buf = canvas.toBuffer();
fs.writeFileSync("test2.jpg", buf); 