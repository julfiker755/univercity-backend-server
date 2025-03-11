import {ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { TErrorSource } from '../interface/error';
import config from '../config';
import handleZodError from './handlezodError';
import hanldeValidationError from './handlevalidation';
import hanldeCastError from './hanldeCastError';
import hanldeDuplicateError from './hanldeDuplicateError';
import ApiError from './apiError';

const globalErrorHandler:ErrorRequestHandler=(err:any,req:Request,res:Response,next:NextFunction):any=>{
    let statusCode= 500 
    let message= err.message ||  "Something went Wrong!"
    let errorSources:TErrorSource=[{
        path:'',
        message: "Something went wrong"
    }]


    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }else if(err?.name ==="ValidationError"){
        const simplifiedError= hanldeValidationError(err)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }else if(err.name === "CastError"){
        const simplifiedError= hanldeCastError(err)
        statusCode = simplifiedError.statusCode; 
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }else if(err.code === 11000){
        const simplifiedError= hanldeDuplicateError(err)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }else if(err instanceof ApiError){
        statusCode =err.statusCode;
        message = err.message;
        errorSources = [{
            path:'',
            message:err.message
        }]
    }else if(err instanceof Error){
        message = err.message;
        errorSources = [{
            path:'',
            message:err.message
        }]
    }

    return res.status(statusCode).json({
        success:false,
        message:message,
        errorSources:errorSources,
        stack:config.node_env === "development" ? err?.stack :null,
        err
       })
}

export default globalErrorHandler