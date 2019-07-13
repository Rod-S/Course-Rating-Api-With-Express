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
  /*
  if (!req.headers.authorization) {
    var err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(err);
  }
  var credentials = auth.parse(req.headers.authorization);
  var email = credentials.name;
  var pass = credentials.pass;
  */
  console.log(res.locals);
  var credentials = res.locals;
  var email = credentials.name;
  var pass = credentials.pass;
  if (credentials) {
    User.authenticate(email, pass, function(user, error) {
      if (error || !user) {
        var err = new Error ('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
          return res.json({user});
      }
    });
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
  .exec(function (err, course) {
    if (err) return next(err);
    res.json(course);
  });
});

//POST /api/courses 201
router.post('/courses', function(req, res, next) {
  var promise = Course.create(req.body);
  promise.then(() => {
    res.location('/');
    res.status(201);
    res.end();
  }).catch((err) => {
    if (err) return next(err);
  });
});

//PUT /api/courses/:courseId 304
router.put('/courses/:courseId', function(req, res, next) {
  Course.findOneAndUpdate(
    {"_id" : req.params.courseId}, req.body, {upsert: true}, function(err, course) {
    if (err) return next(err);
    res.status(204);
    res.end();
  });
});

//POST /api/courses/:courseId/reviews 201
router.post('/courses/:courseId/reviews', function(req, res, next) {
  Course.findById(req.params.courseId)
  .exec(function (err, course) {
    if (err) return next(err);
    Review.create(req.body);
    res.location('/' +req.params.courseId);
    res.status(201);
    res.end();
  });
});

module.exports = router;
