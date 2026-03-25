import {StatusCodes} from 'http-status-codes'
import CustomAPIError from './custom-api.ts'

class UnauthenticatedError extends CustomAPIError {
    constructor(message: string){
        super(message)
         this.StatusCode = StatusCodes.UNAUTHORIZED
    } 
}

export default UnauthenticatedError