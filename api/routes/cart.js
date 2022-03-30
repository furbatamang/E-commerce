const {verifyTokenAndAdmin, verifyTokenAndAuthorization, verifyToken} = require('./verifyToken');
const Cart = require('../models/Cart');
const router = require('express').Router();

// Cart CRUD 

router.route('/')
    // get Cart
    .get(verifyToken,async (req, res) => {
        try{
            const cart = await Cart.find()
            res.status(200).json(cart)
        }catch(err){
            res.status(500).json(err)
        }
    })
    .post(verifyTokenAndAuthorization, async (req, res) => {
        const newCart = new Cart(req.body);

        try{
           const cart =  await newCart.save();
           res.status(200).json(cart);
        }catch(err){
            res.status(500).json(err);
        }
    })

router.route('/:id')
    //cart update
    .put(verifyTokenAndAuthorization, async (req, res) => {

        try {
            const updateCart = await Cart.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                {
                    new: true
                },
                
            )
            res.status(200).json(updateCart)
        }catch(err){
            return res.status(500).json('err')
        }
    })
// Delete product
    .delete(verifyTokenAndAuthorization, async (req, res) => {
        try{
            await Cart.findByIdAndDelete(req.params.id);
            res.status(200).json('Cart deleted successfully')
        }catch(err){
            res.status(500).json(err)
        }
    })


// get user cart
router.route('/find/:id')
    .get(verifyTokenAndAuthorization, async (req, res) =>{
        try{
            const cart = await Cart.findOne({userId: req.params.id});
            res.status(200).json(cart)
        }catch(err){
            res.status(500).json(err)
        }
    })

module.exports = router