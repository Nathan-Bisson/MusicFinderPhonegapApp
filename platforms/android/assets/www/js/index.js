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
	var networkState = navigator.connection.type;
	
	if(networkState === Connection.NONE) {
		alert("Oh no! You don't have a data connection!");
	} else {
		discoverArtist();
	}
});

document.getElementById("discGenre").addEventListener("click", function() {
	var networkState = navigator.connection.type;
	
	if(networkState === Connection.NONE) {
		alert("Oh no! You don't have a data connection!");
	} else {
		discoverGenre();
	}
});

document.getElementById("relatedAritistSearch").addEventListener("click", function() {
	var networkState = navigator.connection.type;
	
	if(networkState === Connection.NONE) {
		alert("Oh no! You don't have a data connection!");
	} else {
		relatedArtists();
	}
});

document.getElementById("relatedSongSearchButton").addEventListener("click", function() {
	var networkState = navigator.connection.type;
	
	if(networkState === Connection.NONE) {
		alert("Oh no! You don't have a data connection!");
	} else {
		relatedSongs();
	}
});

document.getElementById("buttonWorld").addEventListener("click", function() {
	var networkState = navigator.connection.type;
	
	if(networkState === Connection.NONE) {
		alert("Oh no! You don't have a data connection!");
	} else {
		worldEvent();
	}
});

