// Extract the required classes from the discord.js module
const { Client, Attachment } = require('discord.js');

const Jimp = require("jimp");
const Canvas = require("canvas")


// Create an instance of a Discord client
const client = new Client();

//TECH DEBT
// convert legacy coordinates into new coordinates for pre 2.0 memes
function newCoord(arr, height){
    const ratio = height/300
    const newCoordinates = []
    arr.forEach((number)=>{
        newCoordinates.push(number/ratio)
    })
    return newCoordinates
}

const memeList = [
    {
        name:'mchale',
        textBoxes: [{
            name: 'mchale',
            position: [71,88],
            textPosition : [130,61]
        },{
            name: 'booze',
            position: [55,167],
            // textOffset : []
        }]
    },
    {
        name:'cryglasses',
        textBoxes: [{
            name: 'top',
            position: newCoord([80,20],225)
        }]
    },
    {
        name:'handshake',
        textBoxes: [{
            name: 'lefthand',
            position: newCoord([275,500],645)
        },{
            name: 'righthand',
            position: newCoord([680,390],645)
        },{
            name: 'handshake',
            position: newCoord([380,100],645)
        }]
    },
    {
        name:'wtfamireading',
        textBoxes: [{
            name: 'top',
            position: newCoord([177,80], 834)
        },{
            name: 'bot',
            position: newCoord([200,681], 834)
        }]
    },
    {
        name:'jasonface',
        textBoxes: [{
            name: 'face',
            position: newCoord([267,476],800)
        }]
    },
    {
        name:'lava',
        textBoxes: [{
            name: 'guy',
            position: newCoord([380,80],602)
        },{
            name: 'lava',
            position: newCoord([380,400],602)
        }]
    },
    {
        name:'burninghouse',
        textBoxes: [{
            name: 'house',
            position: newCoord([130,60],375)
        },{
            name: 'kid',
            position: newCoord([230,310],375)
        }]
    },
    {
        name:'flextape',
        textBoxes: [{
            name: 'guy',
            position: newCoord([600,500],2160)
        },{
            name: 'tape',
            position: newCoord([300,1610],2160)
        }]
    },
    {
        name:'nelson',
        textBoxes: [{
            name: 'nelson',
            position: newCoord([190,220],705)
        },{
            name: 'viewers',
            position: newCoord([530,500],705)
        }]
    },
    {
        name:'wegetitdan',
        textBoxes:  [{
            name: 'dan',
            position: newCoord([370,670],900)
    }]
    },
    {
        name: 'distracted',
        textBoxes: [{
            name: 'spicy piece of ass',
            position :newCoord( [190,280],450)
        },{
            name: 'bf',
            position: newCoord([500,280],450)
        },{
            name: 'gf',
            position: newCoord([700,280],450)
        }]
    }
]
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
    if (message.content[0] === '$'){
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
    sendImage(message, args, meme.name, textLocations, [150,100])

}

function sendImage(message, text, image, textPositions, texboxSize, fontSize){
    fontSize = fontSize || 20
    
    //load up image and canvas, then paste image onto canvas
    var Image = Canvas.Image;
    var img = new Image();
    img.src = `resized images/${image}.jpg`;
    const canvas = Canvas.createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    //===================================
    
    
    text.forEach((textContent, i)=>{
        // Select the font size and type from one of the natively available fonts
        ctx.font = `${fontSize}px comic sans MS`;
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = "center"; 
        ctx.textAlign = "center"; 
        // Actually fill the text with a solid color
        wrapText(ctx, textContent, textPositions[i][0],textPositions[i][1], texboxSize[0],fontSize)
        // ctx.fillText(textContent, textPositions[i][0],textPositions[i][1]);
    })
    
	// Use helpful Attachment class structure to process the file for you
	const attachment = new Attachment(canvas.toBuffer(), 'welcome-image.png');

	message.channel.send(attachment);


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
// client.login('NjY3NDgxNDA5MTIzNzc4NjAw.XiDXXw.FaQmEXa_yqJs2fQGKpxFHVyOgAo');
client.login(process.env.BOT_TOKEN);
