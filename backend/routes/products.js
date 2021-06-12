var expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');

var Schema = require("mongoose").Schema;
const productSchema = Schema({
    name: String,
    discrision: String,
    type: String,
    price: Number,
    quantity: Number
}, {
    conllection: 'product'
});

let Product
try {
    Product = mongoose.model('products')
} catch (error) {
    Product = mongoose.model('products', productSchema);
}

const insertProduct = (dataProduct) => {
    return new Promise ((resolve, reject) => {
        var new_user = new User({
            name: dataProduct.username,
            discrision: dataProduct.discrision,
            type: dataProduct.type,
            price: dataProduct.price,
            quantity: dataProduct.quantity,
        });
        new_user.save((err, data) => {
            if(err){
                reject(new Error('Cannot insert user to DB!'));
            }else{
                resolve({massage: 'Update successfully'});
            }
        });
    });
}

router.route('/insert')
    .post((req, res) => {
        const playload = {
            username: req.body.username,
            password: hashText,
            name: req.body.username,
            discrision: req.body.discrision,
            type: req.body.type,
            price: req.body.price,
            quantity: req.body.quantity,
        }
            insertProduct(playload)
                .then(result => {
                    res.status(200).json(result);
                })
                .catch(err => {
                    console.log(err);
                })
    });
module.exports = router