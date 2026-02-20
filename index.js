const express=require('express')
const app=express()
const cors=require('cors')
//middleware
app.use(express.json())  //for json body
app.use(cors())  //for cors error

//export
module.exports=app


