var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};

app.initialize();

$( "#genreTab" ).click(function() {
	$( "#artist" ).removeClass( "show" );  
	$( "#artist" ).addClass( "hide" );
	$( "#genre" ).removeClass( "hide" );  
	$( "#genre" ).addClass( "show" );
});

$( "#artistTab" ).click(function() {
	$( "#genre" ).removeClass( "show" );  
	$( "#genre" ).addClass( "hide" );
	$( "#artist" ).removeClass( "hide" );  
	$( "#artist" ).addClass( "show" );
});

$( "#relatedSongTab" ).click(function() {
	$( "#relatedArtists" ).removeClass( "show" );  
	$( "#relatedArtists" ).addClass( "hide" );
	$( "#relatedSongs" ).removeClass( "hide" );  
	$( "#relatedSongs" ).addClass( "show" );
});

$( "#relatedArtistTab" ).click(function() {
	$( "#relatedSongs" ).removeClass( "show" );  
	$( "#relatedSongs" ).addClass( "hide" );
	$( "#relatedArtists" ).removeClass( "hide" );  
	$( "#relatedArtists" ).addClass( "show" );
});

$( "#worldwideTab" ).click(function() {
	$( "#nearYou" ).removeClass( "show" );  
	$( "#nearYou" ).addClass( "hide" );
	$( "#worldwide" ).removeClass( "hide" );  
	$( "#worldwide" ).addClass( "show" );
});

$( "#nearYouTab" ).click(function() {
	$( "#worldwide" ).removeClass( "show" );  
	$( "#worldwide" ).addClass( "hide" );
	$( "#nearYou" ).removeClass( "hide" );  
	$( "#nearYou" ).addClass( "show" );
});

$( "#discoveryTab" ).click(function() {
	$( "#discoveryTab" ).addClass( "active" );
	$( "#relatedTab" ).removeClass( "active" );
	$( "#eventsTab" ).removeClass( "active" );	
	
	$( "#discovery" ).removeClass( "hide" );
	$( "#discovery" ).addClass( "show" );
	$( "#related" ).removeClass( "show" );
	$( "#related" ).addClass( "hide" );
	$( "#events" ).removeClass( "show" );
	$( "#events" ).addClass( "hide" );
});

$( "#relatedTab" ).click(function() {
	$( "#discoveryTab" ).removeClass( "active" );
	$( "#relatedTab" ).addClass( "active" );
	$( "#eventsTab" ).removeClass( "active" );
	
	$( "#discovery" ).removeClass( "show" );
	$( "#discovery" ).addClass( "hide" );
	$( "#related" ).removeClass( "hide" );
	$( "#related" ).addClass( "show" );
	$( "#events" ).removeClass( "show" );
	$( "#events" ).addClass( "hide" );
});

$( "#eventsTab" ).click(function() {
	$( "#discoveryTab" ).removeClass( "active" );
	$( "#relatedTab" ).removeClass( "active" );
	$( "#eventsTab" ).addClass( "active" );
	
	$( "#discovery" ).removeClass( "show" );
	$( "#discovery" ).addClass( "hide" );
	$( "#related" ).removeClass( "show" );
	$( "#related" ).addClass( "hide" );
	$( "#events" ).removeClass( "hide" );
	$( "#events" ).addClass( "show" );
	
	gpsLocation();
});

$( "#artistResultEventList" ).click(function() {
	$( "#discovery" ).removeClass( "show" );
	$( "#discovery" ).addClass( "hide" );
});

document.getElementById("discArtist").addEventListener("click", function() {
	discoverArtist();
});

document.getElementById("discGenre").addEventListener("click", function() {
	discoverGenre();
});

document.getElementById("nearYouButton").addEventListener("click", function() {
	nearYouMap();
});

document.getElementById("buttonWorld").addEventListener("click", function() {
	worldEvent();
});

