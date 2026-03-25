import express from 'express';
import {
  createMinistry,
  getAllMinistries,
  getMinistryBySlug,
  updateMinistry,
  deleteMinistry,
} from '../controllers/ministryController.js';
import authenticateUser from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.route('/').get(getAllMinistries);
router.route('/:slug').get(getMinistryBySlug);

// Protected routes (Admin / Ministry Leaders)
router.route('/').post(authenticateUser, createMinistry);
router.route('/:id').patch(authenticateUser, updateMinistry).delete(authenticateUser, deleteMinistry);

export default router;