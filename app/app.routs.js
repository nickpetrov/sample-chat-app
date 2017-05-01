(function() {
  'use strict';

  angular
    .module('chatApps')
    .config(function($stateProvider, $urlRouterProvider) {

      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: '/templates/login.html'
        })
        .state('chat', {
          url: '/chat',
          templateUrl: '/templates/chat.html'
        });

      $urlRouterProvider.otherwise('/login');
    });
})();
