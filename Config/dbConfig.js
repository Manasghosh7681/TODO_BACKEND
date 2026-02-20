const mongo=require('mongoose')

const dbConnection=async()=>{
    try{
        await mongo.connect('mongodb://localhost:27017/Manas')
        console.log('Database connected Succesfully')
    }catch(err){
        console.log(err.message)
        process.exit(1)
    }
}
module.exports=dbConnection;