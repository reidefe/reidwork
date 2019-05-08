var cont = require('./controllers/controller')
const express = require('express'); 
var checkAuth = require('./controllers/checkauth');
const router = express.Router();

router.post('/signUp', controller.createNewUser);
router.post('/login', controller.login)
router.delete('/:userId',checkAuth, controller.deleteUser);


module.exports = router;


