angular.module('course', ['angularFileUpload','ngAutocomplete','LocalStorageModule'])

.controller("navbarCtrl", ['$scope', '$rootScope', 'authService','Restangular','growl',
	function ($scope, $rootScope, $routeParams, Restangular, growl) {
		authService.me();
}])

.controller("SearchCourseCtrl", ['$scope', '$rootScope', '$routeParams','Restangular','growl',
	function ($scope, $rootScope, $routeParams, Restangular, growl) {
		$scope.search = function(search){
			Restangular.all('course').getList().then(function(r) {
	            $scope.courses = r;
	        });

	        Restangular.all('user/search').getList().then(function(r) {
	            $scope.users = r;
	        });
		}
		
}])

.controller("NewCourseCtrl", ['$scope', '$rootScope', '$routeParams','Restangular','growl', '$location',
	function ($scope, $rootScope, $routeParams, Restangular, growl, $location) {
		$scope.errors = [];
		$scope.publish = function( course ){ 
			$scope.loading = true;
	        Restangular.all('course').post(course).then(
	        	function(c) {
			    	$scope.loading 	= false;
			    	$location.path('/course/' + c.code);
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


.controller('EditCourseCtrl', ['$scope', '$rootScope', '$routeParams','Restangular','growl','$location',
	function ($scope, $rootScope, $routeParams, Restangular, growl, $location) {
		$scope.errors = [];

		Restangular.one('course', $routeParams.id).get().then(function(course) {
            $scope.course = course;
            $rootScope.title = course.title;

            var converter1 = Markdown.getSanitizingConverter();
            converter1.hooks.chain("preBlockGamut", function (text, rbg) {
                return text.replace(/^ {0,3}""" *\n((?:.*?\n)+?) {0,3}""" *$/gm, function (whole, inner) {
                    return "<blockquote>" + rbg(inner) + "</blockquote>\n";
                });
            });

            var editor1 = new Markdown.Editor(converter1);
            editor1.run();

        }, function(err) {
            document.getElementById('notFoundView').style.display = 'block';
            document.getElementById('articleView').style.display = 'none';
        });

        $scope.save = function(){
        	$scope.course.put().then(function(){
        		$location.path( "/course/" + $routeParams.id  );
        	});
        }
}])


.controller("CourseCtrl", ['$scope', '$rootScope', '$routeParams','Restangular','growl',
	function ($scope, $rootScope, $routeParams, Restangular, growl) {
		Restangular.one('course', $routeParams.id).get({
			"populate":"author,managers,resources"
		}).then(function(course) {
            $scope.course = course;
            $rootScope.title = course.title;
            var converter = new Markdown.Converter();
		    $("#frontpage").html(converter.makeHtml(course.frontpage));
        }, function(err) {
            document.getElementById('notFoundView').style.display = 'block';
            document.getElementById('articleView').style.display = 'none';
        });
}])