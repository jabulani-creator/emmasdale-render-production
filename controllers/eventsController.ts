import Event from "../models/Event.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermission from "../utils/checksPermission.js";
import cloudinary from "cloudinary";

const createEvent = async (req: any, res: any) => {
  const { eventTitle, eventDate, venue, time } = req.body;
  const result = await new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload_stream(
      { use_filename: true, folder: "emmsadale-church" } as any,
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(req.file.buffer);
  }) as any;

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
const deleteEvent = async (req: any, res: any) => {
  const { id: eventId } = req.params;

  const event = await Event.findOne({ _id: eventId });

  if (!event) {
    throw new NotFoundError(`No event with id ${eventId}`);
  }

  checkPermission(req.user, event.createdBy);

  await cloudinary.v2.uploader.destroy(event.cloudinary_id as string);
  await event.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "Success! Event removed" });
};
const getAllEvents = async (req: any, res: any) => {
  const events = await Event.find().sort({ eventDate: 1 });

  res
    .status(StatusCodes.OK)
    .json({ events, totalEvents: events.length, numOfEventsPages: 1 });
};
const updateEvent = async (req: any, res: any) => {
  const { id: eventId } = req.params;

  const { eventTitle, eventDate, venue, time } = req.body;

  let event = await Event.findOne({ _id: eventId });

  if (!event) {
    throw new NotFoundError(`No event with id ${eventId}`);
  }

  checkPermission(req.user, event.createdBy);
  await cloudinary.v2.uploader.destroy(event.cloudinary_id as string, {
    use_filename: true,
    folder: "emmsadale-church",
  } as any);
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

const getEvent = async (req: any, res: any) => {
  const { id: eventId } = req.params;
  const event = await Event.findById({ _id: eventId });
  if (!event) {
    throw new NotFoundError(`No Event with id ${eventId}`);
  }

  res.status(StatusCodes.OK).json(event);
};

export { createEvent, deleteEvent, getAllEvents, updateEvent, getEvent };
