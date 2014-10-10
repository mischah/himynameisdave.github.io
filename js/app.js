//	Written by Dave Lunny
var app = angular.module('app', ['ui.router']);


app.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/");

	$stateProvider
	    .state('home', {
	      url: "/",
	      templateUrl: "partials/view.html",
	      controller: "MainCtrl"
	    })
});


app.controller('MainCtrl', function ($scope, $window) {

	var h = $(window).height();
	var animOccured = false;
	$(window).scroll(function(){
		var s = $(window).scrollTop();
		if(!animOccured){
			if( (s/h*100) > 52  ){
				TweenLite.to( $('section#skills'), 1.6, { maxWidth: "500px" });
				animOccured = true;
			}
		}

	});


	function init(){

		setTimeout(function(){
			var face = $('#face'), 
				hmnid = $('#hmnid'), 
				info = $('#info'); 

			var tl = new TimelineMax();
			//append a to() tween
			tl.to(face, 1.7, {left:"50%", rotation: 360, ease: Back.easeOut });
			tl.to(hmnid, 0.65, { scale: 1, opacity: 1, ease: Back.easeOut });
			tl.to(info, 0.65, { scale: 1, opacity: 1, ease: Back.easeOut });

		},100);




	};

	//later move to le json
	$scope.skills = [
							{
								"skill"	: 	"HTML5",
								"level"	: 	10
							}
						,	{
								"skill"	: 	"CSS/LESS/SASS",
								"level"	: 	10
							}
						,	{
								"skill"	: 	"Angular.JS",
								"level"	: 	6
							}
						,	{
								"skill"	: 	"Photoshop/Illustrator",
								"level"	: 	10
							}
						,	{
								"skill"	: 	"Bootstrap",
								"level"	: 	7
							}
						,	{
								"skill"	: 	"Git",
								"level"	: 	5
							}
						,	{
								"skill"	: 	"Node.js",
								"level"	: 	4
							}
					];


	$(document).ready(init)

});