'use strict';

var mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
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

var ReviewSchema = new Schema({
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
    required: true,
    min: 1,
    max: 5
  },
  review: {
    type: String
  }
});

var CourseSchema = new Schema({
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

UserSchema.statics.authenticate = function(emailAddress, password, callback) {
  User.findOne({ emailAddress: emailAddress })
      .exec(function (error, user) {
        console.log('authenticate static error ' + error);
        console.log('authenticate static user ' + user);
        if (error) {
          return callback(error);
        } else if ( !user ) {
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        bcrypt.compare(password, user.password, function(error, result) {
          if (result === true) {
            return callback(null, user);
          } else {
            return callback();
          }
        })
  });
}

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

//pre save hook for only new user entry in database
//consider post save hook to recursively hash existing plaintext passwords in db?
UserSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(user.password, 10, function(err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  })
});

var Course = mongoose.model('Course', CourseSchema);
var User = mongoose.model('User', UserSchema);
var Review = mongoose.model('Review', ReviewSchema);

module.exports.Course = Course;
module.exports.User = User;
module.exports.Review = Review;
