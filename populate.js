const connectDB=require('./db/connect')
const Product=require('./model/product')
const jsonProduct=require('./products.json')
require('dotenv').config()

const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany()
        await Product.create(jsonProduct)
        console.log("Populate Success")
        process.exit(0)
    }
    catch(error){
        console.log(error)
        process.exit(1)
    }
}

start()