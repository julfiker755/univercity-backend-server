import {ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import httpStatus from "http-status";
import { ZodError } from 'zod';
import { TErrorSource } from '../interface/error';
import config from '../config';

const globalErrorHandler:ErrorRequestHandler=(err:any,req:Request,res:Response,next:NextFunction):any=>{
    let statusCode= 500 
    let message= err.message ||  "Something went Wrong!"
     
   
    let errorSources:TErrorSource=[{
        path:'',
        message:''
    }]

    const handleZodError=(err:ZodError)=>{
        const errorSources=err.issues.map((issue:any)=>{
            return {
                path:issue?.path[issue.path.length-1],
                message:issue.message
            }
        })

        return {
            statusCode:httpStatus.BAD_REQUEST,
            message:"Validation Error",
            errorSources,
        }
    }

    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }

    return res.status(statusCode).json({
        success:false,
        message:message,
        errorSources:errorSources,
        stack:config.node_env === "development" ? err?.stack :null
       })
}

export default globalErrorHandler