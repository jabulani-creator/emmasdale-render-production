import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.ts";
import attachCookie from "../utils/attachCookie.ts";

const register = async (req: any, res: any) => {
  // Now we can trust req.body because the validateBody middleware already parsed it
  const { name, email, password } = req.body;

  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("email already exists");
  }
  const user = await User.create({ name, email, password }) as any;
  const token = user.createJWT();
  attachCookie({ res, token });
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastname: user.lastname,
      position: user.position,
      name: user.name,
    },
    position: user.position,
  });
};

const login = async (req: any, res: any) => {
  // Now we can trust req.body because the validateBody middleware already parsed it
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password") as any;

  if (!user) {
    throw new UnauthenticatedError("invalid credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  // login controller

  const token = user.createJWT();
  user.password = undefined;
  attachCookie({ res, token });

  res.status(StatusCodes.OK).json({ 
    user: {
      email: user.email,
      name: user.name,
      lastname: user.lastname,
      position: user.position,
      role: user.role // explicitly include role
    }, 
    position: user.position 
  });
};

const updateUser = async (req: any, res: any) => {
  // Now we can trust req.body because the validateBody middleware already parsed it
  const { email, name, lastname, position } = req.body;

  const user = await User.findOne({ _id: req.user.userId }) as any;

  user.email = email;
  user.name = name;
  user.lastname = lastname;
  user.position = position;

  await user.save();

  const token = user.createJWT();
  attachCookie({ res, token });
  res.status(StatusCodes.OK).json({
    user,
    position: user.position,
  });
};

const getCurrentUser = async (req: any, res: any) => {
  const user = await User.findOne({ _id: req.user.userId }) as any;
  res.status(StatusCodes.OK).json({ 
    user: {
      email: user.email,
      name: user.name,
      lastname: user.lastname,
      position: user.position,
      role: user.role // Explicitly include the role
    }, 
    position: user.position 
  });
};

const logout = async (req: any, res: any) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

// Admin route to create new leaders
const addLeader = async (req: any, res: any) => {
  // Ensure the requesting user is a superadmin or admin
  const requestUser = await User.findOne({ _id: req.user.userId }) as any;
  if (!requestUser || (requestUser.role !== 'superadmin' && requestUser.role !== 'admin')) {
    throw new UnauthenticatedError("Not authorized to perform this action");
  }

  const { name, email, password, position, lastname, category } = req.body;

  if (!name || !email || !password || !position || !category) {
    throw new BadRequestError("Please provide all required fields");
  }

  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already exists");
  }

  // Create the new user. The pre-save hook in User.ts will automatically
  // assign the correct role based on the position provided.
  const newUser = await User.create({ 
    name, 
    lastname: lastname || 'lastname',
    email, 
    password,
    position,
    category 
  }) as any;

  res.status(StatusCodes.CREATED).json({
    msg: "Leader successfully created",
    user: {
      email: newUser.email,
      name: newUser.name,
      position: newUser.position,
      category: newUser.category,
      role: newUser.role
    }
  });
};

export { register, login, updateUser, getCurrentUser, logout, addLeader };
