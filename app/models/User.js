const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        minLength:3,
        required:[true,'Name cannot be empty']
    },
    email:{
        type:String,
        match:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        required:[true,"Email cannot be empty"],
        unique:[true,"Email already present"]
    },
    password:{
        type:String,
        minLength:3,
        required:[true,"Password cannot be empty"]
    }
},{timestamps:true})


userSchema.methods.getName=function(){
    return this.name
}

userSchema.methods.getEmail=function(){
    return this.email
}

userSchema.pre('save', async function(next) {
    console.log(this.name+" "+this.email)
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10); // Adjust salt rounds as needed
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.methods.match=async function(creadential){
    const isMatch=await bcrypt.compare(creadential,this.password)
    return isMatch
}

const UserModel=mongoose.model("Users",userSchema)
module.exports=UserModel