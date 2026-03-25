import mongoose from 'mongoose';

const MinistrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide ministry name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    themeColor: {
      type: String,
      default: 'teal', // Default accent color for the frontend
    },
    
    // Core Identity (Hero Section)
    hero: {
      image: { type: String, default: '' },
      logo: { type: String, default: '' },
      motto: { type: String, default: '' },
      description: { type: String, default: '' },
    },

    // Dynamic Content Blocks
    // Leaders can add multiple blocks of different types (text, gallery, features, faq)
    contentBlocks: [
      {
        blockType: {
          type: String,
          enum: ['text', 'gallery', 'features', 'faq'],
          required: true,
        },
        order: { type: Number, default: 0 },
        // Mixed type allows storing flexible JSON data based on the blockType
        data: { type: mongoose.Schema.Types.Mixed },
      },
    ],

    // Specific Ministry Resources (PDFs, Forms)
    resources: [
      {
        title: { type: String },
        fileUrl: { type: String },
      },
    ],

    // Contact & Logistics
    contact: {
      email: { type: String },
      phone: { type: String },
      meetingTime: { type: String },
      meetingLocation: { type: String },
      socialLinks: {
        facebook: { type: String },
        instagram: { type: String },
        twitter: { type: String },
      },
    },

    // Link back to the user who created/manages this page
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Ministry || mongoose.model('Ministry', MinistrySchema);