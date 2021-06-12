const expressFunction = require('express');
var expressApp = expressFunction();
const authorization = require('../config/authorize');
const mongoose = require('mongoose');
const router = expressFunction.Router();

const products = [
    {
        type: 'cpu',
        id: '100001',
        name: 'Intel Core i7 Gen 10th',
        detail: 'The Intel Core i7-10750H is a high-end processor',
        quantity: 10,
        price: 10
    }
];
var Schema = require("mongoose").Schema;
const userSchema = Schema({
    username: String,
    password: String,
    email: String,
    gender: String,
    birth: Date,
    phone: Number,
    role: String
},  {
    conllection: 'users'
});

let User
try {
    User = mongoose.model('users')
} catch (error) {
    User = mongoose.model('users', userSchema);
}

router.route('/checktoken').get(authorization)

module.exports = router