(function() {
  'use strict';

  angular
    .module('chatApps')
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: '/templates/login.html',
          controller: 'LoginController as vm'
        })
        .state('chat', {
          url: '/',
          templateUrl: '/templates/chat.html',
          controller: 'ChatController as vm'
        });

      $urlRouterProvider.otherwise('/login');
    });
})();
