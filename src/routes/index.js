'use strict';

const express = require('express');
const router = express.Router();
const Course = require('../models/models');

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

router.get('/', function(req, res, next) {
  console.log('hello');
});
