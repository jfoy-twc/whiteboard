angular.module('user', [])

.controller("UserCtrl", ['$rootScope', '$scope', '$routeParams', 'Restangular', 'growl',
	function($rootScope, $scope, $routeParams, Restangular, growl){
		Restangular.one('user', $routeParams.id).get().then(function(u) {
			console.log(u);
            $scope.user = u;
            $rootScope.title = u.name;
        }, function(err) {
            document.getElementById('notFoundView').style.display = 'block';
            document.getElementById('articleView').style.display = 'none';
        });
	}])

.controller("EditUserCtrl", ['$rootScope', '$scope', '$routeParams', 'Restangular', 'growl',
	function($rootScope, $scope, $routeParams, Restangular, growl){
		$scop.user = $rootScope.user;

		$scope.update = function() {
			$scope.user.put().then(function(user){
			  $rootScope.user = user;
			  growl.addSuccessMessage("✔ Profilen har uppdaterats"); 
			}, function(r){
			  $scope.errors = r.data; 
			  growl.addErrorMessage("An error has occurred.");
			});
		 }

	}])


.controller("AuthCtrl", ['$rootScope', '$scope', '$location', 'authService','Restangular', 'growl', 
	function ($rootScope, $scope, $location, authService, Restangular, growl){
		$scope.u = {
			email :"alex.aanis@gmail.com",
			password : "mynameis",
			name :"Alex Anis"
		}
		angular.element(document).ready(function(){
			authService.me();
		});

		$rootScope.$on("login_state_changed", 
			function() {
				$scope.user = $rootScope.user;
				
	    	}
	    );
		
		$scope.login = function(u){
			$scope.loading = true;
	        Restangular.all('auth/login').post(u).then(
	        	function(c) {
			    	$scope.loading 	= false;
			    	authService.me();
			    	$location.path('/user/'+c.email);
				}, 
				function(errors){ 
					$scope.errors = errors.data; 
	                $scope.loading= false;
				});
		}

		$scope.register = function(u){
			$scope.loading = true;
	        Restangular.all('auth/register').post(u).then(
	        	function(c) {
			    	$scope.loading 	= false;
			    	console.log('User created');
			    	//$location.path(articlePath);
				}, 
				function(errors){ 
					$scope.errors = errors.data; 
	                $scope.loading= false;
				});
		}

		$scope.logout = function(){
			Restangular.all('auth/logout').getList().then(
				function(s) {
					window.location.replace(window.location.origin);
				}
			);
		}	
		
	}])