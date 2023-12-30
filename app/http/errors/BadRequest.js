

const {HttpStatusCode} =require('http-status-codes')
const CustomApiError=require('./CustomApiError')
class BadRequestError extends CustomApiError{
    constructor(message){
        super(message)
    this.statusCode=HttpStatusCode.BadRequest
    }
}

module.exports=BadRequestError