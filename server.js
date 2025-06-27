// require express
const express = require('express');


//create an instance of express
const app = express();

const cors = require("cors");

app.use(
  cors ({
    origin: "http://localhost:5173",
    credentials: true,
  })
)

//require body-parser
app.use(express.json());

// dotenv config
require('dotenv').config();

app.use((req,res) => {
  res.send("API is running ...")
})

//PORT configuration
const PORT = process.env.PORT || process.env.PORT_2 || 7666

//create server

app.listen(PORT, (error) => {
    error
      ? console.log(`Error in server: ${error}`)
      : console.log(`⚡⚡⚡ Server is running on http://127.0.0.1:${PORT}`);

})

// connect to MongoDB
const connectDB = require('./config/connectDB');
const { applyTimeStamps } = require('./models/computerModel')
connectDB()

// import routes
app.use('/api/computers', require('./routes/computerRoutes'));

app.use('/api/auth', require('./routes/authRoutes'));

app.use('/api/users', require('./routes/userRoutes'));