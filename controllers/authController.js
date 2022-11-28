import User from '../models/User.js'
import {StatusCodes} from 'http-status-codes'
import {BadRequestError, UnauthenticatedError} from '../errors/index.js'


const register = async (req, res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password){
       throw new BadRequestError('please provide all values')
    }
    const userAlreadyExists = await User.findOne({email})
    if(userAlreadyExists){
        throw new BadRequestError('email already exists')
    }
    const user = await User.create({name, email, password})
    const token = user.createJWT()
    res.status(StatusCodes.CREATED)
    .json({
        user: {
          email: user.email,
          lastname: user.lastname,
          position: user.position,
          name: user.name},
          token,
          position: user.position,
        })
   
}
const login = async (req, res) => {
    const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Please provide all values')
  }
    const user = await User.findOne({email}).select('+password')

    if(!user){
        throw new UnauthenticatedError('invalid credentials')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials')
      }
    
      const token = user.createJWT()
      user.password = undefined
    res.status(StatusCodes.OK).json({user, token, position: user.position})
}
const updateUser = async (req, res) => {
  const { email, name, lastname, position } = req.body
  if(!email || !name || !lastname || !position){
    throw new BadRequestError('Please provide all values')
  }

  const user = await User.findOne({_id: req.user.userId})

  user.email = email
  user.name = name
  user.lastname = lastname
  user.position = position;

  await user.save()

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({
    user,
    token,
    position: user.position,
  })
}

export {register, login, updateUser}