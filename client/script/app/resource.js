angular.module('resource', ['angularFileUpload','ngAutocomplete','LocalStorageModule'])

.controller("NewResourceCtrl", ['$scope', '$rootScope', '$routeParams','Restangular','growl', '$location',
	function ($scope, $rootScope, $routeParams, Restangular, growl, $location) {
		$scope.errors = [];
		
		var converter1 = Markdown.getSanitizingConverter();
            converter1.hooks.chain("preBlockGamut", function (text, rbg) {
                return text.replace(/^ {0,3}""" *\n((?:.*?\n)+?) {0,3}""" *$/gm, function (whole, inner) {
                    return "<blockquote>" + rbg(inner) + "</blockquote>\n";
                });
            });

       	var editor1 = new Markdown.Editor(converter1);
            editor1.run();

		$scope.publish = function( resource ){ 
			$scope.loading = true;
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
				});
		}
}])


.controller("ResourceCtrl", ['$scope', '$rootScope', '$routeParams','Restangular','growl',
	function ($scope, $rootScope, $routeParams, Restangular, growl) {
		Restangular.one('resource', $routeParams.rid).get().then(function(resource) {
            $scope.resource = resource;
            $scope.courseId = $routeParams.id;
            $rootScope.title = resource.title;
            var converter = new Markdown.Converter();
		    $("#body").html(converter.makeHtml(resource.body));

        }, function(err) {
            document.getElementById('notFoundView').style.display = 'block';
            document.getElementById('articleView').style.display = 'none';
        });
}])