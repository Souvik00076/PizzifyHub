

const CustomApiError=require('./CustomApiError')
const {HttpStatusCode}=require('http-status-codes')
class UnauthenticatedError extends CustomApiError{
    constructor(message){
        super(message)
        this.statusCode=HttpStatusCode.UnauthenticatedError
    }
}

module.exports=UnauthenticatedError