const mongo=require('mongoose')

const task=new mongo.Schema({
    task:{
        type:String,
        required:[true,'Task required'],
        trim:true
    },
    time:{
        type:String,
        required:[true,'Time require']
    }
},{
    timestamps:true
})

module.exports=mongo.model('task',task)