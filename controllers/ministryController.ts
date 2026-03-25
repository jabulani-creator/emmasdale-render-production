import Ministry from '../models/Ministry.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';
import checkPermissions from '../utils/checksPermission.js';

// @desc    Create a new Ministry page
// @route   POST /api/v1/ministries
// @access  Private (Admin/Leader)
export const createMinistry = async (req, res) => {
  const { name, slug } = req.body;

  if (!name || !slug) {
    throw new BadRequestError('Please provide both name and slug for the ministry');
  }

  // Ensure slug is unique
  const existingMinistry = await Ministry.findOne({ slug });
  if (existingMinistry) {
    throw new BadRequestError('A ministry with this slug already exists. Please choose another.');
  }

  req.body.createdBy = req.user.userId;
  const ministry = await Ministry.create(req.body);
  
  res.status(StatusCodes.CREATED).json({ ministry });
};

// @desc    Get all Ministries (Basic info for lists/directories)
// @route   GET /api/v1/ministries
// @access  Public
export const getAllMinistries = async (req, res) => {
  // Select only basic fields for the directory page to keep the payload light
  const ministries = await Ministry.find({}).select('name slug hero themeColor contact');
  res.status(StatusCodes.OK).json({ ministries, count: ministries.length });
};

// @desc    Get a single Ministry by slug (Full detailed page)
// @route   GET /api/v1/ministries/:slug
// @access  Public
export const getMinistryBySlug = async (req, res) => {
  const { slug } = req.params;
  
  const ministry = await Ministry.findOne({ slug });
  if (!ministry) {
    throw new NotFoundError(`No ministry found with slug: ${slug}`);
  }

  // Ensure content blocks are sorted by order
  if (ministry.contentBlocks && ministry.contentBlocks.length > 0) {
    ministry.contentBlocks.sort((a, b) => a.order - b.order);
  }

  res.status(StatusCodes.OK).json({ ministry });
};

// @desc    Update a Ministry page
// @route   PATCH /api/v1/ministries/:id
// @access  Private (Admin/Leader)
export const updateMinistry = async (req, res) => {
  const { id: ministryId } = req.params;

  const ministry = await Ministry.findOne({ _id: ministryId });
  if (!ministry) {
    throw new NotFoundError(`No ministry found with id: ${ministryId}`);
  }

  // Ensure user has permission to edit this ministry
  checkPermissions(req.user, ministry.createdBy);

  const updatedMinistry = await Ministry.findOneAndUpdate(
    { _id: ministryId },
    req.body,
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({ ministry: updatedMinistry });
};

// @desc    Delete a Ministry page
// @route   DELETE /api/v1/ministries/:id
// @access  Private (Admin/Leader)
export const deleteMinistry = async (req, res) => {
  const { id: ministryId } = req.params;

  const ministry = await Ministry.findOne({ _id: ministryId });
  if (!ministry) {
    throw new NotFoundError(`No ministry found with id: ${ministryId}`);
  }

  checkPermissions(req.user, ministry.createdBy);

  await ministry.remove();
  res.status(StatusCodes.OK).json({ msg: 'Ministry page deleted successfully!' });
};