'use strict';

describe('Controller: DietscanCtrl', function () {

  // load the controller's module
  beforeEach(module('cokeApp'));

  var DietscanCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DietscanCtrl = $controller('DietscanCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
