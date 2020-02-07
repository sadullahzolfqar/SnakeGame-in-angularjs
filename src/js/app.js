var app=angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/game', {
            templateUrl: 'snake.html',
            controller: 'GameController'
        })
        .otherwise({redirectTo: '/game'});
}]);