'use strict';

var likelihoodApp = angular
  .module('likelihoodApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/likelihood/:dataset', {
        templateUrl: 'views/likelihood.html',
        controller: 'LikelihoodCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
