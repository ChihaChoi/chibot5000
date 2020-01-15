// Extract the required classes from the discord.js module
const { Client, Attachment } = require('discord.js');

var Jimp = require("jimp");


// Create an instance of a Discord client
const client = new Client();

const list = [
    'mchale',
    'cryglasses',
    'handshake',
    'wtfamireading',
    'jasonface',
    'lava',
    'burninghouse',
    'flextape',
    'nelson',
    'wegetitdan'
]

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
        switch (command) {
            case 'handshake':
                if (args.length!=3){
                    verify(message, 'handshake',['lefthand text','righthand text','handshake text'])
                } else {
                    handshake(message, args)
                }
                break;
            case 'mchale':
                if (args.length!=2){
                    verify(message, 'mchale',['mchale text','booze text'])
                } else {
                    mchale(message, args)
                }
                break;
            case 'cryglasses':
                if (args.length!=1){
                    verify(message, 'cryglasses',['top text'])
                } else {
                    cryglasses(message, args)
                }
                break;
            case 'wtfamireading':
                if (args.length!=2){
                    verify(message, 'wtfamireading',['top text', 'bot text'])
                } else {
                    wtfamireading(message, args)
                }
                break;
            case 'jasonface':
                if (args.length!=1){
                    verify(message, 'jasonface',['top text'])
                } else {
                    jasonface(message, args)
                }
                break;
            case 'lava':
                if (args.length!=2){
                    verify(message, 'lava',['top text, lava text'])
                } else {
                    lava(message, args)
                }
                break;
            case 'burninghouse':
                if (args.length!=2){
                    verify(message, 'burninghouse',['house text, kid text'])
                } else {
                    burninghouse(message, args)
                }
                break;
            case 'flextape':
                if (args.length!=2){
                    verify(message, 'flextape',['guy text, tape text'])
                } else {
                    flextape(message, args)
                }
                break;
            case 'nelson':
                if (args.length!=2){
                    verify(message, 'nelson',['nelson text, viewers text'])
                } else {
                    nelson(message, args)
                }
                break;
            case 'wegetitdan':
                if (args.length!=1){
                    verify(message, 'wegetitdan',['wegetitdan text'])
                } else {
                    wegetitdan(message, args)
                }
                break;
                
            case 'help':
                message.channel.send(`supported images are: ${list}`)
        }

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
    sendImage(message, args, 'handshake.jpg', [firstText,secondText,thirdText], [500,200])
}

function mchale(message, args){
    const firstText = [410,150]
    const secondText = [140,650]
    sendImage(message, args, 'mchale.jpg', [firstText,secondText], [250,400])
}

function cryglasses(message, args){
    const firstText = [80,20]
    sendImage(message, args, 'cryglasses.jpg', [firstText], [160,100], 16)
}

function wtfamireading(message,args){
    const firstText = [177,80]
    const secondText = [200,681]
    sendImage(message, args, 'wtfamireading.png', [firstText,secondText], [400,100])
}

function jasonface(message,args){
    const firstText = [267,476]
    sendImage(message, args, 'jasonface.jpg', [firstText], [400,100])
}

function lava(message,args){
    const firstText = [380,80]
    const secondText = [380,400]
    sendImage(message, args, 'lava.jpg', [firstText, secondText], [400,100])
}

function burninghouse(message,args){
    const firstText = [130,60]
    const secondText = [230,310]
    sendImage(message, args, 'burninghouse.jpg', [firstText, secondText], [400,100], 32)
}

function flextape(message,args){
    const firstText = [600,500]
    const secondText = [300,1610]
    sendImage(message, args, 'flextape.jpg', [firstText, secondText], [700,100],128)
}

function nelson(message,args){
    const firstText = [190,220]
    const secondText = [530,500]
    sendImage(message, args, 'nelson.png', [firstText, secondText], [300,100])
}

function wegetitdan(message,args){
    const firstText = [370,670]
    sendImage(message, args, 'wegetitdan.jpg', [firstText], [500,100])
}





function sendImage(message, args, image, textPositions, texboxSize, fontSize){
    Jimp.read(image)
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

function addText(image, text, textPosition, textBoxSize, font ){
    text.forEach((textContent,i)=>{
        image.print(
            font,
            textPosition[i][0] - textBoxSize[0]/2,
            textPosition[i][1] - textBoxSize[1]/2,
            {
                text: textContent,
                alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
            },
            textBoxSize[0],
            textBoxSize[1]
        )
    })
    image.write('new.jpg');
};

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(process.env.BOT_TOKEN);