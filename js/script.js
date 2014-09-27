//	Written by Dave Lunny
window.onload = function(){ init(); };

var init = function(){

	initTweets();
	initLastfm();

	$(window).scrollTop(0)

	var R = {
		scrDir: 	$('.scroll-dir'),
		opImg: 		$('.opaque-img'),
		wrap:  		$('.wrap'),
		hr: 		$('hr.horz-bar'),
		info: 		$('.info')
	}


	$(window).on("scroll", function(){

		var st = $(window).scrollTop();
		var loop1 = 900;
		var loop2 = 1500;

		if(st <= loop1){ 
			var o = st / loop1;
			R.opImg.css('opacity',o);

			st += 'px' 
			R.wrap.css('top',st);

			R.hr.css('width', '0');
		}else if(st > loop1 && st <= loop2){ 
			R.opImg.css('opacity','1');
			
			var inny =  loop2 - loop1;
			var outy =  st - loop1;
			var inOut = ((outy / inny)*100) + '%';

			R.hr.css('width',inOut);

			st += 'px' 
			R.wrap.css('top',st);
		}

	})

};	

function initTweets() {

	var t = {
		  "id": '515973741746982912',
		  // "id": 	'347099293930377217',
		  "domId": 'tweetFetch',
		  "maxTweets": 1,
		  "enableLinks": true
		};
		twitterFetcher.fetch(t);

};

function initLastfm() {

	var url = 'http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=himynameisdave9&api_key=f6b2404b834b98950426759ae60e5d60&format=json';

	$.getJSON( url, function( data ) {
		var info = data.recenttracks.track[0];
			
		var track 		= info.name,
			albumArt 	= info.image[info.image.length-1]["#text"],
			album 		= info.album["#text"],
			artist 		= info.artist["#text"];

		$("#album-art").append("<img src='"+ albumArt +"' />");
		$("#track").append(track);
		$("#album").append(album);
		$("#artist").append(artist);

	});


}

