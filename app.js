const Client = require('./db/db.config');
const express = require('express');
const cors = require('cors');
const sequelize = require('./db/db.config');
const userRoutes = require('../backend/routes/userRoutes');
const orderRoutes = require('../backend/routes/orderRoutes');
const dotenv = require('dotenv');
const getOrders  = require('../backend/routes/getOrdersRoutes');
const  addToCart  = require('../backend/routes/cartRoutes');
const createProduct = require('../backend/routes/productRoutes');
const checkoutRoutes = require('../backend/routes/checkoutRoutes');
const logout = require('../backend/routes/logoutRoutes');
const authMiddleware = require('../backend/middleware/authmiddleware');
const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5100',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-type', 'Authorization'],
    credentials: true
}));
dotenv.config();

(async () => {
    try {
        await sequelize.sync();
        console.log('successfully.');
    } catch (error) {
        console.error('Unable to synchronize the database:', error);
    }
})();

app.use('/api', userRoutes);
app.use('/api',authMiddleware, orderRoutes);
app.use('/api',authMiddleware, getOrders);
app.use('/api',authMiddleware, addToCart);
app.use('/api',authMiddleware, createProduct);
app.use('/api',authMiddleware, checkoutRoutes);
app.use('/api', logout);
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`server port ${PORT}`);
});
