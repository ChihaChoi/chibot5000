// Extract the required classes from the discord.js module
const { Client, Attachment } = require('discord.js');

var Jimp = require("jimp");


// Create an instance of a Discord client
const client = new Client();

const memeList = [
    {
        name:'mchale',
        textNames: ['mchale','booze']
    },
    {
        name:'cryglasses',
        textNames: ['top']
    },
    {
        name:'handshake',
        textNames: ['lefthand','righthand','handshake']
    },
    {
        name:'wtfamireading',
        textNames: ['top','bot']
    },
    {
        name:'jasonface',
        textNames: ['face text']
    },
    {
        name:'lava',
        textNames: ['guy','lava']
    },
    {
        name:'burninghouse',
        textNames: ['house','kid']
    },
    {
        name:'flextape',
        textNames: ['guy','tape']
    },
    {
        name:'nelson',
        textNames: ['nelson','viewers']
    },
    {
        name:'wegetitdan',
        textNames:  ['dan']
    },
    {
        name: 'distracted',
        textNames: ['spicy piece of ass','bf','gf']
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
                if(args.length === meme.textNames.length){
                    eval(command)(message,args)
                } else {
                    verify(message, meme.name, meme.textNames)
                }
            }
        })
    }
});

function verify(message, functionName, textNames){
    var formattedTextNames = ''
    textNames.forEach((name)=>{
        formattedTextNames = formattedTextNames.concat(name , ',,')
    })
    formattedTextNames = formattedTextNames.slice(0,-2)
    message.channel.send(`Bep boop to use this command, type "$${functionName} *${formattedTextNames}*" Beeop bop`);
}

function handshake(message, args){
    const firstText = [275,500]
    const secondText = [680,390]
    const thirdText = [380,100]
    const textSize = [500,200]
    sendImage(message, args, 'handshake.jpg', [firstText,secondText,thirdText], textSize)
}

function mchale(message, args){
    const firstText = [410,150]
    const secondText = [140,650]
    const textSize = [250,400]
    sendImage(message, args, 'mchale.jpg', [firstText,secondText], textSize)
}

function cryglasses(message, args){
    const firstText = [80,20]
    const textSize = [160,100]
    sendImage(message, args, 'cryglasses.jpg', [firstText], textSize, 16)
}

function wtfamireading(message,args){
    const firstText = [177,80]
    const secondText = [200,681]
    const textSize = [400,100]
    sendImage(message, args, 'wtfamireading.png', [firstText,secondText], textSize)
}

function jasonface(message,args){
    const firstText = [267,476]
    const textSize = [400,100]
    sendImage(message, args, 'jasonface.jpg', [firstText], textSize)
}

function lava(message,args){
    const firstText = [380,80]
    const secondText = [380,400]
    const textSize = [400,400]
    sendImage(message, args, 'lava.jpg', [firstText, secondText], textSize,  yAlign=Jimp.VERTICAL_ALIGN_TOP)
}

function burninghouse(message,args){
    const firstText = [130,60]
    const secondText = [230,310]
    const textSize = [400,100]
    sendImage(message, args, 'burninghouse.jpg', [firstText, secondText], textSize, 32)
}

function flextape(message,args){
    const firstText = [600,500]
    const secondText = [300,1610]
    const textSize = [700,100]
    sendImage(message, args, 'flextape.jpg', [firstText, secondText], textSize,128)
}

function nelson(message,args){
    const firstText = [190,220]
    const secondText = [530,500]
    const textSize = [300,100]
    sendImage(message, args, 'nelson.png', [firstText, secondText], textSize)
}

function wegetitdan(message,args){
    const firstText = [370,670]
    const textSize = [500,100]
    sendImage(message, args, 'wegetitdan.jpg', [firstText], textSize)
}

function distracted(message,args){
    const firstText = [190,380]
    const secondText = [500,380]
    const thirdText = [700,380]
    const textSize = [200,300]
    sendImage(message, args, 'distracted.jpg', [firstText,secondText,thirdText], textSize, yAlign=Jimp.VERTICAL_ALIGN_TOP)
}






function sendImage(message, args, image, textPositions, texboxSize, fontSize){
    Jimp.read('images/' + image)
    .then(function (image) {
      loadedImage = image;
      if (fontSize===16){
        return Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
      } else if (fontSize===32){
        return Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    } else if (fontSize===128){
        return Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
        } else {
        return Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
      }
    })
    .then(function (font) {
        addText(loadedImage, args, textPositions ,texboxSize, font)
        const attachment = new Attachment('new.jpg');
        message.channel.send(attachment);
    })
    .catch(function (err) {
      console.error(err);
    });

}

function addText(image, text, textPosition, textBoxSize, font, yAlign ){
    yAlign = yAlign | Jimp.VERTICAL_ALIGN_MIDDLE
    console.log(yAlign)
    text.forEach((textContent,i)=>{
        image.print(
            font,
            textPosition[i][0] - textBoxSize[0]/2, //x coordinate
            textPosition[i][1] - textBoxSize[1]/2, //y coordinate
            {
                text: textContent,
                alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                alignmentY: yAlign
            },
            textBoxSize[0],
            textBoxSize[1]
        )
    })
    image.write('new.jpg');
};

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(process.env.BOT_TOKEN);