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
				TweenLite.to( $('section#skills'), 1.6, { maxWidth: "600px" });
				animOccured = true;
			}
		}

	});


	function init(){

		//quick check on load (cause they might not scroll right away)
		if( ($(window).scrollTop() - $(window).height() * 100) > 52 && !animOccured){
			TweenLite.to( $('section#skills'), 1.6, { maxWidth: "600px" });
			animOccured = true;
		}

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

	$scope.swapInProgress = false;
	$scope.swapSkillInfo = function(skill){
		if(!$scope.swapInProgress){
			$scope.swapInProgress = true;
		
			closeText('skillName', skill);
			openText('skillInfo', skill);

			setTimeout(function(){
				openText('skillName', skill);
				closeText('skillInfo', skill);
				$scope.swapInProgress = false;
			},1800);


			function closeText(type, skill){
				var closeTl = new TimelineMax;

				closeTl.to( $("#"+skill+".skillbar ."+type), 0.4, {height: "0px",opacity: 0});
				closeTl.to( $("#"+skill+".skillbar ."+type), 0.001, {display: "none"});
			}
			function openText(type, skill){
				var openTl = new TimelineMax;

				openTl.to( $("#"+skill+".skillbar ."+type), 0.001, {display: "block"});
				openTl.to( $("#"+skill+".skillbar ."+type), 0.4, {height: "25px",opacity: 1});
			}	
		}

	};	

	//later move to le json
	$scope.skills = [
							{
								"skill"	: 	"HTML5",
								"id"	: 	"html",
								"level"	: 	10,
								"info"	: 	"Love and embrace the modern web, and respect it for the thing of beauty it is."
							}
						,	{
								"skill"	: 	"CSS/LESS/SASS",
								"id"	: 	"css",
								"level"	: 	10,
								"info" 	: 	"If you 'aint pre-processing your CSS, you 'aint livin."
							}
						,	{
								"skill"	: 	"Angular.JS",
								"id"	: 	"angular",
								"level"	: 	6,
								"info"  : 	"Superheroic Motor Vehicle Contoller"
							}
						,	{
								"skill"	: 	"Photoshop/Illustrator",
								"id"	: 	"phspIll",
								"level"	: 	10,	
								"info" 		: 	"\"Looks kinda shopped, bro.\""
							}
						,	{
								"skill"	: 	"Bootstrap",
								"id"	: 	"bootstrap",
								"level"	: 	7,
								"info" 	: 	"That other thing Twitter does."
							}
						,	{
								"skill"	: 	"Git",
								"id"	: 	"git",
								"level"	: 	5,
								"info" 	: 	"pull reset checkout clone merge"
							}
						,	{
								"skill"	: 	"Node.js",
								"id"	: 	"node",
								"level"	: 	4,
								"info"	: 	"\"So, you like JavaScript eh...\""
							}
					];


	$(document).ready(init)

});