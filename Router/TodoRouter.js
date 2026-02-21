const express=require('express')
const Router=express.Router()
const {createUser,loginUser,createTask,showTask,updateTask,deleteTask,verifyRefreshToken}=require('../Controller/TodoController')
const {requiredData,AuthValid,IdRequired}=require('../Middleware/TodoValidate')

Router.post('/Register',requiredData,createUser)
Router.post('/login',requiredData,loginUser)
Router.post('/create',AuthValid,createTask)
Router.post('/task',AuthValid,showTask)
Router.post('/update',AuthValid,IdRequired,updateTask)
Router.post('/delete',AuthValid,IdRequired,deleteTask)
Router.post('/refresh',verifyRefreshToken)

module.exports=Router