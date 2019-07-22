'use strict';

const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: {
    type: Schema.ObjectId,
    auto: true
  },
  fullName: {
    type: String,
    required: true
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
    match:
/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  },
  password: {
    type: String,
    required: true
  }
});

const ReviewSchema = new Schema({
  _id: {
    type: Schema.ObjectId,
    auto: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  postedOn: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  review: {
    type: String
  }
});

const CourseSchema = new Schema({
  _id: {
    type: Schema.ObjectId,
    auto: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
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
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Review'
      }
    ]
});

//authenticate method which  compares a password to the hashed password stored on a user document instance
UserSchema.statics.authenticate = function(email, pass, callback) {
  User.findOne({ emailAddress: email })
      .exec(function (user, error) {
        if (error) {
          return callback(error);
        } else if ( !user ) {
          let err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        bcrypt.compare(pass, user.password, function(error, result) {
          if (result === true) {
            req.user = user;
            return callback(null, user);
          } else {
            return callback(error);
          }
        })
      });
};

//validate method which prevents a user from reviewing their own course
ReviewSchema.statics.validate = function(review_userID, course_userID, callback) {
  console.log('reviewSchema');
  console.log(review_userID);
  console.log(course_userID);
  if ( mongoose.Types.ObjectId(`${review_userID}`).equals(mongoose.Types.ObjectId(`${course_userID}`))) {
    let validID = false;
    let err = new Error('You cannot review your own course.');
    err.status = 401;
    err.message = "reviewSchema.validate " + err;
    return callback(err);
  } else {
      let validID = true;
      console.log("reviewSchema.validate validID " + validID);
      return callback(validID);
  }
};

//unique validation message on User emailAddress
UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

//pre save hook for only new user entry in database which encrypts the password property before saving it to the database
//[test]consider post save hook to recursively hash existing plaintext passwords in db?
UserSchema.pre('save', function(next) {
  const user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  })
});

const Course = mongoose.model('Course', CourseSchema);
const User = mongoose.model('User', UserSchema);
const Review = mongoose.model('Review', ReviewSchema);

module.exports.Course = Course;
module.exports.User = User;
module.exports.Review = Review;
