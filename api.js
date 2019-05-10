const express = require('express');
const mongoose = require('mongoose');
const app = express() ;
const cont = require('./controllers/controller');
const User = require('./models/db');
var bodyparser = require('body-parser');
const Auth = require('./controllers/checkauth')
var router = express.Router();

const signup = require('./routes/router..signup');
const login = require('./routes/router.login');
const delet = require('./routes/router.delete')





app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.get('/', (req, res) => {
    res.send('yoooo');
});


app.post('/signUp',cont.createNewUser);
app.post('/login',cont.login);
app.post('/userId', cont.deleteUser, Auth.auth);
app.get('/users', cont.getAllUsers);

var port = process.env.PORT || 8080







/***mongoose.connect('mongodb://localhost/myapp', (err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('connection sucessfull')
    }
})**/

app.listen(port,() =>{
    console.log('server started')
})

