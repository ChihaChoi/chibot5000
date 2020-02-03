
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
            name: 'handshake',
            position: newCoord([380,100],645)
        },{
            name: 'righthand',
            position: newCoord([680,390],645)
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
            position: newCoord([280,50],602),
            textPosition : newCoord([380,80],602),
            size: [50,50]
        },{
            name: 'lava',
            position: newCoord([380,400],602),
            size: [150,150]
        }]
    },
    {
        name:'burninghouse',
        textBoxes: [{
            name: 'house',
            position: newCoord([130,150],375),
            textPosition: newCoord([130,60],375)
        },{
            name: 'kid',
            position: newCoord([330,280],375),
            textPosition: newCoord([230,310],375),
            size: [150,100]
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
            name: 'viewers',
            position: newCoord([190,220],705)
        },{
            name: 'nelson',
            position: newCoord([530,300],705),
            textPosition: newCoord([530,500],705)
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
            position :newCoord( [190,180],450),
            textPosition :newCoord( [190,280],450)
        },{
            name: 'bf',
            position: newCoord([430,100],450),
            textPosition: newCoord([500,180],450),
            size : [70,70]
        },{
            name: 'gf',
            position: newCoord([700,180],450),
            textPosition: newCoord([700,280],450)
        }]
    },{
        name: 'adam',
        textBoxes: [{
            name: 'adam',
            position : [70,125]
        },{
            name: 'gift',
            position: [300,130]
        },{
            name: 'god',
            position: [390, 80]
        }]
    },{
        name: 'ambulance',
        textBoxes: [{
            name: 'knife',
            position: [90,86]
        },{
            name: 'gun',
            position: [138,214]
        }]
    },{
        name: 'cat',
        textBoxes: [{
            name: 'knife',
            position: [109,215]
        },{
            name: 'gun',
            position: [420,69] //nice
        }]
    },{
        name: 'cheer',
        textBoxes: [{
            name: 'top',
            position: [86,74],
            color: '#000000'
        },{
            name: 'bot',
            position: [84,222], //nice
            color: '#000000'
        }]
    }
]

module.exports = memeList