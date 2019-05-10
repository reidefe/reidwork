var express = require('express')
var User = require ('../models/db')
var app = express();
var bodyParser = require('body-parser')
var jwt = require('jsonwebtoken');
//var jwksRsa = require('jwks-rsa');
var bcrypt = require('bcrypt');
var mongoose = require('mongoose')
var morgan = require('morgan');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if(req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATH, GET, DELETE');
        return res.status(200) .json({});
    }
})

exports.getAllUsers = (function(req,res,next){
    User.find({}).exec().then(users =>{
        res.send(users)
    });
})



exports.createNewUser = (function( req,res, next) {  User.find({email:req.body.email}).exec().then(user =>{
        if(user.length >= 1)
        {
            return res.status(409) .json({
                message: 'that email already exists'
            })
        } else
        {
            bcrypt.hash(req.body.password, 10,(err, hash) => {
                if(err){
                return res.status(500).json({
                    error: err
                }) ;
                }else {
                    var user = new User({
                        _id : new mongoose.Types.ObjectId(),
                        name: req.body.name,
                        surname: req.body.surname,
                        email: req.body.email,
                        password:hash,
                    });
                }
                user.save()  .then(result =>{
                    res.status(201).json({
                        message: 'New user created'
                    })
                }) .catch(err =>{
                    console.log(err);
                    res.status(500) .json({
                        error: err,
                    })
                });

            })

        }
    })

});



exports.deleteUser = (req,res, next) => {
    User.deleteOne({_id:req.body.userId}).exec().then( result =>{
        return res.status(200) .json({
            message: 'user deleted'
        });

    })
    .catch(err =>{
        console.log(err);
        res.status(500) .json({
            error: err,
        })
    });


}


exports.login = (req,res, next) => {
    User.find({ email: req.body.email}).exec()
    .then(user =>{
        if(user.length < 1){
            return res.status(401) .json({
                message: 'auth failed because user doesnt exist'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) =>{
            if(err){
                return res.status(401) .json({
                    message: 'auth failed to login user'
                })
            }
            if (result) {
               const token =  jwt.sign({
                   email: user[0].email,
                   userId: user[0]._id
               },
               'secret',
               { expiresIn: "1h"},
               );


                return res.status(200) .json({
                    message: 'auth successful',
                    token: token,
                });
            }
           
        })
        
    })
    .catch(err =>{
        console.log(err);
        res.status(500) .json({
            error: err,
        })
    });
}

