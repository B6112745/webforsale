var expressFunction = require('express');
const router = expressFunction.Router();
const authorization = require('../config/authorize');
const mongoose = require('mongoose');


var Schema = require("mongoose").Schema;


const historySchema = Schema({
    customerid: {type: mongoose.Schema.Types.String,ref:'user'},
    games: [{type: mongoose.Schema.Types.String,ref:'games'}],
    devices: [{type: mongoose.Schema.Types.String,ref:'devices'}]
},  {
    collection: 'histories',
    timestamps: true,
});

let History
try {
    History = mongoose.model('histories')
}   catch(error){
    History = mongoose.model('histories', historySchema);
}

const getHistory = () => {
    return new Promise ((resolve,reject) => {
        History.find({}).populate('games','name').exec()
        .then(() => {
            if(err){
                reject(new Error('Cannot get products!!'));
            }else {
                if(data){
                    resolve(data)
                }else {
                    reject(new Error('Cannot get product!!',{show: data}));
                }
            }
        });
    });
}
const addhistory = (data) => {
    return new Promise ((resolve, reject) => {
        console.log(data)
        var new_history = new History({
            customerid: data.customerid,
            games: data.games,
            devices: data.devices
           
        });
        new_history.save((err, data) => {
            if(err){
                reject(new Error(err));
            }else{
                resolve({massage: 'Insert successfully'});
            }
        });
    });
}
router.route('/addhistory')
.post(authorization,(req, res) => {
    console.log(req.body.games)
    const payload = {
        customerid: req.body.customerid,
        games: req.body.games,
        devices: req.body.devices
        
    }
        addhistory(payload)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
            })
});

router.route('/history')
    .get((req,res) => {
        console.log('Hello')
        //getHistory(req.body)
        History.find({}).populate('game').populate('device').exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                history: docs.map(doc => {
                  return {
                    _id: doc._id,
                    game: doc.game,
                    device: doc.device,
                  };
                })
              });
        })
        .catch(err => {
            console.log(err);
        })
    });
    
module.exports = router