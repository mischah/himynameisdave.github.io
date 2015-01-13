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


app.controller('MainCtrl', function ($scope, $window, $log) {

	var h = $(window).height();
	$scope.animOccured = false;
	$(window).scroll(function(){
		var s = $(window).scrollTop();
		if(!$scope.animOccured){
			if( (s/h*100) >= 52  ){
				$scope.skillsAnim();
				// TweenLite.to( $('section#skills'), 1.6, { maxWidth: "600px" });
				$scope.animOccured = true;
			}
		}

	});


	$scope.rollFace = function(){
		var face 	= document.getElementById('face'), 
			hmnid 	= document.getElementById('hmnid'), 
			info 	= document.getElementById('info'); 

		var tl = new TimelineMax();
		//append a to() tween
		tl.to(face, 1.7, {left:"50%", rotation: 360, ease: Back.easeOut });
		tl.to(hmnid, 0.65, { scale: 1, opacity: 1, ease: Back.easeOut });
		tl.to(info, 0.65, { scale: 1, opacity: 1, ease: Back.easeOut });
	};

	$scope.checkIfScrolldownNeeded = function(){
		//quick check on load (cause they might not scroll right away)
		if( (($(window).scrollTop() - $(window).height() * 100) >= 52) && !$scope.animOccured){
			$scope.skillsAnim();
			$scope.animOccured = true;
		}	
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
			},1620);


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

	$scope.skillsAnim = function(){

		//	SKILLS TIME LINE
		var STL = new TimelineMax();

		$.each( $scope.skills, function(i, val){
			// var dur = (val.level/8);
			// $log.log(dur);
			dur = 1.875;
			STL.to( $('#'+val.id), dur, { width: (val.level*10+'%'), ease: Elastic.easeOut}, "-=1.4");
		});

		STL.play();
	};


	//later move to le json
	$scope.skills = [
							{
								"skill"	: 	"HTML5",
								"id"	: 	"html",
								"level"	: 	10,
								"info"	: 	"Just semantics is all..."
							}
						,	{
								"skill"	: 	"CSS/LESS/SASS",
								"id"	: 	"css",
								"level"	: 	10,
								"info" 	: 	"You name it, I pre-process it!"
							}
						,	{
								"skill"	: 	"Angular.JS",
								"id"	: 	"angular",
								"level"	: 	6,
								"info"  : 	"Superheroic Motor Vehicle Controller"
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
			

			var intr = setInterval(function(){
				var check1 = false, check2 = false;
				if(document.getElementById('face') != null){
				  	$scope.rollFace();
					$scope.checkIfScrolldownNeeded();
					check1 = true;
				}
				if(!$scope.animOccured){
					var h = $(window).height(), 
						s = $(window).scrollTop();
						if( (s/h*100) >= 52  ){
							$scope.skillsAnim();
							$scope.animOccured = true;
							check2 = true;
						}
				}else{
					check2 = true;
				}

				if(check1 && check2){
					clearInterval(intr);
				}

			},20);
			
			



});