$("#artistResultEventList").on('click', 'li', function() { //in-app browser for discover page
	eventURL = this.id;
	
	var webBrowser = window.open(encodeURI(eventURL), '_blank');
	webBrowser.addEventListener('exit', function(event) { //bug where page won't show once closed. This line fixes that
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

$("#eventsWorldwideResultList").on('click', 'li', function() { //in-app browser for world event page
	eventURL = this.id;
	
	var webBrowser = window.open(encodeURI(eventURL), '_blank');
	/*webBrowser.addEventListener('exit', function(event) { //bug where page won't show once closed. This line fixes that
	$( "#discoveryTab" ).removeClass( "active" );
	$( "#relatedTab" ).removeClass( "active" );
	$( "#eventsTab" ).addClass( "active" );
	
	$( "#discovery" ).removeClass( "show" );
	$( "#discovery" ).addClass( "hide" );
	$( "#related" ).removeClass( "show" );
	$( "#related" ).addClass( "hide" );
	$( "#events" ).removeClass( "hide" );
	$( "#events" ).addClass( "show" );
	});*/
});

function discoverArtist() {
	var searchedArtist = document.getElementById("searchArtist").value;
	
	document.getElementById("artistResultList").innerHTML = "";
	document.getElementById("topSongsList").innerHTML = "";
	document.getElementById("topAlbumsList").innerHTML = "";
	document.getElementById("artistResultEventList").innerHTML = "";
	
	var lastfm = new LastFM({
  		apiKey    : 'db2a9b5638ab52fb92255a9e3e9a4c13',
  		apiSecret : '718ae7b5fe78a60a6bb648977b221411',
	});

	lastfm.artist.search({artist: searchedArtist, limit: 5, autocorrect: "1"}, {success: function(data){
  		console.log(data);
		var artistImageObject = data.results.artistmatches.artist[0].image[1]; 
		var artistImage = artistImageObject[Object.keys(artistImageObject)[0]];
			
		document.getElementById("artistResultList").innerHTML += ' <li class="table-view-cell media"> <img class="media-object pull-left" src="' + artistImage + '">' + data.results.artistmatches.artist[0].name + '</div></li>'
	}, error: function(code, message){
  		console.log("Oh No an Error!");
	}});
	
	lastfm.artist.getTopTracks({artist: searchedArtist, limit: 5, autocorrect: "1"}, {success: function(data){
  		console.log(data);
		for(var i = 0; i < data.toptracks.track.length; i++) {
			/*var songImageObject = data.toptracks.track[i].image[0] //data.results.artistmatches.artist[i].image[0]; 
			var songImage = songImageObject[Object.keys(songImageObject)[0]];
			
			document.getElementById("topSongsList").innerHTML += ' <li class="table-view-cell media"> <img class="media-object pull-left" src="' + songImage + '">' + data.toptracks.track[i].name + '</div></li>'*/
			document.getElementById("topSongsList").innerHTML += '<li class="topSong table-view-cell">' + data.toptracks.track[i].name + '</li>'
		}
	}, error: function(code, message){
  		console.log("Oh No an Error!");
	}});
	
	lastfm.artist.getTopAlbums({artist: searchedArtist, limit: 5, autocorrect: "1"}, {success: function(data){
  		console.log(data);
		for(var i = 0; i < data.topalbums.album.length; i++) {
			var songImageObject = data.topalbums.album[i].image[0] //data.results.artistmatches.artist[i].image[0]; 
			var songImage = songImageObject[Object.keys(songImageObject)[0]];
			
			document.getElementById("topAlbumsList").innerHTML += ' <li class="table-view-cell media"> <img class="media-object pull-left" src="' + songImage + '">' + data.topalbums.album[i].name + '</div></li>'
			
			//document.getElementById("topAlbumsList").innerHTML += '<li class="artistResult table-view-cell">' + data.topalbums.album[i].name + '</li>'
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
			
			document.getElementById("artistResultEventList").innerHTML += '<li id="' + infoURL + '" class="table-view-cell media"> <a class="navigate-right"> <img class="media-object pull-left" src="' + eventImage + '"> <div class="media-body">' + data.events.event[i].venue.name + '<p>Date: ' + data.events.event[i].startDate + '</p> </div> </a>'
		}
	}, error: function(code, message){
  		console.log("Oh No an Error!");
	}});
}

function discoverGenre() {
	var searchedGenre = document.getElementById("searchGenre").value;
	
	document.getElementById("genreResultList").innerHTML = "";
	document.getElementById("genreTopSongsList").innerHTML = "";
	document.getElementById("genreTopAlbumsList").innerHTML = "";
	
	var lastfm = new LastFM({
  		apiKey    : 'db2a9b5638ab52fb92255a9e3e9a4c13',
  		apiSecret : '718ae7b5fe78a60a6bb648977b221411',
	});
	
	lastfm.tag.getTopArtists({tag: searchedGenre, limit: 5}, {success: function(data){
  		console.log(data);
		for(var i = 0; i < data.topartists.artist.length; i++) {
			var artistImageObject = data.topartists.artist[i].image[1] //data.results.artistmatches.artist[i].image[0]; 
			var artistImage = artistImageObject[Object.keys(artistImageObject)[0]];
			
			document.getElementById("genreResultList").innerHTML += ' <li class="table-view-cell media"> <img class="media-object pull-left" src="' + artistImage + '">' + data.topartists.artist[i].name + '</div></li>'
			
			//document.getElementById("genreResultList").innerHTML += '<li class="genreArtistsResult table-view-cell">' + data.topartists.artist[i].name + '</li>'
		}
	}, error: function(code, message){
  		console.log("Oh No an Error!");
	}});
	
	lastfm.tag.getTopTracks({tag: searchedGenre, limit: 5}, {success: function(data){
  		console.log(data);
		for(var i = 0; i < data.toptracks.track.length; i++) {
			var trackName = data.toptracks.track[i].name;
			var artistName = data.toptracks.track[i].artist.name;
			
			document.getElementById("genreTopSongsList").innerHTML += '<li class="genreArtistsResult table-view-cell">' + trackName + ' - ' + artistName + '</li>'
		}
	}, error: function(code, message){
  		console.log("Oh No an Error!");
	}});
	
	lastfm.tag.getTopAlbums({tag: searchedGenre, limit: 5}, {success: function(data){
  		console.log(data);
		for(var i = 0; i < data.topalbums.album.length; i++) {
			var albumName = data.topalbums.album[i].name;
			var artistName = data.topalbums.album[i].artist.name;
			var artistImageObject = data.topalbums.album[i].image[0] //data.results.artistmatches.artist[i].image[0]; 
			var artistImage = artistImageObject[Object.keys(artistImageObject)[0]];
			
			document.getElementById("genreTopAlbumsList").innerHTML += ' <li class="table-view-cell media"> <img class="media-object pull-left" src="' + artistImage + '">' + albumName + ' - ' + artistName + '</div></li>'
			
			//document.getElementById("genreTopAlbumsList").innerHTML += '<li class="genreArtistsResult table-view-cell">' + albumName + ' - ' + artistName + '</li>'
		}
	}, error: function(code, message){
  		console.log("Oh No an Error!");
	}});
}

function relatedArtists() {
	var artistSearch = document.getElementById("searchRelatedArtist").value;
	
	document.getElementById("relatedArtistResultList").innerHTML = "";
	
	var lastfm = new LastFM({
  		apiKey    : 'db2a9b5638ab52fb92255a9e3e9a4c13',
  		apiSecret : '718ae7b5fe78a60a6bb648977b221411',
	});
	
	lastfm.artist.getSimilar({artist: artistSearch, limit: 5, autocorrect: "1"}, {success: function(data){
  		console.log(data);
		for(var i = 0; i < data.similarartists.artist.length; i++) {
			var artistImageObject = data.similarartists.artist[i].image[1];
			var artistImage = artistImageObject[Object.keys(artistImageObject)[0]];
			
			document.getElementById("relatedArtistResultList").innerHTML += ' <li class="table-view-cell media"> <img class="media-object pull-left" src="' + artistImage + '">' + data.similarartists.artist[i].name + '</div></li>'
		}
	}, error: function(code, message){
  		console.log("Oh No an Error!");
	}});
}

function relatedSongs() {
	var songSearch = document.getElementById("relatedSongSearch").value;
	
	document.getElementById("searchedSongResultList").innerHTML = "";
	document.getElementById("relatedSearchedTopSongsList").innerHTML = "";
	
	var lastfm = new LastFM({
  		apiKey    : 'db2a9b5638ab52fb92255a9e3e9a4c13',
  		apiSecret : '718ae7b5fe78a60a6bb648977b221411',
	});
	
	lastfm.track.search({track: songSearch, limit: 5}, {success: function(data){
  		console.log(data);
		var trackName = data.results.trackmatches.track[0].name;
		var artistName = data.results.trackmatches.track[0].artist;
		
		document.getElementById("searchedSongResultList").innerHTML += '<li class="artistResult table-view-cell">' + trackName + ' - ' + artistName + '</li>';
		
		lastfm.track.getSimilar({track: trackName, artist: artistName, limit: 5, autocorrect: "1"}, {success: function(data){
  			console.log(data);
			for(var i = 0; i < data.similartracks.track.length; i++) {
				var relatedTrackName = data.similartracks.track[i].name;
				var relatedArtistName = data.similartracks.track[i].artist.name;
			
				document.getElementById("relatedSearchedTopSongsList").innerHTML += '<li class="topSong table-view-cell">' + relatedTrackName + ' - ' + artistName + '</li>';
			}
		
		}, error: function(code, message){
  			console.log("Oh No an Error!");
		}});
	
	}, error: function(code, message){
  		console.log("Oh No an Error!");
	}});
	
}

function gpsLocation() {
	//navigator.geolocation.getCurrentPosition(successCallback, errorCallback, { maximumAge: 10000, timeout: 10000, enableHighAccuracy: true });
		
	var latitude = 45.4214;
	var longitude = -75.6919;
	
	var mapProp = {
    	center:new google.maps.LatLng(latitude,longitude),
    	zoom:12,
    	mapTypeId:google.maps.MapTypeId.ROADMAP
  	};
    var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
	
	var latlng = new google.maps.LatLng(latitude, longitude);
    var geocoder = new google.maps.Geocoder();
	
	geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          var cityResults = results[1].formatted_address;
		  var citySplit = cityResults.split(" " )[0];
		  var city = citySplit.replace(",", "");
		  alert(city);
		  
		  var lastfm = new LastFM({
  				apiKey    : 'db2a9b5638ab52fb92255a9e3e9a4c13',
  				apiSecret : '718ae7b5fe78a60a6bb648977b221411',
			});
	
			lastfm.geo.getEvents({location: city, limit: 5}, {success: function(data){
				console.log(data);
				for(var i = 0; i < data.events.event.length; i++) {
					var venueObject = data.events.event[i].venue.location['geo:point'];
					var venueLat = venueObject[Object.keys(venueObject)[0]];
					var venueLong = venueObject[Object.keys(venueObject)[1]];
					var venuelatLong = new google.maps.LatLng(venueLat, venueLong);
					
					var marker = new google.maps.Marker({
                		map: map,
                		position: venuelatLong, 
						animation: google.maps.Animation.DROP
            });
				}
			}, error: function(code, message){
				console.log("Oh No an Error!");
			}});
			
			lastfm.geo.getEvents({location: city, limit: 5}, {success: function(data){
				for(var i = 0; i < data.events.event.length; i++) {
					var imageObject = data.events.event[i].image[1]; //object containg image url and url size
					var eventImage = imageObject[Object.keys(imageObject)[0]];
					var infoURL = data.events.event[i].url;
					console.log(infoURL);
			
					document.getElementById("nearYouResultList").innerHTML += '<li id="' + infoURL + '" class="table-view-cell media"> <a class="navigate-right"> <img class="media-object pull-left" src="' + eventImage + '"> <div class="media-body">' + data.events.event[i].artists['headliner'] + '<p>Date: ' + data.events.event[i].startDate + '</p> </div> </a>'
				}
			}, error: function(code, message){
				console.log("Oh No an Error!");
			}});
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
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
                		position: venuelatLong, 
						animation: google.maps.Animation.DROP
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
			
			document.getElementById("eventsWorldwideResultList").innerHTML += '<li id="' + infoURL + '" class="table-view-cell media"> <a class="navigate-right"> <img class="media-object pull-left" src="' + eventImage + '"> <div class="media-body">' + data.events.event[i].artists['headliner'] + '<p>Date: ' + data.events.event[i].startDate + '</p> </div> </a>'
		}
	}, error: function(code, message){
		console.log("Oh No an Error!");
	}});
}


function successCallback(position) {      
	var latitude = position.coords.latitude;
	var longitude =  position.coords.longitude;
}

function errorCallback(error) { 
	alert(error.code);
}           