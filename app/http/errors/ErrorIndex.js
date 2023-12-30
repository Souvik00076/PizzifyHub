const CustomApiError=require('./CustomApiError')
const BadRequestError=require('./BadRequest')
const UnauthenticatedError=require('./Unauthenticated')
const Conflict=require('./Conflict')
const InternalServerError=require('./InternalServer')

module.exports={
    CustomApiError,
    BadRequestError,
    UnauthenticatedError,
    Conflict,
    InternalServerError
}