$("#artistResultEventList").on('click', 'li', function() {
	eventURL = this.id;
	
	var webBrowser = window.open(encodeURI(eventURL), '_blank');
	webBrowser.addEventListener('exit', function(event) { //glitch where page won't show once closed. This line fixes that
		$( "#discoveryTab" ).addClass( "active" );
		$( "#relatedTab" ).removeClass( "active" );
		$( "#eventsTab" ).removeClass( "active" );	
	
		$( "#discovery" ).removeClass( "hide" );
		$( "#discovery" ).addClass( "show" );
		$( "#related" ).removeClass( "show" );
		$( "#related" ).addClass( "hide" );
		$( "#events" ).removeClass( "show" );
		$( "#events" ).addClass( "hide" );
	});
});

function discoverArtist() {
	var searchedArtist = document.getElementById("searchArtist").value;
	alert(searchedArtist);
	
	document.getElementById("artistResultList").innerHTML = "";
	document.getElementById("topSongsList").innerHTML = "";
	document.getElementById("topAlbumsList").innerHTML = "";
	document.getElementById("artistResultEventList").innerHTML = "";
	
	var lastfm = new LastFM({
  		apiKey    : 'db2a9b5638ab52fb92255a9e3e9a4c13',
  		apiSecret : '718ae7b5fe78a60a6bb648977b221411',
	});

	lastfm.artist.search({artist: searchedArtist, limit: 5, autocorrect: "1"}, {success: function(data){
  		document.getElementById("artistResultList").innerHTML += '<li class="artistResult table-view-cell">' + data.results.artistmatches.artist[0].name + '</li>'
	}, error: function(code, message){
  		console.log("Oh No an Error!");
	}});
	
	lastfm.artist.getTopTracks({artist: searchedArtist, limit: 5, autocorrect: "1"}, {success: function(data){
  		for(var i = 0; i < data.toptracks.track.length; i++) {
			document.getElementById("topSongsList").innerHTML += '<li class="artistResult table-view-cell">' + data.toptracks.track[i].name + '</li>'
		}
	}, error: function(code, message){
  		console.log("Oh No an Error!");
	}});
	
	lastfm.artist.getTopAlbums({artist: searchedArtist, limit: 5, autocorrect: "1"}, {success: function(data){
  		for(var i = 0; i < data.topalbums.album.length; i++) {
			document.getElementById("topAlbumsList").innerHTML += '<li class="artistResult table-view-cell">' + data.topalbums.album[i].name + '</li>'
		}
	}, error: function(code, message){
  		console.log("Oh No an Error!");
	}});
	
	lastfm.artist.getEvents({artist: searchedArtist, limit: 5, autocorrect: "1"}, {success: function(data){
  		console.log(data);
		for(var i = 0; i < data.events.event.length; i++) {
			var imageObject = data.events.event[i].image[1]; //object containg image url and url size
			var eventImage = imageObject[Object.keys(imageObject)[0]];
			var infoURL = data.events.event[i].url;
			console.log(infoURL);
			
			document.getElementById("artistResultEventList").innerHTML += '<li id="' + infoURL + '" class="table-view-cell media"> <a class="navigate-right"> <img class="media-object pull-left" src="' + eventImage + '"> <div class="media-body">' + data.events.event[i].venue.name + '<p>Date: ' + data.events.event[i].startDate + '</p> </div> </a>'
		}
	}, error: function(code, message){
  		console.log("Oh No an Error!");
	}});
}

