'use strict';

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  _id: Schema.Types.ObjectId,
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
  _id: Schema.Types.ObjectId,
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
  user: [{type: Schema.Types.ObjectId, ref: 'User'}],
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
    reviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]

});




var Course = mongoose.model('Course', CourseSchema);
var User = mongoose.model('User', UserSchema);
var Review = mongoose.model('Review', ReviewSchema);

module.exports.Course = Course;
module.exports.User = User;
module.exports.Review = Review;
