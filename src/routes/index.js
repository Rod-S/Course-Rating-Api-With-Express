'use strict';

const express = require('express');
const router = express.Router();
const Course = require('../models/models').Course;
const User = require('../models/models').User;
const Review = require('../models/models').Review;

const auth = require('basic-auth');
const mid = require('../middleware');

//GET /api/ 200
router.get('/', function(req, res, next) {
  res.json({
    message: 'route root success'
  })
});

//GET /api/users 200
router.get('/users', mid.authCredentials, function(req, res, next) {
  if (req) {
    res.json(req.user);
  } else {
    var err = new Error('Email and password are required.');
    err.status = 401;
    return next(err);
  }
});

//POST /api/users 201
router.post('/users', function(req, res, next) {
  var promise = User.create(req.body);
  promise.then(() => {
    res.location('/');
    res.status(201);
    res.end();
  }).catch((err) => {
    if (err) return next(err);
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

//GET /api/courses/:courseId 200
router.get('/courses/:courseId', function(req, res, next) {
  Course.findById(req.params.courseId)
  .populate({path: 'reviews', model: 'Review', populate: {path: 'user fullName', model: 'User', select: 'fullName'}})
  .populate('user','fullName')
  .exec(function (err, course) {
    if (err) return next(err);
    res.json(course);
  });
});

//POST /api/courses 201
router.post('/courses', mid.authCredentials, function(req, res, next) {
  if (req) {
    var promise = Course.create(req.body);
    promise.then(() => {
    res.location('/');
    res.status(201);
    res.end();
  }).catch((err) => {
    if (err) return next(err);
  });
} else {
  var err = new Error('Email and password are required.');
  err.status = 401;
  return next(err);
}
});

//PUT /api/courses/:courseId 304
router.put('/courses/:courseId', mid.authCredentials, function(req, res, next) {
  if (req) {
  Course.findOneAndUpdate(
    {"_id" : req.params.courseId}, req.body, {upsert: true}, function(err, course) {
    if (err) return next(err);
    res.status(204);
    res.end();
  });
} else {
    var err = new Error('Email and password are required.');
    err.status = 401;
    return next(err);
  }
});

router.post('/courses/:courseId/reviews', mid.authCredentials, function(req, res, next) {
  if (req) {
  var review_userID = req.user._id;
  Course.findById(req.params.courseId)
  .exec(function (err, course) {
    if (err) return next(err);
    var course_userID = course.user;
    Review.validate(review_userID, course_userID, function(err, validID) {
      if (validID == true) {
       Review.create(req.body);
       res.location('/' + req.params.courseId);
       res.status(201);
       res.end();
      } else {
        console.log(err);
        return next(err);
      }
    });
  });
} else {
  var err = new Error('Email and password are required.');
  err.status = 401;
  return next(err);
}
});

module.exports = router;
