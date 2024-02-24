// models/post.js

import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  name: { type: String },
  story: { type: String, required: true },
  supports: { type: Number, default: 0 },
});

export default mongoose.models.Post || mongoose.model('Post', postSchema);
