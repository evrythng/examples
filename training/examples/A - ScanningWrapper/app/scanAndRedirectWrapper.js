/**
 * Wrapper Function, to detect , scan and redirect
 *
 * redirect location is defined in EVRYTHNG rules engine
 *
 * will log in / create user (as async promise)
 *
 * will do the scan, get product id and return rules
 *
 * Error handling will be done in the wrapper, but passed back to the calling function
 *
 * Error Codes
 *
 *  0 - Redirection Found
 *  4 - No Redirection Returned
 *  8 - Item Not Recognised
 *
 */

/*jslint devel: true */
/*global EVT, Promise, ScanThng */

(function( window, undefined ) {
  'use strict';
  function EVTHelper() {

    // get the user context or create a new one. HTML 5 Local storage is used to save the "device" id
    this.getUserContext = function myMethod(EVT, app) {
      return new Promise(function (resolve) {
        var userId = window.localStorage.getItem('userId');
        if (userId === null) {
          // create new user object
          app.appUser().create({
            anonymous: true
          }).then(function(anonymousUser){
            // store anonymous user details locally
            if (window.localStorage) {
              localStorage.userId = anonymousUser.id;
              localStorage.apiKey = anonymousUser.apiKey;
            }
            resolve(anonymousUser);
          });
        }
        else {
          // userId exists, get User Context
          var apiKey = window.localStorage.getItem('apiKey');
          var anonymousUser = new EVT.User({
            id: localStorage.userId,
            apiKey: localStorage.apiKey
          }, app);
          resolve(anonymousUser);
        }
      });
    };

    // scanThng Object Creation
    this.setupScanthng = function setupScanthng(EVT, app) {
      return new Promise(function (resolve) {
        var st = new EVT.ScanThng(app);
        st.setup({redirect: false, type: 'objpic'});
        resolve(st);
      });
    };

    // scanThng recognise and get Redirect URL
    this.scan = function scan(st, user) {
      return new Promise(function (resolve) {
        var response = {};
        // found product, return URL, unless the rule has not been defined
        function productFound(action, product) {
          if (typeof action.reactions[0].data.redirectUrl === "undefined") {
            response.rc = 4;
            response.error = "no URL Returned";
          } else {
            response.rc = 0;
            response.error = "";
            response.url = action.reactions[0].data.redirectUrl + '?Action=' + action.id;
            // add addititional query strings here
            if (typeof product.customFields.additionalquerystrings != "undefined") {
              response.url = response.url + '&' + product.customFields.additionalquerystrings;
            }
            console.log(product);

          }
          resolve(response);
        }

        st.identify().then(function (scannedProduct) {
          user.product(scannedProduct.evrythngId).read().then(function (product) {
            product.action('scans').create().then(function (action) {
              productFound(action, product);
            })
          })
        },function (error) {
            response.rc = 8;
            response.error = error.errors[0];
            resolve(response);
          })
      })
    };

    // decode Query String
    this.getParameterByName = function getParameterByName(url, name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
          results = regex.exec(url);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };

  }

  // expose access to the constructor
  window.EVTHelper = EVTHelper;

} )( window );

/**
 * Created by Dave Ashenhurst - EVRYTHNG on 22/10/14.
 */
