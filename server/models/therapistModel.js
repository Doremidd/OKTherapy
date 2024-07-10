const mongoose = require('mongoose');

const therapistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 0,
    max: 100,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'non-binary', 'other'],
    required: true,
  },
  certification: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  areaOfPractice: {
    type: [String],
    required: true,
  },
  approachesUsed: {
    type: [String],
    required: true,
  },
  fee: {
    type: Number,
    required: true,
  },
  onlineAvailability: {
    type: String,
    enum: ['Yes', 'No'],
    required: true,
  },
  inPersonAvailability: {
    type: String,
    enum: ['Yes', 'No'],
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
  }
});

const Therapist = mongoose.model('Therapist', therapistSchema);

module.exports = Therapist;
