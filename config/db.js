const mongoose=require('mongoose')
require('dotenv').config()
// const connection=mongoose.connect(`mongodb+srv://subhashree:subhashree@cluster0.68k2orm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
 const connection=mongoose.connect(process.env.URL)

module.exports={
    connection
}