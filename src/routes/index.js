'use strict';

const express = require('express');
const router = express.Router();
const Course = require('../models/models').Course;
const User = require('../models/models').User;
const Review = require('../models/models').Review;


//GET /api/ 200
router.get('/', function(req, res, next) {
  res.json({
    message: 'route root success'
  })
});

//GET /api/users 200
router.get('/users', function(req, res, next) {
  User.find({})
  .exec(function(err, users) {
    if (err) return next(err);
      res.json(users);
  })
});

//POST /api/users 201
router.post('/users', function(req, res, next) {
  var promise = User.create(req.body);
  promise.then(
    res.location('/')
  ).then(
    res.status(201)
  ).then(
    res.end()
  ).catch((err) => {
    res.sendStatus(500);
  });
});

//GET /api/courses 200
router.get('/courses', function(req, res, next) {
    Course.find({}, 'id title')
    .exec(function(err, courses) {
      if (err) return next(err);
      res.json(courses)
    });
});

//POST /api/courses 201
router.post('/courses', function(req, res, next) {
  var promise = Course.create(req.body);
  promise.then(
    res.location('/')
  ).then(
    res.status(201)
  ).then(
    res.end()
  ).catch((err) => {
    res.sendStatus(500);
  });
});

//GET /api/courses/:courseID 200
router.get('/courses/:courseId', function(req, res, next) {
  Course.findById(req.params.courseId)
  .exec(function (err, course) {
    if (err) return next(err);
    res.json(course);
  });
});

module.exports = router;
