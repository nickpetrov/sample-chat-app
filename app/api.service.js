(function(){
	'use strict'

	angular.
		module('chatApps')
		.service('apiService', apiService);

	apiService.$inject = ['$http', '$interval','$timeout'];
	function apiService($http, $interval,$timeout){
		let vm = this;
		vm.chatContent = [];
      	$http({
      			method: 'GET',
      			url: 'chump.json'
   			}).then(response => {
		   		vm.chump = response.data;
			}, error => console.log('[error]', error));
		return {
			get: get,
			set: set,
			watch: watch,
			send: send,
			simulate: simulate
		}
		function get (key) {
			return vm[key];
		}
		function set (key, value) {
		    vm[key] = value;
		}
		function watch ($scope, key, onChange) {
			return $scope.$watch(
		    	function() {
					return get(key);
				},
				function(newValue, oldValue) {
					if (newValue !== oldValue) {
						$scope[key] = newValue;
						if (angular.isFunction(onChange)) {
							onChange(newValue, oldValue);
						}
					}
				},
		        true
		    );
		}
		function send (msg) {
			msg.id = getRandom(0,10000);
			msg.time = moment(new Date()).format('HH:mm:ss');
			vm.chatContent.push(msg);
		}
		function simulate (interval) {
			const max = interval * 0.66;
			const min = interval * 0.33;
			if ( angular.isDefined(vm.interval) ) return;
			vm.interval = $interval(function () {
				$timeout(function () {
					$http({
		      			method: 'GET',
		      			url: 'https://randomuser.me/api/'
		   			}).then(response => {
						let msg = vm.chump[getRandom(0,vm.chump.length)];
						msg.id = getRandom(0,10000);
						msg.user = {};
						msg.user.avatar = response.data.results[0].picture.thumbnail
						msg.user.name = capitalize(response.data.results[0].name.first) + ' ' + capitalize(response.data.results[0].name.last);
						msg.time = moment(new Date()).format('HH:mm:ss');
						vm.chatContent.push(msg)
		   				
					}, error => console.log('[error]', error));
				},getRandom(min,max));
			}, interval);
		}
		function getRandom (min,max) {
			return Math.floor(Math.random() * (max - min)) + min;
		}
		function capitalize(s){
		    return s && s[0].toUpperCase() + s.slice(1);
		}
	}
})();