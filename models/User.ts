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
            validator: validator.isEmail as any,
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
        maxlength: 50, // Increased to allow longer titles like "Senior Assistant Director"
        default: 'department head',
    },
    category: {
        type: String,
        enum: ['Pastoral Staff', 'Church Elders', 'Department Heads', 'General Workers'],
        default: 'Department Heads',
    },
    role: {
        type: String,
        enum: ['leader', 'admin', 'superadmin'],
        default: 'leader',
    }
})

UserSchema.pre('save', async function(){
    const user = this as any
    
    // Automatically assign roles based on position
    const adminPositions = ['admin elder', 'church clerk', 'communication leader'];
    const superAdminPositions = ['developer', 'webmaster', 'superadmin'];

    if (user.position && superAdminPositions.includes(user.position.toLowerCase())) {
        user.role = 'superadmin';
    } else if (user.position && adminPositions.includes(user.position.toLowerCase())) {
        user.role = 'admin';
    } else {
        user.role = 'leader';
    }

    if(!user.isModified('password')) return
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
})

UserSchema.methods.createJWT = function(){
    const user = this as any
    return jwt.sign(
        { userId: user._id, role: user.role }, 
        process.env.JWT_SECRET as string, 
        { expiresIn: process.env.JWT_LIFETIME as any }
    )
}

UserSchema.methods.comparePassword = async function (candidatePassword: string) {
    const user = this as any
    const isMatch = await bcrypt.compare(candidatePassword, user.password)
    return isMatch
}

export default mongoose.model('User', UserSchema)