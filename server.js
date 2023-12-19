const express=require('express')
const app=express()
const ejs=require('ejs')
const expressLayouts=require('express-ejs-layouts')
const path=require('path')
const PORT=process.env.PORT||3000
const viewsPath=path.join(__dirname,'/resources/views')
app.use(express.static(path.join(__dirname,'/public')))

app.set('view engine','ejs')
app.set('views',viewsPath)
app.get('/',(req,res)=>{
    res.render("home")
})


app.listen(PORT,()=>{
    console.log(`server listening at PORT ${PORT}`)
})
