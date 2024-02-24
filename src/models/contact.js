// models/contact.js

import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  subject: { type: String },
  message: { type: String },
});

export default mongoose.models.Contact || mongoose.model('Contact', contactSchema);
