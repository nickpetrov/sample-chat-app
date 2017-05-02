(function() {
  'use strict';

  angular
    .module('chatApps', ['ui.router'])
    .run(runApp);

    runApp.$inject = ['$rootScope','LoginService'];
    function runApp($rootScope,LoginService){
    	let stateChangeStartEvent = $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    		LoginService.isAuthenticated();
    	});
    }
})();
