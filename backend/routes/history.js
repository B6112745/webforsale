var expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');


var Schema = require("mongoose").Schema;
const historySchema = Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    owner: {type: mongoose.Schema.Types.ObjectId,ref:'user'},
    game: {type: mongoose.Schema.Types.ObjectId,ref:'games'},
    device: {type: mongoose.Schema.Types.ObjectId,ref:'devices'},
},  {
    collection: 'history'
});

let History
try {
    History = mongoose.model('historys')
}   catch(error){
    History = mongoose.model('historys', historySchema);
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
        var new_history = new History({
            _id: mongoose.Types.ObjectId(),
            owner: data.owner,
            game: data.game,
            device: data.device
        });
        new_history.save((err, data) => {
            if(err){
                reject(new Error('Cannot insert user to DB!'));
            }else{
                resolve({massage: 'Insert successfully'});
            }
        });
    });
}
router.route('/addhistory')
.post((req, res) => {
    const payload = {
        _id: mongoose.Types.ObjectId(),
         owner: req.body.owner,
         game: req.body.game,
         device: req.body.device
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