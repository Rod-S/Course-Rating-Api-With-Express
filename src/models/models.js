'use strict';

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  emailAddress: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

var ReviewSchema = new Schema({
  user: [UserSchema],
  postedOn: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
    required: true
  },
  review: {
    type: String
  }
});

var CourseSchema = new Schema({
  user: [UserSchema],
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  estimatedTime: {
    type: String
  },
  materialsNeeded: {
    type: String
  },
  steps: [
    {
      stepNumber: {
        type: Number
      }
    },
    {
      title: {
        type: String,
        required: true
      }
    },
    {
      description: {
        type: String,
        required: true
      }
    }
  ],
    reviews: [ReviewSchema]

});




var Course = mongoose.model('Course', CourseSchema);

module.exports.Course = Course;
