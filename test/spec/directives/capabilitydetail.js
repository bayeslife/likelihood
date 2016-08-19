'use strict';

describe('Directive: capabilityDetail', function () {

  // load the directive's module
  beforeEach(module('likelihoodApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<capability-detail></capability-detail>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the capabilityDetail directive');
  }));
});
