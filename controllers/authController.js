import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import attachCookie from "../utils/attachCookie.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("please provide all values");
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("email already exists");
  }
  const user = await User.create({ name, email, password });
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
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email }).select("+password");

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

  res.status(StatusCodes.OK).json({ user, position: user.position });
};
const updateUser = async (req, res) => {
  const { email, name, lastname, position } = req.body;
  if (!email || !name || !lastname || !position) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ _id: req.user.userId });

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

const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json({ user, position: user.position });
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
export { register, login, updateUser, getCurrentUser, logout };
