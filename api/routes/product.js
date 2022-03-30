const router = require('express').Router();
const Product = require('../models/Product');
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken');

//product crud operation

// Create Product
router.route('/')
    // get all products
    .get(async (req, res) => {
        const query = req.query.new;
        const qcategory = req.query.category;
        try{
            let product;
            if(query){
                product = await Product.find().sort({createdAt: -1}).limit(5);
            }else if(qcategory){
                product = await Product.find({
                    categories:{
                        $in:[qcategory]
                    }
                })
            }else{
                product = await Product.find();
            }
            res.status(200).json(product)
        }catch(err){
            res.status(500).json(err)
        }
    })
    .post(verifyTokenAndAdmin, async (req, res) => {
        const newProduct = new Product(req.body);
        
        try{
           const product =  await newProduct.save();
           res.status(200).json(product);
        }catch(err){
            res.status(500).json(err);
        }
    })

router.route('/:id')
    //post update
    .put(verifyTokenAndAdmin, async (req, res) => {

        try {
            const updateProduct = await Product.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                {
                    new: true
                },
                
            )
            res.status(200).json(updateProduct)
        }catch(err){
            return res.status(500).json('err')
        }
    })
// Delete product
    .delete(verifyTokenAndAdmin, async (req, res) => {
        try{
            await Product.findByIdAndDelete(req.params.id);
            res.status(200).json('Product deleted successfully')
        }catch(err){
            res.status(500).json(err)
        }
    })


// get product
router.route('/find/:id')
    .get(async (req, res) =>{
        try{
            const product = await Product.findById(req.params.id);
            res.status(200).json(product)
        }catch(err){
            res.status(500).json(err)
        }
    })

module.exports = router;