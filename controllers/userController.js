const {User} = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');

class UserController {
    static async register(req,res) {
        const {username, password} = req.body;
        console.log(username, password);
        try{
            const user = await User.findOne({where : {username: username}});
            if(user){
                return res.status(409).send('Username already exists');
            }
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            const created = await User.create({username: username, password: hash});
            if(created){
                res.redirect('/api/user/login');
                // return res.status(201).json({message : 'User created successfully'});
            }
        }catch(err){
            return res.send(err);
        }
    }
    static async login(req,res) {
        const {username, password} = req.body;
        try{
            const user = await User.findOne({where : {username: username}});
            if(user){
                const passwordIsValid = await bcrypt.compare(password, user.password);
                if(passwordIsValid){
                    const secretKey = 'Secret';
                    const token = jwt.sign({
                        "id" : user.id,
                        "username" : user.username,
                        "password":user.password 
                    },
                    secretKey);
                    // res.cookie('jwt', token, { httpOnly: true });
                    // res.redirect('/chat');
                    console.log(username, password);
                    return res.json({token : token, message :"Password is valid"});
                }else{
                    return res.send({auth : false, token : null});
                }
            }else{
                return res.status(200).json({
                    message: 'User not found'
                })
            }
            
        }catch(err){
            return res.send(err);
        }
    }
}

module.exports = UserController;