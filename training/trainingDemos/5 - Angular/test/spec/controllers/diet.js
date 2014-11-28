'use strict';

describe('Controller: DietCtrl', function () {

  // load the controller's module
  beforeEach(module('cokeApp'));

  var DietCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DietCtrl = $controller('DietCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
