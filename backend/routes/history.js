var expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var Schema = require("mongoose").Schema;
const historySchema = Schema({
    
},  {
    conllection: 'history'
},history.aggregate([
    {
      $lookup:
        {
          from: "history",
          localField: "name",
          foreignField: "name",
          as: "user_his"
        }
   }
 ]));

let History
try {
    History = mongoose.model('history')
} catch (error) {
    History = mongoose.model('history', historySchema);
}

const insertUser = (dataUser) => {
    return new Promise ((resolve, reject) => {
        var new_user = new User({
            username: dataUser.username,
            password: dataUser.password
        });
        new_user.save((err, data) => {
            if(err){
                reject(new Error('Cannot insert user to DB!'));
            }else{
                resolve({massage: 'Sign up successfully'});
            }
        });
    });
}
router.route('/history')
    .post((req, res) => {
        makeHash(req.body.password)
        .then(hashText => {
            const playload = {
                username: req.body.username,
                password: hashText,
            }
            console.log(playload);
            insertUser(playload)
                .then(result => {
                    console.log(result);
                    res.status(200).json(result);
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {

        })
    });
    
module.exports = router