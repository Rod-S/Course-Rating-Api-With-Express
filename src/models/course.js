'use strict';

var User = require('./user').User;

var mongoose = require("mongoose");

var Schema = mongoose.Schema

var CourseSchema = new mongoose.Schema({
  user: [User],
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
  {
    reviews: [Review]
  }
});

var Course = mongoose.module('Course', CourseSchema);

module.exports.Course = Course;
