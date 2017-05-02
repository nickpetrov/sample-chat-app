(function(){
	'use strict'

	angular.
		module('chatApps')
		.controller('ChatController', ChatController);

	ChatController.$injector = ['$scope','LoginService','apiService'];

	function ChatController($scope,LoginService,apiService){
		let vm = this;
  	//Properties
  	vm.msgBox = {};
  	vm.chatContent = apiService.get('chatContent');
    init();

  	//Methods
  	vm.send = send;
  	vm.logout = logout;

  	function send () {
      vm.msgBox.user = LoginService.getUser();
      apiService.send(vm.msgBox);
    	vm.msgBox = {};
  	}
  	function logout () {
    	LoginService.logout();
  	}
    function init() {
      apiService.simulate(15000);
      apiService.watch($scope,'chatContent',function(){
        vm.chatContent = apiService.get('chatContent');
      });
    }
	}
})();