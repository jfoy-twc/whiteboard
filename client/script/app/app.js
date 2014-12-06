var app = angular.module('wb', ['ngRoute', 'restangular', 'angular-growl', 
    'templates-main', 'course', 'user', 'resource', 'announce', 'LocalStorageModule', 
    'angulartics', 'angulartics.google.analytics']);

app.factory('authService', ['$q', '$rootScope', 'growl', 'Restangular',
	function authenticationFactory($q, $rootScope, growl, Restangular ){
    var service = {
        me : function(){
            function handleUser(user){
                $rootScope.user = user;
                $rootScope.$broadcast('login_state_changed');
            }
            function handleError(error){
                $rootScope.user = null;
                $rootScope.$broadcast('login_state_changed');
            }
            
            Restangular.one('user').get().then(handleUser, handleError);
        },

        isAuthenticatedResolved: function (){
            var defer = $q.defer();
            if ( $rootScope.user ) {
                defer.resolve();
            } else {
                Restangular.one('user').get().then(
                    function(user){
                        defer.resolve();
                    }, 
                    function(error){
                        defer.reject();
                    }
                )
            }
            return defer.promise;
        }
    }
    return service;
}]);


app.filter('slugify', [function slugify() {
    return function(string) {
        if (!string) return;
        return string.toLowerCase()
        	.replace(/[äå]+/g, 'a')
        	.replace(/[ö]+/g, 'o')
        	.replace(/[^a-z0-9]+/g, '-')
        	.replace(/^-|-$/g, '');;
    };
}]);

app.filter('fromNow', [function fromNow() {
    return function(date) {
        if (!date) return;
        return moment(date).fromNow();
    }
}]);

app.directive('restrict', ['$parse', function restrict(parseProvider) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, iElement, iAttrs, controller) {
            scope.$watch(iAttrs.ngModel, function(value) {
                if (!value) 
                    return;
                
                parseProvider(iAttrs.ngModel)
                	.assign(scope, value.toString()
                	.replace(new RegExp(iAttrs.restrict, 'g'), ''));
            })
        }
    }
}]);