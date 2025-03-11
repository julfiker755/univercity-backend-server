import mongoose from "mongoose";
import httpStatus from "http-status";

const hanldeCastError=(err:mongoose.Error.CastError)=>{
    const errorSources=[{
        path:err.path,
        message:err.message
    }]
    return {
        statusCode:httpStatus.BAD_REQUEST,
        message:"Invaild ID",
        errorSources,
    }
}

export default hanldeCastError