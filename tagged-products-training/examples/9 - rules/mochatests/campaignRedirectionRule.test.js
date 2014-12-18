/**
 * Created by dibster on 11/19/13.
 */

'use strict';

var should = require('should');
var request = require('supertest');
var fs = require('fs');

var api = 'http://api.evrythng.com';
var operatorKey = 'EVRYTHNGOPERATORKEY';
var projectKey = 'EVRYTHNGPROJECTKEY';
var userKey = 'EVRYTHNGUSERKEY';
var projectAppId = '5433af7f50522a29bb732c7a';
var ruleFileName = 'campaignRedirectionRule.js';

describe('Rule Tests', function() {
  before(function(done){
    fs.readFile('../engineRule/' + ruleFileName, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      var rule = {script: data};
      request(api)
          .put('/reactorScripts?app=' + projectAppId)
          .set('Authorization', operatorKey)
          .send(rule)
          .expect(200)
          .end(function(err, res) {
            if (err) {
              throw err;
            }
            res.statusCode.should.eql(200);
            done();
          });
         });
  });

  describe('Add the Action and run the Rule', function() {

    it('Should add an Action from London and get a GB Url', function(done) {
      var action = {};
      action.type = 'scans';
      action.product = 'UVAdnpxbPepRQEN9gKV6AfEa';
      action.location = {};
      action.location.latitude = '51.5176';
      action.location.longitude = '-0.2496';
      action.locationSource = 'sensor';

      request(api)
          .post('/actions/scans')
          .set('Authorization', userKey)
          .send(action)
          .expect(201)
          .end(function(err, res) {
            if (err) {
              console.log(err);
              throw err;
            }
            res.statusCode.should.eql(201);
            res.body.reactions[0].data.redirectUrl.should.eql('http://www.cocacola.com/gb');
            done();
          });
    });
  });

  describe('Add the Action from Madrid and run the Rule', function() {

    it('Should add an Action from MAdrid and get a Madrid Url', function(done) {
      var action = {};
      action.type = 'scans';
      action.product = 'UVAdnpxbPepRQEN9gKV6AfEa';
      action.location = {};
      action.location.latitude = '40.2600';
      action.location.longitude = '-3.4200';
      action.locationSource = 'sensor';

      request(api)
          .post('/actions/scans')
          .set('Authorization', userKey)
          .send(action)
          .expect(201)
          .end(function(err, res) {
            if (err) {
              console.log(err);
              throw err;
            }
            res.statusCode.should.eql(201);
            res.body.reactions[0].data.redirectUrl.should.eql('http://www.cocacola.com/es/contour');
            done();
          });
    });
  });

  describe('Add the Action from Italy and run the Rule', function() {

    it('Should add an Action from Italy and get Italy Always on URL', function(done) {
      var action = {};
      action.type = 'scans';
      action.product = 'UVAdnpxbPepRQEN9gKV6AfEa';
      action.location = {};
      action.location.latitude = '41.8723890';
      action.location.longitude = '12.4801800';
      action.locationSource = 'sensor';

      request(api)
          .post('/actions/scans')
          .set('Authorization', userKey)
          .send(action)
          .expect(201)
          .end(function(err, res) {
            if (err) {
              console.log(err);
              throw err;
            }
            res.statusCode.should.eql(201);
            res.body.reactions[0].data.redirectUrl.should.eql('http://www.cocacola.com/it');
            done();
          });
    });
  });

  describe('Add the Action from Athens', function() {

    it('Should add an Action from Athens and get the standard always on URL', function(done) {
      var action = {};
      action.type = 'scans';
      action.product = 'UVAdnpxbPepRQEN9gKV6AfEa';
      action.location = {};
      action.location.latitude = '37.9839170';
      action.location.longitude = '23.7293600';
      action.locationSource = 'sensor';

      request(api)
          .post('/actions/scans')
          .set('Authorization', userKey)
          .send(action)
          .expect(201)
          .end(function(err, res) {
            if (err) {
              console.log(err);
              throw err;
            }
            res.statusCode.should.eql(201);
            res.body.reactions[0].data.redirectUrl.should.eql('http://www.cocacola.com');
            done();
          });
    });
  });
});
