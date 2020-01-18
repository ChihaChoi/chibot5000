// Extract the required classes from the discord.js module
const { Client, Attachment } = require('discord.js');
const Jimp = require("jimp");
const Canvas = require("canvas")
const client = new Client();

const memeList = require('./memes')


// populate list of memes for help function
var memeNames = []
memeList.forEach((e)=>{
    memeNames.push(e.name)
})
//

/**
 * The ready event is vital, it means that only after this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
    if (message.content[0] === '£'){
        const command = message.content.slice(1).split(' ')[0]
        const args = message.content.substring(message.content.indexOf(' ')+1).split(',,')
        console.log(args)
        if (command === 'help'){
            message.channel.send(`supported images are: ${memeNames}`);
        }
        memeList.forEach((meme,i)=>{
            if(command === meme.name){
                if(args.length === meme.textBoxes.length){
                    createMeme(message, args, meme)
                    // eval(command)(message,args) //carry out the meme function
                } else {
                    verify(message, meme.name, meme.textBoxes)
                }
            }
        })
    }
    //use this for avatar urls
    // message.channel.send(message.member.user.displayAvatarURL)
});

function verify(message, functionName, textBoxes){
    var formattedTextNames = ''
    textBoxes.forEach((name)=>{
        formattedTextNames = formattedTextNames.concat(name , ',,')
    })
    formattedTextNames = formattedTextNames.slice(0,-2)
    message.channel.send(`Bep boop to use this command, type "$${functionName} *${formattedTextNames}*" Beeop bop`);
}

function createMeme(message, args, meme){
    //create the list of text locations
    var textLocations = []
    meme.textBoxes.forEach((textBox)=>{
        if (textBox.textPosition){
            textLocations.push(textBox.textPosition)
        } else {
            textLocations.push(textBox.position)
        }
    })
    // =======================
    console.log(textLocations)

    //load up image and canvas, then paste image onto canvas
    var Image = Canvas.Image;
    var img = new Image();
    img.src = `resized images/${meme.name}.jpg`;
    const canvas = Canvas.createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    //===================================
    
    args.forEach((textContent, i)=>{
        attachText(img, ctx, textContent, meme.textBoxes[i])
    })
    
    // Use helpful Attachment class structure to process the file for you
    const attachment = new Attachment(canvas.toBuffer(), 'welcome-image.png');
    message.channel.send(attachment);

}

function attachText(img, ctx, text, format){
     // formulate font size from image width and length of text string
     const fontSize = 6 + img.width / 14 - text.length/7

     ctx.font = `${fontSize}px comic sans MS`;
     ctx.fillStyle = '#ffffff';
     ctx.textAlign = "center"; 
     ctx.textAlign = "center"; 
     // Actually fill the text with a solid color
     wrapText(ctx, text, format.position[0],format.position[1], img.width/5 + 130 ,fontSize) //feature req change width sizing
     // ctx.fillText(textContent, textPositions[i][0],textPositions[i][1]);
}

//copy and pasted from
// https://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/
function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';

    for(var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      }
      else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
  }


// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(process.env.BOT_TOKEN);
