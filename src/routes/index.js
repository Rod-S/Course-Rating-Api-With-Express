const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Review = require('../models/review');
const Course = require('../models/course');

//GET /api/users 200
/*
router.get('/api/users', function(req, res, next) {
  User.findById('57029ed4795118be119cc437')
  .exec(function(error, user) {
    if (error) {
      return next(error);
    } else {
      console.log( user.fullName)
    }
  )

});
*/

router.get('api/users', function(req, res, next) {
  console.log(User)

});
