var expect = require('chai').expect;
var request = require('supertest');
var app = require('../index');
const chai = require("chai");
var chaiHttp = require('chai-http');
chai.use(chaiHttp);

const credentials = {
  username: 'amal_sahyane', 
  password: 'amal_sahyane' // super secure password :) 
}

var authenticatedUser = request.agent(app);
before(function(done){
  this.enableTimeouts(false) ;
  authenticatedUser
    .post('/api/signin')
    .send(credentials)
    .end(function(err, response){
      expect(response.statusCode).to.equal(200);
      //expect('Location', '/home');
      done();
    });
});


describe('Post /api/justify', function(done){
  it('expecting 200 for the athentified user ', function(done){
    authenticatedUser.post('/api/justify').type('text/plain').send("kiibo    yane")
    .end(function(err, response , body){
      expect('Content-Type', 'text/plain') ; 
      expect(response.statusCode).to.equal(200);
      expect(response).to.be.text;
      done();
    });
    
  });

});