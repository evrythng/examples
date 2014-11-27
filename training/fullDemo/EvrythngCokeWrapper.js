/*jslint devel: true */
/*global EVT, Promise, ScanThng */

(function( window, undefined ) {
  'use strict';
  function EvrythngCokeWrapper() {

    // get the user context or create a new one. HTML 5 Local storage is used to save the "device" id
    this.getUserContext = function myMethod(EVT, app) {
      var userId = window.localStorage.getItem('userId');
      if (userId === null) {
        // create new user object
        app.appUser().create({
          anonymous: true
        }).then(function(anonymousUser){
          console.log('Created anonymous user: ', anonymousUser); // good to go, doesn't need validation
          // store anonymous user details locally
          if (window.localStorage) {
            localStorage.userId = anonymousUser.id;
            localStorage.apiKey = anonymousUser.apiKey;
          }
          return anonymousUser;
        });
      }
      else {
        // userId exists, get User Context
        var apiKey = window.localStorage.getItem('apiKey');
        var anonymousUser = new EVT.User({
          id: localStorage.userId,
          apiKey: localStorage.apiKey
        }, app);
        console.log('Anonymous User read from Local Storage : ' + anonymousUser);
        return anonymousUser;
      }
    };

    // scanThng Object Creation
    this.scanObj = function scanObj(EVT, app) {
      var st = new EVT.ScanThng(app);
      st.setup({redirect: false,type : 'objpic'});
      return st;
    };


    // run the Rules by doing a scan on the product. The rules will return the route
    this.runRules = function runRules(user, productId) {
      return new Promise(function (resolve, reject) {
        user.product(productId).read().then(function(product) {
          product.action('scans').create().then(function (response) {
            resolve(response.reactions);
          });
        });
      });
    };

    // record an Custom Action on the Product , for example a Purchase
    this.recordProductAction = function recordProductAction(actionType, user, productId) {
      return new Promise(function (resolve, reject) {
        user.product(productId).read().then(function(product) {
          product.action('_' + actionType).create().then(function(response) {
            console.log(response);
            resolve(response);
          });
        });
      });
    };

    // get the Actions  a Product of a particular type
    this.getProductActions = function getProductActions(actionType,user, productId) {
      return new Promise(function (resolve, reject) {
        user.product(productId).read().then(function (product) {
          product.action('_' + actionType).read({params: {context: true}}).then(function (actions) {
            console.log(actions);
            resolve(actions);
          });
        });
      });
    };

    // decode Query String
    this.getParameterByName = function getParameterByName(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
          results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };

    // get Visits from Local Storage (count number of times user Scanned a Product)
    this.getVisits = function getVisits() {
      var userVisits = 0;
      if (window.localStorage) {
        userVisits = window.localStorage.getItem('userVisits');
        if (userVisits === null) {
          localStorage.userVisits = 1;
          userVisits = 1;
        }
        else {
          localStorage.userVisits = parseInt(localStorage.userVisits) + 1;
          userVisits = localStorage.userVisits;
        }
      }
      return userVisits;
    };

  }

  // expose access to the constructor
  window.EvrythngCokeWrapper = EvrythngCokeWrapper;

} )( window );

/**
 * Created by Dave Ashenhurst - EVRYTHNG on 22/10/14.
 */
