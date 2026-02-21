const express=require('express')
const app=express()
const cors=require('cors')
//middleware
app.use(express.json())  //for json body
// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "https://todo-frontend-8l6n.onrender.com"
//   ],
//   credentials: true
// })); //for cors error

app.use(cors({ origin: [ "http://localhost:5173", "https://todo-frontend-8l6n.onrender.com" ], methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], allowedHeaders: ["Content-Type", "Authorization"], credentials: true }));

//export
module.exports=app


