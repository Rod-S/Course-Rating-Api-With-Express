'use strict';

var User = require('./user').User;

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ReviewSchema = new mongoose.Schema({
  user: [User],
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

var Review = mongoose.module('Review', ReviewSchema);

module.exports.Review = Review;
