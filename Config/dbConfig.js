const mongo=require('mongoose')
require('dotenv').config()
const dbConnection=async()=>{
    try{
        // await mongo.connect(process.env.MONGO_URL)
        await mongo.connect('mongodb://localhost:27017/Manas')
        console.log('Database connected Succesfully')
    }catch(err){
        console.log(err.message)
        process.exit(1)
    }
}
module.exports=dbConnection;