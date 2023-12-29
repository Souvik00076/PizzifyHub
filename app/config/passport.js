
const LocalStrategy=require('passport-local').Strategy
const User=require('../models/User')


const getSessionId=async (id,done)=>{
    const user=await User.findById(id)
    if(user) return done(null,user)
}


const storeSessionID=(user,done)=>{
    done(null,user._id)
}


const authenticateUser=async (email,password,done)=>{
   
    const user=await User.findOne({email:email})
    if(!user){
        return done(null,false,{message:`No user with this email`})
    }

    if(user.match(password)){
        console.log('in match ',user._id)
         done(null,user,{message:`Logged In Successfully`})
    }else

    done(null,false,{message : `Wrong username or password`})
}

const init=(passport)=>{
    
    passport.use(new LocalStrategy({usernameField:'email'},authenticateUser))
    //if usr is logged in , passport gives chance to store something in session
    passport.serializeUser(storeSessionID)
    //to retrive session data
    passport.deserializeUser(getSessionId)
    
}



module.exports=init