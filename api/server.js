const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const cors = require('cors');
dotenv.config();
const app = express();
  
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    app.listen(3001, () => {
        console.log('Listening to port 3001')
    })
})
.catch(err => console.log(err)) 



// Middlewares
app.use(express.json());
app.use(cors());
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);