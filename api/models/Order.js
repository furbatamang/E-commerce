const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    products: [
        {
            title:{
                type: String
            },
            quantity:{
                type: Number,
                default: 1   
            }
        }
    ],
    amount:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        default: 'pending'
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model('Order', OrderSchema)