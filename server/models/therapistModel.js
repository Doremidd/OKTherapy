const mongoose = require('mongoose');

const therapistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true,
  },
  certification: {
    type: [String],
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
  website: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  }
});

const Therapist = mongoose.model('Therapist', therapistSchema);

module.exports = Therapist;
