import Contact from "../models/Contact.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermission from "../utils/checksPermission.js";

const createRequest = async (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    throw new BadRequestError("Please Provide All Values");
  }
  const request = await Contact.create(req.body);
  res.status(StatusCodes.CREATED).json({ request });
};

const deleteRequest = async (req, res) => {
  const { id: requestId } = req.params;

  const request = await Contact.findOne({ _id: requestId });

  if (!request) {
    throw new NotFoundError(`No request with id : ${requestId}`);
  }

  await request.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Request removed" });
};

const getAllRequest = async (req, res) => {
  const { purpose, sort } = req.query;

  const queryObject = {};
  if (purpose && purpose !== "all") {
    queryObject.purpose = purpose;
  }
  let result = Contact.find(queryObject);

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("message");
  }
  if (sort === "z-a") {
    result = result.sort("-message");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const requests = await result;

  const totalRequests = await Contact.countDocuments(queryObject);
  const numOfRequestPages = Math.ceil(totalRequests / limit);

  res
    .status(StatusCodes.OK)
    .json({ requests, totalRequests, numOfRequestPages });
};

export { createRequest, deleteRequest, getAllRequest };
