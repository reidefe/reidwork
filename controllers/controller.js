const express = require('express')
var User = require ('../models/db')
const app = express();
const bodyparser = require('body-parser')
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));


const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');
const bcrypt = require('bcrypt');


exports.createNewUser = (res, req, next) =>{
    User.find({email:req.param.email}) .exec() 
    .then(user =>{
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
                        _id : new ObjectId(),
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

}


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));


exports.deleteUser = (res, req, next) => {
    User.remove({_id:req.param.userId}).exec().then( result =>{
        res.status(200) .json({
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


exports.login = (res, req, next) => {
    User.find({ email: req.param.email}).exec()
    .then(user =>{
        if(user.length <= 1){
            res.status(401) .json({
                message: 'auth failed'
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) =>{
            if(err){
                return res.status(401) .json({
                    message: 'auth failed'
                })
            }
            if(result){
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

