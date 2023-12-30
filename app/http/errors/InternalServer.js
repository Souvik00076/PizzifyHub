const CustomApiError=require('./CustomApiError')
const {HttpStatusCode}=require('http-status-codes')
class InternalServerError extends CustomApiError{
    constructor(message){
        super(message)
        this.statusCode=HttpStatusCode.InternalServerError
    }
}

module.exports=InternalServerError