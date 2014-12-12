MAD9135-FINAL
=============

Group Members
-------------
Nathan Bisson(biss0180) - Nathan-Bisson
Andrew Hiller(hill0243) - andrew09

Framework used: Ratchet(http://goratchet.com/)

Api used: last.fm(http://www.last.fm/api)
          Google Maps(https://developers.google.com/maps/)

Created for iOS and Android using Cordova. Tested on iOS 8.1 and Android KitKat 4.4

Known Bugs
------------
When getting Events near you sometimes no events will be displayed based on your location. This because we used the Google maps -
api to take a latitude and longitude and get the city. Google is fairly specific for this so even at Algonquin it's get Neapean - 
instead of Otttawa. last.fm doesn't have Nepean, so it return no results. Another example is at my house in Orleans it get data -
for Orléans, France, becuase that's what lat.fm has data for. 

Getting related songs will for smaller artists will sometimes return results for a similar song by a larger name. I tried fixing -
this by using the mbid supplied by last.fm, but not all tracks have this parameter. I chose to keep if searching for song name -
instead because more often than not the small band songs name would return correct reusults but have no mbid. 
