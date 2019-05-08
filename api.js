const express = require('express');
const mongoose = require('mongoose');
const app = express() ;
const cont = require('./controllers/controller');
const User = require('./models/db');
var bodyparser = require('body-parser');
var router = express.Router();
const checkAuth = ('./controllers/checkauth');








/*const checkJwt = jwt({
    secret:jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri:`https://reidefe.eu.auth0.com/.well-known/jwks.json`
    }),

    audience: 'https://reidefe.eu.auth0.com/api/v2/',
    issuer: '`https://reidefe.eu.auth0.com/',
    algorithms: [RS256]
});*/

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.get('/', (req, res) => {
    res.send('yoooo');
});


//app.post('/mypage',checkAuth,controller.got_to_my_page);
//app.get('path', controller.post_to_my_page);
app.post('/signUp', cont.createNewUser);
app.post('/login', cont.login)
app.delete('/:userId', cont.deleteUser);



mongoose.connect('mongodb://localhost:27017/myapp')

app.listen(9000,() =>{
    console.log('server started')
})

