'use strict';

const express = require('express');
const router = express.Router();
const Course = require('../models/models').Course;

//GET /api/ 200
router.get('/', function(req, res, next) {
  res.json({
    message: 'route root success'
  })
});

//GET /api/users 200
router.get('/users', function(req, res, next) {
  Course.findById('57029ed4795118be119cc437')
  .exec(function(error, user) {
    if (error) {
      return next(error);
    } else {
      console.log(Course.find({}))
    }
  })
});

//GET /api/courses 200
router.get('/courses', function(req, res, next) {
    Course.find({})
    .exec(function(err, courses) {
      if (err) return next(err);
      courses.toObject({getters: true});
      console.log(courses._id)
    });
});

module.exports = router;
