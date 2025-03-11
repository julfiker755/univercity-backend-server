import mongoose from "mongoose";
import httpStatus from "http-status";


const hanldeValidationError=(err:mongoose.Error.ValidationError)=>{
    const  errorSources=Object.values(err.errors).map((val:any)=>{
        return {
            path:val?.path,
            message:val?.message
        }
    })
    return {
        statusCode:httpStatus.BAD_REQUEST,
        message:"Validation Error",
        errorSources,
    }
}

export default hanldeValidationError