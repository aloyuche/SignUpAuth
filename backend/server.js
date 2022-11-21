const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()


mongoose.connect(process.env.MONGO_URL).then(()=> console.log('Server is connected to MongoDB')).catch((err)=console.log(err))

app.listen(process.env.PORT, console.log(`Server is running on port ${process.env.PORT}`))