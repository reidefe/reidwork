var express = require('express');
var app = express ();
var mongoose = require('mongoose');

var mongodb = 'mongodb://localhost/myapp';

mongoose.connect(mongodb, {useNewUrlParser:true});


var db = mongoose.connection;

db.on('error', console.error.bind(console, "mongodb connection error"))






var userSchema =  mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : String,
    surname : {required: true, type: String},
    password : { type: String, required: true},
    email: { required: true, type: String, unique: true, match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ }
/**{
    collection: 'User'}**/
});


var user = mongoose.model ('User', userSchema);
module.exports = user;