(function(){
	'use strict'

	angular.
		module('chatApps')
		.service('LoginService', loginService);

	loginService.$inject = ['$timeout','$state', '$http'];
	function loginService($timeout, $state, $http){
		let vm = this;
		vm.user = '';
		return {
			redirect: redirect,
			getUser: getUser,
			setUser: setUser,
			logout: logout,
			login: login,
			isAuthenticated: isAuthenticated
		}
		function logout () {
			localStorage.removeItem('user');
			$state.go('login');
		}
		function login (name) {
			$http({
      			method: 'GET',
      			url: 'https://randomuser.me/api/'
   			}).then(response => {
				let user = {
					name: name,
					avatar: response.data.results[0].picture.thumbnail
				};
				setUser(JSON.stringify(user));
				$state.go('chat');
			}, error => console.log('[error]', error));
		}
		function setUser(user) {
			//console.log('[user]', user);
			localStorage.setItem('user', user);
			vm.user = JSON.parse(user);
		}
		function getUser() {
			return vm.user;
		}
		function isAuthenticated(){
	       	$timeout(function() {
	            if (!localStorage.getItem('user')) {
	              	redirect('login');
	            } else {
	            	setUser(localStorage.getItem('user'));
	            	redirect('chat');
	            }
	        });
		}
		function redirect(state) {
			switch(state){
				default:
					$state.go(state);
			}
		}
	}
})();