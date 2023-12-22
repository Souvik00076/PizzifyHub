const express=require('express')
const app=express()
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
app.use(express.json())
app.use(expressLayouts)
app.set('views',viewsPath)
app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'/public')))
const PORT=process.env.PORT||3000
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

app.use(flash())
//global middleware
app.use((req,res,next)=>{
    res.locals.session=req.session
    next()
})
//routers declared here
//Don't ever put routes before session....it wont ever work..wasted 5 hours
const homeRouter=require('./routes/home')
const authRouter=require('./routes/auth')
const cartRouter=require('./routes/customers/cart')
const adminRoute=require('./routes/admin')
app.use('/',homeRouter)
app.use('/auth/',authRouter)
app.use('/cart',cartRouter)
app.use('/admin',adminRoute)
const startServer=async ()=>{
    try{
        await connectDb(process.env.MONGO_URI)
     
        app.listen(PORT,console.log(`Server Started At PORT number ${PORT}`))
    }catch(error){
        console.log(error)
    }
}
startServer()