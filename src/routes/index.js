'use strict';

const express = require('express');
const router = express.Router();
const Course = require('../models/models').Course;

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


router.get('/', function(req, res, next) {
  res.json({
    message: 'route root success'
  })
});

module.exports = router;
