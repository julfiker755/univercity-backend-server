import {NextFunction, Request, Response } from 'express';
import httpStatus from "http-status";

const globalErrorHandler=(err:any,req:Request,res:Response,next:NextFunction):any=>{
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success:false,
        message:err.message ||  "Something went Wrong!",
        error:err,
       })
}

export default globalErrorHandler