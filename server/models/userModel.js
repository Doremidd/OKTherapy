const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    age: {
        type: Number,
        min: 0,
        max: 100,
      },
      gender: {
        type: String,
        enum: ['Male', 'Female', 'Non-binary', 'Other'],
      },
      sexuality: {
        type: String,
        enum: ['Heterosexual', 'Homosexual', 'Bisexual', 'Other'],
      },
      location: {
        type: String,
      },
      budget: {
        type: [Number],
        validate: {
          validator: function (v) {
            return v.length === 2 && v[0] <= v[1];
          },
          message: 'Budget should be an array of two numbers where the first is less than or equal to the second.',
        },
      },
      therapyMode: {
        type: String,
        enum: ['In-person', 'Online', 'Either'],
      },
      therapistGender: {
        type: String,
        enum: ['Male', 'Female', 'Non-binary', 'Other', 'No preference'],
      },
      therapyFocus: {
        type: [String],
      },
      therapyMethods: {
        type: [String],
      },
      certification: {
        type: [String],
      },
    });

const User = mongoose.model('User', userSchema);

module.exports = User;