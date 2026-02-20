const mongo=require('mongoose')

//schema for Registration

const RegisterSchema=new mongo.Schema({
    email:{
        type:String,
        required:[true,'Email required'],
        match:/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required:[true,'Password required'],
        match:[/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{6,}$/,'Password Must contain All things'],
        minlength:6,
        trim:true,
    },
    gender:{
        type:String,
        enum:['Male','Female'],
        required:[true,'Gender required']
    },
    Qualification:{
        type:String,
        enum:['plusTwo','ten','Graduation','Master degree'],
        required:[true,'Qualification required']
    },
    language:{
        type:[String],
        enum:['Hindi','Odia','English'],
        default:[]
    },
   
},{
    timestamps:true,
})

module.exports=mongo.model('Register',RegisterSchema)