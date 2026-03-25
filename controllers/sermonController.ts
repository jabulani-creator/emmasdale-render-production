import Sermon from "../models/Sermon";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors";
import checkPermission from "../utils/checksPermission";

// Create a new sermon/livestream link
export const createSermon = async (req: any, res: any) => {
  const { title, youtubeLink, category } = req.body;

  if (!title || !youtubeLink || !category) {
    throw new BadRequestError("Please provide all required fields");
  }

  req.body.createdBy = req.user.userId;

  // If this new sermon is marked as "live", set all other sermons to not live
  if (req.body.isLive === 'true' || req.body.isLive === true) {
    await Sermon.updateMany({}, { isLive: false });
  }

  const sermon = await Sermon.create(req.body);
  res.status(StatusCodes.CREATED).json({ sermon });
};

// Get all sermons (Public)
export const getAllSermons = async (req: any, res: any) => {
  const { category, isLive } = req.query;

  const queryObject: any = {};
  if (category && category !== "all") {
    queryObject.category = category;
  }
  if (isLive === "true") {
    queryObject.isLive = true;
  }

  let result = Sermon.find(queryObject).sort("-createdAt");
  const sermons = await result;

  res.status(StatusCodes.OK).json({ sermons, totalSermons: sermons.length });
};

// Delete a sermon
export const deleteSermon = async (req: any, res: any) => {
  const { id: sermonId } = req.params;

  const sermon = await Sermon.findOne({ _id: sermonId });

  if (!sermon) {
    throw new NotFoundError(`No sermon with id :${sermonId}`);
  }

  checkPermission(req.user, sermon.createdBy);

  await sermon.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "Success! Sermon removed" });
};
