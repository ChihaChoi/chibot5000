
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
            position: newCoord([300,376],800)
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

module.exports = memeList