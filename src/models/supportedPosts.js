// models/supportedPost.js
import mongoose from 'mongoose';

const supportedPostSchema = new mongoose.Schema({
  email: { type: String },
  supported : {type : Array}
});

export default mongoose.models.supportedPost || mongoose.model('supportedPost', supportedPostSchema);
