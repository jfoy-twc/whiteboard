app.config(['$routeProvider', '$locationProvider', 'RestangularProvider', 
    'growlProvider', 'localStorageServiceProvider', function configureProviders(
    $routeProvider, $locationProvider, RestangularProvider, growlProvider, localStorageServiceProvider) {
    
    $locationProvider.html5Mode(true).hashPrefix('!');
    var baseURL = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/api';
    moment.lang('sv');
    RestangularProvider.setBaseUrl(baseURL);
    RestangularProvider.setDefaultHttpFields({cache: true});
    RestangularProvider.setDefaultHeaders({
        'Content-Type': 'application/json; charset=utf-8'});
    RestangularProvider.setRestangularFields({id: "_id"});
    growlProvider.globalTimeToLive(3000);
    localStorageServiceProvider.setPrefix('sc');

    var requiresAuthentication = {
        userInfo: ['authService',
            function(authService) {
                return authService.isAuthenticatedResolved();
            }
        ]
    };

    $routeProvider
        .when('/404', {
            title: 'Sidan kunde inte hittas',
            templateUrl: '/view/404.html'
        })

        .when('/', {
            title: 'Whiteboard',
            templateUrl: '/view/app/home.html',
            controller: 'SearchCourseCtrl'
        })
        .when('/course/new',{
            title: 'New course',
            templateUrl: '/view/course/new.html',
            controller: 'NewCourseCtrl'
        })

        .when('/course/:id/edit', {
            title: 'Course',
            templateUrl: '/view/course/edit.html',
            controller: 'EditCourseCtrl'
        })




        .when('/course/:id/resource/new', {
            title: 'Course',
            templateUrl: '/view/resource/new.html',
            controller: 'NewResourceCtrl'
        })

        

        .when('/course/:id/resource/:rid', {
            title: 'Resource',
            templateUrl: '/view/resource/resource.html',
            controller: 'ResourceCtrl'
        })
        .when('/course/:id', {
            title: 'Course',
            templateUrl: '/view/course/course.html',
            controller: 'CourseCtrl'
        })



        .when('/course/:id/announce', {
            title: 'Announce',
            templateUrl: '/view/course/announce.html',
            controller: 'NewAnnounceCtrl'
        })




        .when('/user/login', {
            title: 'User',
            templateUrl: '/view/user/login.html',
            controller: 'AuthCtrl'
        })

        .when('/user/register', {
            title: 'User',
            templateUrl: '/view/user/register.html',
            controller: 'AuthCtrl'
        })

        .when('/user/:id/edit', {
            title: 'User',
            templateUrl: '/view/user/edit.html',
            controller: 'EditUserCtrl'
        })

        .when('/user/:id', {
            title: 'User',
            templateUrl: '/view/user/user.html',
            controller: 'UserCtrl'
        })




        .otherwise({
            redirectTo: '/404'
        });
}]);