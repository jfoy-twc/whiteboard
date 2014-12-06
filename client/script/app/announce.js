angular.module('announce', ['angularFileUpload','ngAutocomplete','LocalStorageModule'])

.controller("NewAnnounceCtrl", ['$scope', '$rootScope', '$routeParams','Restangular','growl', '$location',
	function ($scope, $rootScope, $routeParams, Restangular, growl, $location) {
		$scope.errors = [];
		$scope.publish = function( resource ){ 
			/*$scope.loading = true;
	        Restangular.one('course', $routeParams.id).all('resource').post(resource).then(
	        	function(c) {
			    	$scope.loading 	= false;
			    	$location.path('/course/' + $routeParams.id);
				}, 
				function(errors){ 
					if(errors.status == 403){
						$scope.errors['form'] = "Unauthorized. Please login.";
					}else if(errors.status == 400){
						$scope.errors = errors.data; 
					}else{
						$scope.errors['form'] = "Unknown error occured.";
					}
	                $scope.loading= false;
				});*/
		}
}])


.controller("AnnounceCtrl", ['$scope', '$rootScope', '$routeParams','Restangular','growl',
	function ($scope, $rootScope, $routeParams, Restangular, growl) {
		/*Restangular.one('resource', $routeParams.id).get().then(function(resource) {
            $scope.resource = resource;
            $scope.courseId = $routeParams.courseId;
            $rootScope.title = resource.title;
            var converter = new Markdown.Converter();
		    $("#body").html(converter.makeHtml(resource.body));

        }, function(err) {
            document.getElementById('notFoundView').style.display = 'block';
            document.getElementById('articleView').style.display = 'none';
        });*/
}])
