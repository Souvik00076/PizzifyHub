const express=require('express')
const app=express()
var bodyParser = require('body-parser');
const ejs=require('ejs')
const path=require('path')
const cookieParser=require('cookie-parser')
const session=require('express-session')
const mongoDbStore=require('connect-mongo')
const connectDb=require('./app/config/connection')
const expressLayouts=require('express-ejs-layouts')
const flash=require('express-flash')
const viewsPath=path.join(__dirname,'/resources/views')
require('dotenv').config()
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use(expressLayouts)
app.set('views',viewsPath)
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'/public')))
const PORT=process.env.PORT||3300
const passport=require('passport')
const guest=require('./app/http/middleware/guest')
const authMiddleware=require('./app/http/middleware/auth')  
const adminMiddleware=require('./app/http/middleware/admin')
 
app.use(flash())


//session store
const mongoStore=new mongoDbStore({
    mongoUrl:process.env.MONGO_URI,
    collection:'sessions'
})

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,      
    store:mongoStore,  
    saveUninitialized: false,  
    cookie: { maxAge: 1000*60*60*24 }   
  }))

  //put all passport code after session implementation
const passportInit=require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())





//global middleware
app.use((req,res,next)=>{  
    res.locals.session=req.session
    res.locals.user=req.user
    next()
})
//routers declared here
//Don't ever put routes before session....it wont ever work..wasted 5 hours
const homeRouter=require('./routes/home')
const authRouter=require('./routes/auth')
const cartRouter=require('./routes/customers/cart')
const adminRoute=require('./routes/admin/admin')
const orderRouter=require('./routes/customers/order')
app.use('/',homeRouter)
app.use('/auth',guest,authRouter)
app.use('/cart',cartRouter)
app.use('/admin',adminMiddleware,adminRoute)
app.use('/:id',authMiddleware,orderRouter)


const startServer=async ()=>{
    try{
        await connectDb(process.env.MONGO_URI)
        app.listen(PORT,console.log(`Server Started At PORT number ${PORT}`))
    }catch(error){
        console.log(error)
    }
}
startServer()