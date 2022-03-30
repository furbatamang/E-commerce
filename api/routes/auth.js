const router = require('express').Router();
const User = require('../models/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

// register
router.route('/register')
    .get((req, res) => {
        res.send('auth')
    })
    .post(async (req, res) => {
        const newUser = new User({
            username: req.body.username,
            password: CryptoJS.AES.encrypt(req.body.password,process.env.PASS_KEY).toString(),
            email: req.body.email 
        })

        try{
            const savedUser = await newUser.save();
            res.status(200).json(savedUser)
        }catch(err){
            console.log(err);
            res.status(500).json(err)
        }
    })

// login

router.route('/login')
    .post(async (req, res) => {
        try{
            const user = await User.findOne({
                username: req.body.username,
            })
            !user && res.status(401).json("No Such username")
            const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_KEY);
            const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

            originalPassword !== req.body.password && res.status(401).json("Wrong password");
            const token = jwt.sign({
                id:user._id,
                isAdmin: user.isAdmin
            }, process.env.JWT_KEY, {expiresIn:'3d'})
            const {password, ...others} = user._doc;
            res.status(200).json({...others, token})
        }
        catch(err){
            res.status(500).json(err)
        }
    })
module.exports = router