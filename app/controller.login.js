(function(){
	'use strict'

	angular.
		module('chatApps')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['LoginService'];
	function LoginController(LoginService){
		let vm = this;

		//Properties
		vm.user = '';

      	//Methods
      	vm.login = login;

      	function login () {
        	LoginService.login(vm.user);
      	}
	}
})();