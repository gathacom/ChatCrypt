const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const bodyParser = require('body-parser');



router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.use(bodyParser.urlencoded({ extended: false }));

router.post('/register', userController.register);
router.post('/login', userController.login);


module.exports = router;