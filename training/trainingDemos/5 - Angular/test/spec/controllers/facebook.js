'use strict';

describe('Controller: FacebookCtrl', function () {

  // load the controller's module
  beforeEach(module('cokeApp'));

  var FacebookCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FacebookCtrl = $controller('FacebookCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
