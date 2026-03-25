import {StatusCodes} from 'http-status-codes'
import { logger } from '../server.ts';
import { Request, Response, NextFunction } from 'express';

const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    // Log the raw error so we can see what went wrong before any formatting
    logger.error({ msg: "Global Error Handler Caught:", error: err });
    
    let defaultError = {
        StatusCode: err.StatusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong, try again later",
    }
    
    // Mongoose validation error
    if(err.name === "ValidationError"){
        defaultError.StatusCode = StatusCodes.BAD_REQUEST
        if (err.errors && typeof err.errors === 'object') {
            const errorValues = Object.values(err.errors) as any[];
            if (errorValues.length > 0 && errorValues[0] && typeof errorValues[0].message === 'string') {
                 defaultError.msg = errorValues.map((item) => item.message).join(',');
            }
        }
    }
    
    // Mongoose duplicate key error
    if(err.code && err.code === 11000){
        defaultError.StatusCode = StatusCodes.BAD_REQUEST
        if (err.keyValue && typeof err.keyValue === 'object') {
            defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`
        }
    }

    // Safely format the msg if it's somehow not a string to prevent map() errors
    if (typeof defaultError.msg !== 'string') {
        try {
           defaultError.msg = JSON.stringify(defaultError.msg);
        } catch(e) {
           defaultError.msg = "An unexpected error occurred";
        }
    }

    res.status(defaultError.StatusCode).json({msg: defaultError.msg})
}

export default errorHandlerMiddleware