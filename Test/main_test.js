const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/index.js');
const should = chai.should();
const expect = require('chai').expect;

chai.use(chaiHttp);

//Test suite

//initial mocha test
describe('Mocha', function () {
  it('should run our tests using npm', function(){
    expect(true).to.be.ok;
  });
});

//When I make a request to the GET /api/users route with the correct credentials, the corresponding user document is returned
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

//When I make a request to the GET /api/users route with invalid credentials, a 401 status error is returned
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
