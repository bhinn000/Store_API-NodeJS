//required
require('dotenv').config()
require('express-async-errors')
const express=require('express')
const app=express()
const notFoundMiddleware=require('./middleware/not-found')
const errorHandlerMiddleware=require('./middleware/error-handler')
const connectDB=require('./db/connect')
const productsRouter=require('./routes/products')

//middleware
app.use(express.json())
app.use('/api/v1/products', productsRouter)

//routes
app.get('/',(req,res)=>{
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products</a>')
})

// Error handling middleware should come after routes
app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

// connect to db
const port=process.env.PORT || 300 //3002 rakha yedi namile
const start=async()=>{
    try{
        // app.listen(port, `Server is listening to  ${port}`)
        await connectDB(process.env.MONGO_URI)//this is brought from 'db' folder
        //now , until you are connected with db this won't run
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
          });
          
    }
    catch(error){
        console.log(error)
    }
}
start()
