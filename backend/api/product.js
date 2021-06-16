const expressFunction = require('express');
const authorization = require('../config/authorize');
const router = expressFunction.Router();
const mongoose = require('mongoose');

var Schema = require("mongoose").Schema;

const gameSchema = Schema({
    id: String,
    title: String,
    genre: String,
    description: String,
    publisher: String,
    price: Number,
    file: String,
    img: String,
    game: {type: mongoose.Schema.Types.ObjectId,ref:'history'}
    
}, {
    conllection: 'games'
});


const deviceSchema = Schema({
    id: String,
    type: String,
    name: String,
    detail: String,
    quantity: Number,
    price: Number,
    file: String,
    img: String,
    device: {type: mongoose.Schema.Types.ObjectId,ref:'history'}
    
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
            id: dataGame.id,
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
            id: dataDevice.id,
            type: dataDevice.type,
            name: dataDevice.name,
            detail: dataDevice.detail,
            quantity: dataDevice.quantity,
            price: dataDevice.price,
            file: dataDevice.file,
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
        Device.find({}, (err,data) => {
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

const deletedevicebyid = (id) => {
    return new Promise((resolve, reject) => {
        Device.deleteOne({id: id}, (err,data) => {
            console.log(data.deletedCount)
            if(err){
                reject(new Error('Cannot delete Device'))
            }else{
                if(data.deletedCount != 0){
                    resolve(data)
                }else{
                    reject(new Error('No device id'))
                }
            }
        })
    })
}

const deletegamebyid = (id) => {
    return new Promise((resolve, reject) => {
        Game.deleteOne({id: id}, (err,data) => {
            console.log(data.deletedCount)
            if(err){
                reject(new Error('Cannot delete Device'))
            }else{
                if(data.deletedCount != 0){
                    resolve(data)
                }else{
                    reject(new Error('No device id'))
                }
            }
        })
    })
}

const updategame = (data) => {
    return new Promise((resolve, reject) => {
        const query = {id: data.id }
       if(data.id){
        Game.findOneAndUpdate(query,{ $set :{title: data.title,
            genre: data.genre,
            description: data.description,
            publisher: data.publisher,
            price: data.price}},(err, data) => {
            if(data){
                resolve(data)
            }else{
                reject(new Error('Cannot Update'))
            }
        })
       }
    })
}

const updatedevice = (data) => {
    return new Promise((resolve, reject) => {
        const query = {id: data.id }
       if(data.id){
        Device.findOneAndUpdate(query,{ $set :{ type: data.id,
            name: data.name,
            detail: data.detail,
            quantity: data.quantity,
            price: data.price}},(err, data) => {
            if(data){
                resolve(data)
            }else{
                reject(new Error('Cannot Update'))
            }
        })
       }
    })
}






router.route('/insertgame')
    .post(authorization,(req, res) => {
       
        getAllgame()
        .then(result => {
             var count = result.length + 1
             const payload = {
                id: 'G'+count,
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
        })
        .catch(err =>{
            consolr.log(err)
        })
       
       
    });
 router.route('/insertdevice')
    .post(authorization,(req, res) => {
        getAlldevice()
        .then(result => {
            var count = result.length + 1
            const payload = {
                id: 'D'+count,
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
        })
        .catch(err => {
            console.log(err)
        })
        
    });


  router.route('/getgame')
    .get(authorization,(req, res)  => {
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
  .get(authorization,(req, res) => {
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
  .get(authorization,(req, res) => {
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


  router.route('/deletedevice/:id')
  .delete(authorization,(req,res) => {
      const id = req.params.id
      deletedevicebyid(id)
      .then(result =>{
        console.log(result)
        res.status(200).send(result)
      })
      .catch(err => {
            console.log(err)
            res.status(400).json('No Device '+ id)
      })
  })
  router.route('/deletegame/:id')
  .delete(authorization,(req,res) => {
      const id = req.params.id
      deletegamebyid(id)
      .then(result =>{
        console.log(result)
        res.status(200).send(result)
      })
      .catch(err => {
            console.log(err)
            res.status(400).json('No Game '+ id)
      })
  })
  router.route('/updategame')
  .put(authorization,(req,res) => {
    const payload = {
        id: req.body.id,
        title: req.body.title,
        genre: req.body.genre,
        description: req.body.description,
        publisher: req.body.publisher,
        price: req.body.price,
    }
      updategame(payload)
      .then(result =>{
        console.log(result)
        res.status(200).send(result)
      })
      .catch(err => {
            console.log(err)
            res.status(400).json('No Game '+ id)
      })
  })

  router.route('/updatedevice')
  .put(authorization,(req,res) => {
    const payload = {
        id: req.body.id,
    type: req.body.id,
    name: req.body.name,
    detail: req.body.detail,
    quantity: req.body.quantity,
    price: req.body.price,
    }
      updatedevice(payload)
      .then(result =>{
        console.log(result)
        res.status(200).send(result)
      })
      .catch(err => {
            console.log(err)
            res.status(400).json('No Game '+ id)
      })
  })
  

module.exports = router