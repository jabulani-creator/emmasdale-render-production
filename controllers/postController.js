import Post from "../models/Post.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermission from "../utils/checksPermission.js";
import cloudinary from "cloudinary";

const createPost = async (req, res) => {
  const { postTitle, postDesc } = req.body;
  const result = await cloudinary.v2.uploader.upload(req.file.path, {
    use_filename: true,
    folder: "emmsadale-church",
  });

  if (!postTitle || !postDesc) {
    throw new BadRequestError("Please Provide All Values");
  }

  const titleAlreadyExists = await Post.findOne({ postTitle });
  if (titleAlreadyExists) {
    throw new BadRequestError("title already exists");
  }

  // req.body.createdBy = req.user.userId;

  const post = await Post.create({
    postTitle,
    postDesc,
    postPhoto: result.secure_url,
    createdBy: req.user.userId,
    cloudinary_id: result.public_id,
  });

  res.status(StatusCodes.CREATED).json({ post });
};
const deletePost = async (req, res) => {
  const { id: postId } = req.params;

  const post = await Post.findOne({ _id: postId });

  if (!post) {
    throw new CustomError.NotFoundError(`No post with id ${postId}`);
  }

  checkPermission(req.user, post.createdBy);

  await post.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Post removed" });
};
const getAllPosts = async (req, res) => {
  const { search, sort } = req.query;

  const queryObject = {};

  if (search) {
    queryObject.postTitle = { $regex: search, $options: "i" };
  }
  let result = Post.find(queryObject);

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("postTitle");
  }
  if (sort === "z-a") {
    result = result.sort("-postTitle");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 3;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const posts = await result;

  const totalPost = await Post.countDocuments(queryObject);
  const numOfpages = Math.ceil(totalPost / limit);

  res.status(StatusCodes.OK).json({ posts, totalPost, numOfpages });
};
const updatePost = async (req, res) => {
  const { id: postId } = req.params;
  const { postTitle, postDesc } = req.body;
  const postPhoto = req.file.path;

  if (!postTitle || !postDesc) {
    throw new BadRequestError("Please Provide All Values");
  }

  const post = await Post.findOne({ _id: postId });

  if (!post) {
    throw new NotFoundError(`No Post with id ${postId}`);
  }
  checkPermission(req.user, post.createdBy);

  const updatedPost = await Post.findByIdAndUpdate({ _id: postId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ updatedPost });
};

const getPost = async (req, res) => {
  const { id: postId } = req.params;
  const post = await Post.findById({ _id: postId });
  if (!post) {
    throw new NotFoundError(`No Post with id ${postId}`);
  }

  res.status(StatusCodes.OK).json(post);
};

export { createPost, deletePost, getAllPosts, updatePost, getPost };
