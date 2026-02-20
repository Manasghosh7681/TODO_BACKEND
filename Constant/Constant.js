 const Response=(res,statusCode,msg,data=null)=>{
    return(
        res.status(statusCode).json(
            {
            success:true,
            message:msg,
            data
        }
        )
    )
}

 const errorResponse=(res,statusCode,message)=>{
    return res.status(statusCode).json({
        success:false,
        message
    })
}

 const errorHandler=(err,req,res,next)=>{
    return res.status(500).json({
        success:false,
        message:err.message
    })
}

module.exports= {Response,errorHandler,errorResponse}