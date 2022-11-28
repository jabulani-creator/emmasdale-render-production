import mongoose from "mongoose";
import validator from 'validator'

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Provide Name'],
        minlength: 3,
        maxlength: 30,
    },
   email: {
       type: String,
       unique: true,
       validate: {
           validator: validator.isEmail,
           message: 'Please provide a valid email'
       }
   },
   phone: {
       type: String, 
       required: [true, 'Please Provide Email'],
   }, 
   purpose: {
    type: String,
    enum: ['prayer', 'baptism', 'membership', 'wedding'],
    default: 'prayer',
  },
  day: {
    type: String
  },
  message: {
      type: String
  }
     
},{timestamps: true})

export default mongoose.model('Contact', ContactSchema)