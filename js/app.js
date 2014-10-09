//	Written by Dave Lunny
var app = angular.module('app', ['ui.router']);


app.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/");

	$stateProvider
	    .state('home', {
	      url: "/",
	      templateUrl: "partials/view.html",
	      controller: "Controller"
	    })
});


app.controller('Controller', function ($scope) {

	function init(){
		var tl = new TimelineMax();

		setTimeout(function(){
			var face = $('#face'), 
				hmnid = $('#hmnid'), 
				info = $('#info'); 

			//append a to() tween
			tl.to(face, 1.6, {top:"10%", scale: 1});
			tl.to(hmnid, 0.8, { scale: 1, opacity: 1 });
			tl.to(info, 0.8, { scale: 1, opacity: 1 });

		},200);
	};

	$(document).ready(init)

});