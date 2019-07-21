var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/index.js');
var should = chai.should();
var expect = require('chai').expect;


chai.use(chaiHttp);

// Test suite


describe('Mocha', function () {
  it('should run our tests using npm', function(){
    expect(true).to.be.ok;
  });
});

describe('routes/index.js', function () {
  it('should return the authorized user\'s corresponding user document on GET /api/users route', function (done) {
    chai.request(server)
    .get('/api/users')
    .set('authorization', 'Basic am9lQHNtaXRoLmNvbTpwYXNzd29yZA==')
    .end(function(err, res) {
      res.should.have.status(200);
      done();
    })
  })
});

describe('routes/index.js', function () {
  it('should return the unauthorized user a 401 status error on GET /api/users route', function (done) {
  chai.request(server)
  .get('/api/users')
  .end(function(err, res) {
    res.should.have.status(401);
    done();
  })
})
});
