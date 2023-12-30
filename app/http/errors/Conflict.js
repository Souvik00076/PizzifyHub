const CustomApiError=require('./CustomApiError')
const {HttpStatusCode}=require('http-status-codes')
class Conflict extends CustomApiError{
    constructor(message){
        super(message)
        this.statusCode=HttpStatusCode.Conflict
    }
}

module.exports=Conflict