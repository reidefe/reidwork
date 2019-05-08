const express = require('express');
const app = express ();
const mongoose = require('mongoose');
const Schema = mongoose.Schema

mongoose.connect('mongodb://127.0.0.1:27017/myapp')


var UserSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name : String,
    surname : {required: true, type: String}, 
    password : { type: String, required: true},   
    email: { required: true, type: String, unique: true, match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ },
    comment: { body: String, date: Date},
    permissionLevel : Number,
});

var user = mongoose.model = ('users', UserSchema);

module.export = user;


                                                                                                      