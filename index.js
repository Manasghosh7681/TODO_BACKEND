const express=require('express')
const app=express()
const cors=require('cors')
//middleware
app.use(express.json())  //for json body
app.use(cors({
  origin: "https://todo-frontend-8l6n.onrender.com",
  credentials: true
})); //for cors error

//export
module.exports=app


