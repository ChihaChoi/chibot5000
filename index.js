// Extract the required classes from the discord.js module
const { Client, Attachment } = require('discord.js');
const Jimp = require("jimp");
const Canvas = require("canvas")
const client = new Client();
const fs = require("fs");

const memeList = require('./memes')


// populate list of memes for help function
var helpMessage = 'supported images are:'
memeList.forEach((e)=>{
    helpMessage = helpMessage + ('\n' + '$' + e.name)
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
    if (message.content[0] === '$'){
        const command = message.content.slice(1).split(' ')[0]
        const args = message.content.substring(message.content.indexOf(' ')+1).split(',, ')
        console.log(args)
        if (command === 'help'){
            message.channel.send(helpMessage);
        }
        memeList.forEach((meme,i)=>{
            if(command === meme.name){
                if(args.length <= meme.textBoxes.length){
                    createMeme(message, args, meme)
                    // eval(command)(message,args) //carry out the meme function
                } else {
                    message.channel.send(`maximum number of arguments for $${meme.name} is ${meme.textBoxes.length} `)
                    // verify(message, meme.name, meme.textBoxes)
                }
            }
        })
    }
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
    //load up image and canvas, then paste image onto canvas
    var Image = Canvas.Image;
    var backgroundImage = new Image();
    backgroundImage.src = `resized images/${meme.name}.jpg`;
    const canvas = Canvas.createCanvas(backgroundImage.width, backgroundImage.height);
    const context = canvas.getContext('2d');
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    //===================================
    
    args.forEach((textContent, i)=>{
        if (textContent.slice(0,4) === 'http'){
            attachImage(context, textContent, meme.textBoxes[i])
        } else if (textContent.slice(0,3) === '<@!'){
            //obtain user id from inside mention
            userID=textContent.split('<@!')[1].split('>')[0]
            avatarURL = message.guild.members.get(userID).user.displayAvatarURL
            attachImage(context, avatarURL, meme.textBoxes[i])
        } else {
            attachText(backgroundImage ,context, textContent, meme.textBoxes[i])
        }
    })
    //timeout used instead of learning async functions because im a cretin
    setTimeout(()=>{
        // Use helpful Attachment class structure to process the file for you
        const attachment = new Attachment(canvas.toBuffer());
        message.channel.send(attachment);
    },1000)
}

function attachImage(context, image, format){
    var Image = Canvas.Image;
    var img = new Image();
    img.onload = function(){
        console.log(format)
        const width = format.size ? format.size[0] : 100
        const height = img.height * ( width /img.width)
        const x =  format.position[0] - width/2
        const y = format.position[1] - height/2
        context.drawImage(img, x, y, width, height);
    }
    img.src = image;
}

function attachText(img, context, text, format){
     // formulate font size from image width and length of text string
     console.log(context.width)
     const fontSize = 6 + img.width / 14 - text.length/7
     const textWidth = img.width/5 + 130 
     const lineHeight = fontSize
     const xCoord = format.textPosition ?  format.textPosition[0] : format.position[0]
     const yCoord = format.textPosition ?  format.textPosition[1] : format.position[1]

     context.font = `${fontSize}px comic sans MS`;
     context.fillStyle = '#ffffff';
     context.textAlign = "center"; 
     context.textAlign = "center"; 
     // Actually fill the text with a solid color
     wrapText(context, text, xCoord , yCoord, textWidth, lineHeight) //feature req change width sizing
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
