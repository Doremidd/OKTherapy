const mongoose = require('mongoose');

const therapistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'non-binary', 'other'],
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
  description: {
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
  contactFormUrl: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
  },
  image: {
    type: String,
    required: true,
  }
});

const Therapist = mongoose.model('Therapist', therapistSchema, 'Therapists');

module.exports = Therapist;
