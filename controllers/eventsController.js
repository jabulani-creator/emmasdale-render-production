import Event from "../models/Event.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermission from "../utils/checksPermission.js";
import cloudinary from "cloudinary";

const createEvent = async (req, res) => {
  const { eventTitle, eventDate, venue, time } = req.body;
  const result = await cloudinary.v2.uploader.upload(req.file.path, {
    use_filename: true,
    folder: "emmsadale-church",
  });
  if (!eventTitle || !eventDate || !venue || !time) {
    throw new BadRequestError("Please Provide All Values");
  }

  //   req.body.createdBy = req.user.userId;

  const event = await Event.create({
    eventTitle,
    eventDate,
    venue,
    time,
    eventPhoto: result.secure_url,
    cloudinary_id: result.public_id,
    createdBy: req.user.userId,
  });
  res.status(StatusCodes.CREATED).json({ event });
};
const deleteEvent = async (req, res) => {
  const { id: eventId } = req.params;

  const event = await Event.findOne({ _id: eventId });

  if (!event) {
    throw new NotFoundError(`No event with id ${eventId}`);
  }

  checkPermission(req.user, event.createdBy);

  await cloudinary.v2.uploader.destroy(event.cloudinary_id);
  await event.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Event removed" });
};
const getAllEvents = async (req, res) => {
  const events = await Event.find().sort({ eventDate: 1 });

  res
    .status(StatusCodes.OK)
    .json({ events, totalEvents: events.length, numOfEventsPages: 1 });
};
const updateEvent = async (req, res) => {
  const { id: eventId } = req.params;

  const { eventTitle, eventDate, venue, time } = req.body;

  if (!eventTitle || !eventDate || !venue || !time) {
    throw new BadRequestError("Please Provide All Values");
  }

  let event = await Event.findOne({ _id: eventId });

  if (!event) {
    throw new NotFoundError(`No event with id ${eventId}`);
  }

  checkPermission(req.user, event.createdBy);
  await cloudinary.v2.uploader.destroy(event.cloudinary_id, {
    use_filename: true,
    folder: "emmsadale-church",
  });
  let result;
  if (req.file) {
    result = await cloudinary.v2.uploader.upload(req.file.path, {
      use_filename: true,
      folder: "emmsadale-church",
    });
  }

  event = await Event.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      eventPhoto: result?.secure_url || event.eventPhoto,
      cloudinary_id: result?.public_id || event.cloudinary_id,
    },
    { new: true }
  );
  res.status(StatusCodes.OK).json({ event });
};

const getEvent = async (req, res) => {
  const { id: eventId } = req.params;
  const event = await Event.findById({ _id: eventId });
  if (!event) {
    throw new NotFoundError(`No Event with id ${eventId}`);
  }

  res.status(StatusCodes.OK).json(event);
};

export { createEvent, deleteEvent, getAllEvents, updateEvent, getEvent };
