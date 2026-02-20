const mongo=require('mongoose')

const dbConnection=async()=>{
    try{
        await mongo.connect(process.env.MONGO_URL)
        console.log('Database connected Succesfully')
    }catch(err){
        console.log(err.message)
        process.exit(1)
    }
}
module.exports=dbConnection;