// require mongoose
const mongoose = require('mongoose');

// connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error.message}`);
    }
}

//export the connection function
module.exports = connectDB