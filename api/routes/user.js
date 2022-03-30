const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken');

// Users crud operation
router.route('/:id')
    // Update user
    .put(verifyTokenAndAuthorization, async (req, res) => {
        if(req.body.password){
            console.log('password block start')
            req.body.password = CryptoJS.AES.encrypt(req.body.password,process.env.PASS_KEY).toString();
            console.log('password block end')
        }


        try {
            console.log('tryblock')
            const updateUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                {
                    new: true
                },
                
            )
            res.status(200).json(updateUser)
        }catch(err){
            return res.status(500).json('err')
        }
    })
    // Delete users
    .delete(verifyTokenAndAuthorization,async (req, res) => {
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json('User deleted successfully')
        }catch(err){
            res.status(500).json(err)
        }
    })
    // get users

router.route('/find/:id')
    .get(verifyTokenAndAdmin, async (req, res) =>{
        try{
            const user = await User.findById(req.params.id);
            const{password, ...others} = user._doc
            res.status(200).json(others)
        }catch(err){
            res.status(500).json(err)
        }
    })

// Get all users
router.route('/')
    .get(verifyTokenAndAdmin, async (req, res) => {
        const query = req.query.new;

        try{
            const users = query ? await User.find().sort({_id: -1}).limit(5) : await User.find();
            res.status(200).json(users)
        }catch(err){
            res.status(501).json(err)
        }
    })

// Get user status
router.route('/status')
    .get(verifyTokenAndAdmin, async (req, res) => {
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

        try{
            const data = await User.aggregate([
                {$match: {createdAt: {$gte : lastYear}}},
                {
                    $project :{
                        month: { $month : "$createdAt"}
                    },
                },
                {
                    $group:{
                        _id: "$month",
                        total: {$sum: 1}
                    }
                },
            ]);
            res.status(200).json(data)
        }catch(err){
            res.status(500).json(err)
        }
    })
module.exports = router;