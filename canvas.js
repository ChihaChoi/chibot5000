const Canvas = require("canvas")
const fs = require("fs");


var Image = Canvas.Image;
var backgroundImage = new Image();
var canvas = null
var context = null
var buf = null
backgroundImage.onload = function(){
    canvas = Canvas.createCanvas(backgroundImage.width, backgroundImage.height);
    context = canvas.getContext('2d');
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    buf = canvas.toBuffer();
    fs.writeFileSync("test.jpg", buf);
}
backgroundImage.src = `https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png`;

