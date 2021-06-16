var expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');
//let User = require('./signup');

var Schema = require("mongoose").Schema;
const historySchema = Schema({
    id: {type: mongoose.Schema.Types.ObjectId},
    price: Number,
    quantity: String,
    name: String,
    owner: {type: mongoose.Schema.Types.ObjectId,ref:'user'},
    game: {type: mongoose.Schema.Types.String,ref:'games'},
    device: {type: mongoose.Schema.Types.String,ref:'devices'},
},  {
    collection: 'history'
});

let History
try {
    History = mongoose.model('historys')
}   catch(error){
    History = mongoose.model('historys', historySchema);
}

const getHistory = (uid) => {
    console.log('hello from GET HIT')
    console.log(uid)
    return new Promise((resolve, reject) => {
        History.find({owner:uid},(err, data) => {
            console.log(data)
            if(data){
                resolve(data)
                //reject(new Error('Cannot get User Data'))
            }
            else{
                reject(new Error('Cannot get User Data'))
            }
        })
        
    })
}
const addhistory = (data) => {
    console.log('start')
    console.log(data.owner)
    console.log(data.game)
    console.log(data.device)
    console.log('end of data')
    return new Promise ((resolve, reject) => {
        console.log('hello from for')
        var new_history = new History({
            _id: mongoose.Types.ObjectId(),
            owner: data.owner,
            name: data.name,
            game: data.game,
            quantity: data.quantity,
            device: data.device,
            price: data.price
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
router.route('/addhistory/:id')
.post((req, res) => {
    console.log('start')
    console.log(req.body)
    console.log('end')
    //const i  = 0;
    const cout = req.body.length
    console.log(cout)
    for (let i = 0; i < cout; i++){
        console.log('product')
        const payload = {
        _id: mongoose.Types.ObjectId(),
         owner: req.params.id,
         name : req.body[i].name,
         game: req.body[i].gameid,
         quantity: req.body[i].quantity,
         device: req.body[i].deviceid,
         price : req.body[i].price
    }
    console.log(payload)
        addhistory(payload)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
            })
    }
        
    
    console.log('product2')
    
});

router.route('/history/:id')
    .get((req,res) => {
        const uid = req.params.id
        console.log(uid)
        getHistory(uid)
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => {
            console.log(err)
        })
        // History.find({owner:uid}).populate('game').populate('device').exec()
        // .then(docs => {
        //     res.status(200).json(docs);
        // })
        // .catch(err => {
        //     console.log(err);
        // })
    });
    
module.exports = router