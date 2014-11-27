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


      request(api)
          .get('/thngs/UegnbhqNPB5Rne6Mfrxwhe2k')
          .set('Authorization', operatorKey)
          .expect(200)
          .end(function(err, res) {
            if (err) {
              throw err;
            }
            console.log(res.body.description);
          });

