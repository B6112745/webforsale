var expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');

var Schema = require("mongoose").Schema;

const gameSchema = Schema({
    title: String,
    genre: String,
    description: String,
    publisher: String,
    price: Number,
    file: String,
    img: String
    
}, {
    conllection: 'games'
});


const deviceSchema = Schema({
    type: String,
    name: String,
    detail: String,
    quantity: Number,
    price: Number,
    file: String,
    img: String
    
}, {
    conllection: 'devices'
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
            description: dataGame.description,
            publisher: dataGame.publisher,
            price: dataGame.price,
            file: dataGame.file,
            img: dataGame.img
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
            file: dataDevice,file,
            img: dataDevice.img
        });
        new_device.save((err, data) => {
            if(err){
                reject(new Error('Cannot insert user to DB!'));
            }else{
                resolve({massage: data});
            }
        });
    });
}

const getAllgame = () =>{
    return new Promise ((resolve, reject) => {
        Game.find({},(err, data) => {
            if(err){
                reject(new Error('Cannot get all game'));
            }else{
                resolve(data)
            }
        })
    });
}

const getGame = (genre) =>{
    return new Promise((resolve, reject) => {
        Game.find({genre: genre}, (err,data) => {
            if(err){
                reject(new Error('Cannot find Game'))
            }else{
                if(data.length > 0){
                    resolve(data)
                }else{
                    reject(new Error('No '+genre+' Game'))
                }
            }
        })
    })
}


const getAlldevice = () =>{
    return new Promise((resolve, reject) => {
        Game.find({}, (err,data) => {
            if(err){
                reject(new Error('Cannot get all device'))
            }else{
                resolve(data)
            }
        })
    })
}

const getDevice = (type) =>{
    return new Promise((resolve, reject) => {
        Device.find({type: type}, (err,data) => {
            if(err){
                reject(new Error('Cannot find Device'))
            }else{
                if(data.length > 0){
                    resolve(data)
                }else{
                    reject(new Error('No '+type))
                }
            }
        })
    })
}






router.route('/insertgame')
    .post((req, res) => {
        const payload = {
            title: req.body.title,
            genre: req.body.genre,
            description: req.body.description,
            publisher: req.body.publisher,
            price: req.body.price,
            file: req.body.file,
            img: req.body.img
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
            name: req.body.name,
            detail: req.body.detail,
            quantity: req.body.quantity,
            price: req.body.price,
            file: req.body.file,
            img: req.body.img
        }
        insertDevice(payload)
                .then(result => {
                    res.status(200).json(result);
                })
                .catch(err => {
                    console.log(err);
                })
    });


  router.route('/getgame')
    .get((req, res)  => {
        getAllgame()
        .then(result => {
            console.log(result)
            res.status(200).json(result)
        })
        .catch( err => {
            console.log(err);
        })
    })

  router.route('/getgame/:genre')
  .get((req, res) => {
      const genre = req.params.genre
      getGame(genre)
      .then(result => {
          console.log(result)
            res.status(200).send(result)
      })
      .catch(err => {
        console.log(err)
        res.status(400).json('No '+ genre + ' Game')
      })
  })

    router.route('/getdevice')
    .get((req, res)  => {
        getAlldevice()
        .then(result => {
            res.status(200).json(result)
        })
        .catch( err => {
            console.log(error);
        })
    })

    router.route('/getdevice/:type')
  .get((req, res) => {
      const type = req.params.type
      getDevice(type)
      .then(result => {
            console.log(result)
            res.status(200).send(result)
      })
      .catch(err => {
        console.log(err)
        res.status(400).json('No '+ type)
      })
  })
module.exports = router