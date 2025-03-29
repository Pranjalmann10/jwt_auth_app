const express  = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const config = require('./config');

const app = express();
// 1)middlewares
app.use(cors());
app.use(express.json());
//2) routes
app.use('/api/auth', authRoutes);

// 3) mongo db connection
mongoose
.connect('mongodb://127.0.0.1:27017/authentication')
.then(() => console.log('connected to mongoDB!'))
.catch((error) => console.log('error connecting to mongoDB:', error));


//4) global error handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});



//5) server 
const PORT = config.PORT;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});