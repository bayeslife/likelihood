'use strict';

describe('Directive: hypothesis', function () {

  // load the directive's module
  beforeEach(module('likelihoodApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<hypothesis></hypothesis>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the hypothesis directive');
  }));
});
