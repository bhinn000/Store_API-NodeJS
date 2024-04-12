const { query } = require('express')
const Product=require('../model/product')
const getAllProducts=async(req, res)=>{
    
    // throw new Error('testing async errors')
    // res.status(200).json({msg: 'This is  products'})
    const {featured , company , name}=req.query//extract the value of the property named featured from the req.query object.
    const queryObject={} // this is empty JS object  right now
    if(featured){
        queryObject.featured=featured==='true'?true:false//if there is 'featured ' which came from req.query 
    }
    if(company){
        queryObject.company =company
    }
    if(name){
        // queryObject.name=name
        queryObject.name={$regex:name, $options:'i'}
    }
    console.log(queryObject)
    const products=await Product.find(queryObject)
    res.status(200).json({products , nbHits:products.length})
    
   
}

const getAllProductsStatic=async(req,res)=>{
    const search='s'
    // const products=await Product.find({
    //     // name:'vase table',
    //     name:{$regex:search, $options:'i'}  
    // })

    const products=await Product.find({}).sort('-name')
    res.status(200).json({products , nbHits:products.length})
    // res.status(200).json({msg: 'This is static products'})
  
}

module.exports={getAllProducts , getAllProductsStatic,}