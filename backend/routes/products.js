var expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');

var Schema = require("mongoose").Schema;

const gameSchema = Schema({
    title: String,
    genre: String,
    developer: String,
    publisher: String,
    price: Number,
    
}, {
    conllection: 'games'
});


const deviceSchema = Schema({
    type: String,
    name: String,
    detail: String,
    quantity: String,
    price: Number,
    
}, {
    conllection: 'games'
});

let Game
try {
    Game = mongoose.model('games')
} catch (error) {
    Game = mongoose.model('games', gameSchema);
}

let Device
try {
    Device = mongoose.model('devices')
} catch (error) {
    Device = mongoose.model('devices', deviceSchema);
}

const insertGame = (dataGame) => {
    return new Promise ((resolve, reject) => {
        var new_game = new Game({
            title: dataGame.title,
            genre: dataGame.genre,
            developer: dataGame.developer,
            publisher: dataGame.publisher,
            price: dataGame.price,
        });
        new_game.save((err, data) => {
            if(err){
                reject(new Error('Cannot insert user to DB!'));
            }else{
                resolve({massage: 'Insert successfully'});
            }
        });
    });
}


const insertDevice = (dataDevice) => {
    return new Promise ((resolve, reject) => {
        var new_device = new Device({
            type: dataDevice.type,
            name: dataDevice.name,
            detail: dataDevice.detail,
            quantity: dataDevice.quantity,
            price: dataDevice.price,
        });
        new_device.save((err, data) => {
            if(err){
                reject(new Error('Cannot insert user to DB!'));
            }else{
                resolve({massage: 'Insert successfully'});
            }
        });
    });
}

router.route('/insertgame')
    .post((req, res) => {
        const payload = {
            title: req.body.title,
            genre: req.body.genre,
            developer: req.body.developer,
            publisher: req.body.publisher,
            price: req.body.price,
        }
            insertGame(payload)
                .then(result => {
                    res.status(200).json(result);
                })
                .catch(err => {
                    console.log(err);
                })
    });
    router.route('/insertdevice')
    .post((req, res) => {
        const payload = {
            type: req.body.type,
            name: req.body.type,
            detail: req.body.detail,
            quantity: req.body.quantity,
            price: req.body.price,
        }
        insertDevice(payload)
                .then(result => {
                    res.status(200).json(result);
                })
                .catch(err => {
                    console.log(err);
                })
    });
module.exports = router