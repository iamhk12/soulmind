// models/note.js

import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  email: { type: String },
  data : {type : String}
});

export default mongoose.models.Note || mongoose.model('Note', noteSchema);
