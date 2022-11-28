import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    email:{
        type: String,
        required: [true, 'Please provide email'],
        unique: true,
        validate:{
            validator: validator.isEmail,
            message: 'please provide valid email'
        }
    },
    password:{
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6,
        select: false,
    },
    lastname:{
        type: String,
        trim: true,
        maxlength: 20,
        default: 'lastname',
    },
    position:{
        type: String,
        trim: true,
        maxlength: 20,
        default: 'department head',
    },

})

UserSchema.pre('save', async function(){
    const user = this
    if(!user.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
})

UserSchema.methods.createJWT = function(){
    const user = this
    return jwt.sign({userId: user._id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME})
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
    const user = this
    const isMatch = await bcrypt.compare(candidatePassword, user.password)
    return isMatch
}

export default mongoose.model('User', UserSchema)