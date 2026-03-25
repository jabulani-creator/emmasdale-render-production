import Post from "../models/Post.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermission from "../utils/checksPermission.js";
import cloudinary from "cloudinary";

const createPost = async (req: any, res: any) => {
  const { postTitle, postDesc } = req.body;
  const result = await new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload_stream(
      { use_filename: true, folder: "emmsadale-church" } as any,
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(req.file.buffer);
  }) as any;

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
const deletePost = async (req: any, res: any) => {
  const { id: postId } = req.params;

  const post = await Post.findOne({ _id: postId });

  if (!post) {
    throw new NotFoundError(`No post with id ${postId}`);
  }

  checkPermission(req.user, post.createdBy);
  await cloudinary.v2.uploader.destroy(post.cloudinary_id as string);
  await post.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "Success! post removed" });
};
const getAllPosts = async (req: any, res: any) => {
  const { search, sort } = req.query;

  const queryObject: any = {};

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
const updatePost = async (req: any, res: any) => {
  const { id: postId } = req.params;
  const { postTitle, postDesc } = req.body;

  const post = await Post.findOne({ _id: postId });

  if (!post) {
    throw new NotFoundError(`No Post with id ${postId}`);
  }
  checkPermission(req.user, post.createdBy);

  let result: any;
  if (req.file) {
    result = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload_stream(
        { use_filename: true, folder: "emmsadale-church" } as any,
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(req.file.buffer);
    });
    
    // Optionally destroy the old image here if needed
    // if (post.cloudinary_id) {
    //   await cloudinary.v2.uploader.destroy(post.cloudinary_id);
    // }
  }

  const updatedPost = await Post.findByIdAndUpdate(
    { _id: postId },
    {
      postTitle,
      postDesc,
      ...(result && {
        postPhoto: result.secure_url,
        cloudinary_id: result.public_id,
      }),
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedPost });
};

const getPost = async (req: any, res: any) => {
  const { id: postId } = req.params;
  const post = await Post.findById({ _id: postId });
  if (!post) {
    throw new NotFoundError(`No Post with id ${postId}`);
  }

  res.status(StatusCodes.OK).json(post);
};

export { createPost, deletePost, getAllPosts, updatePost, getPost };