function discoverGenre() {
	var searchedGenre = document.getElementById("searchGenre").value;
	alert(searchedGenre);
	
	document.getElementById("genreResultList").innerHTML = "";
	document.getElementById("genreTopSongsList").innerHTML = "";
	document.getElementById("genreTopAlbumsList").innerHTML = "";
	
	var lastfm = new LastFM({
  		apiKey    : 'db2a9b5638ab52fb92255a9e3e9a4c13',
  		apiSecret : '718ae7b5fe78a60a6bb648977b221411',
	});
	
	lastfm.tag.getTopArtists({tag: searchedGenre, limit: 5}, {success: function(data){
  		for(var i = 0; i < data.topartists.artist.length; i++) {
			document.getElementById("genreResultList").innerHTML += '<li class="genreArtistsResult table-view-cell">' + data.topartists.artist[i].name + '</li>'
		}
	}, error: function(code, message){
  		console.log("Oh No an Error!");
	}});
	
	lastfm.tag.getTopTracks({tag: searchedGenre, limit: 5}, {success: function(data){
  		for(var i = 0; i < data.toptracks.track.length; i++) {
			var trackName = data.toptracks.track[i].name;
			var artistName = data.toptracks.track[i].artist.name;
			document.getElementById("genreTopSongsList").innerHTML += '<li class="genreArtistsResult table-view-cell">' + trackName + ' - ' + artistName + '</li>'
		}
	}, error: function(code, message){
  		console.log("Oh No an Error!");
	}});
	
	lastfm.tag.getTopAlbums({tag: searchedGenre, limit: 5}, {success: function(data){
  		for(var i = 0; i < data.topalbums.album.length; i++) {
			var albumName = data.topalbums.album[i].name;
			var artistName = data.topalbums.album[i].artist.name;
			document.getElementById("genreTopAlbumsList").innerHTML += '<li class="genreArtistsResult table-view-cell">' + albumName + ' - ' + artistName + '</li>'
		}
	}, error: function(code, message){
  		console.log("Oh No an Error!");
	}});
}

function nearYouMap() {
	var mapProp = {
    center:new google.maps.LatLng(51.508742,-0.120850),
    zoom:5,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}

function gpsLocation() {
	alert("yes");
	navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}

function worldEvent() {
	var searchedCity = document.getElementById("searchedCity").value;
	
	document.getElementById("eventsWorldwideResultList").innerHTML = "";
	
	var geocoder = new google.maps.Geocoder();
	
	geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': searchedCity}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var myOptions = {
                zoom: 12,
                center: results[0].geometry.location,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            map = new google.maps.Map(document.getElementById("worldMap"), myOptions);
			
			var lastfm = new LastFM({
  				apiKey    : 'db2a9b5638ab52fb92255a9e3e9a4c13',
  				apiSecret : '718ae7b5fe78a60a6bb648977b221411',
			});
	
			lastfm.geo.getEvents({location: searchedCity, limit: 5}, {success: function(data){
				console.log(data);
				for(var i = 0; i < data.events.event.length; i++) {
					var venueObject = data.events.event[i].venue.location['geo:point'];
					var venueLat = venueObject[Object.keys(venueObject)[0]];
					var venueLong = venueObject[Object.keys(venueObject)[1]];
					var venuelatLong = new google.maps.LatLng(venueLat, venueLong);
					
					var marker = new google.maps.Marker({
                		map: map,
                		position: venuelatLong 
            });
				}
			}, error: function(code, message){
				console.log("Oh No an Error!");
			}});
		}
    });
		
	var lastfm = new LastFM({
  		apiKey    : 'db2a9b5638ab52fb92255a9e3e9a4c13',
  		apiSecret : '718ae7b5fe78a60a6bb648977b221411',
	});
	
	lastfm.geo.getEvents({location: searchedCity, limit: 5}, {success: function(data){
		for(var i = 0; i < data.events.event.length; i++) {
			var imageObject = data.events.event[i].image[1]; //object containg image url and url size
			var eventImage = imageObject[Object.keys(imageObject)[0]];
			var infoURL = data.events.event[i].url;
			console.log(infoURL);
			
			document.getElementById("eventsWorldwideResultList").innerHTML += '<li id="' + infoURL + '" class="table-view-cell media"> <a class="navigate-right"> <img class="media-object pull-left" src="' + eventImage + '"> <div class="media-body">' + data.events.event[i].venue.name + '<p>Date: ' + data.events.event[i].startDate + '</p> </div> </a>'
		}
	}, error: function(code, message){
		console.log("Oh No an Error!");
	}});
}


function successCallback(position) {      
	alert("hello");
}
function errorCallback(error) { 
	alert(error.code);
}           