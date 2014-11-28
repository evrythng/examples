'use strict';

describe('Controller: ZeroscanCtrl', function () {

  // load the controller's module
  beforeEach(module('cokeApp'));

  var ZeroscanCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ZeroscanCtrl = $controller('ZeroscanCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
