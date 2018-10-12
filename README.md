# LIRI App

### About LIRI
LIRI stands for Language Interpretation and Recognition Interface. It is a command line Node app that takes in certain parameters and returns data to the user.

### How To Use LIRI
Navigate to the root of the LIRI app in your terminal and type in one of four commands:
1. `node liri.js concert-this <artist/band name here>`

    * The app will search the Bandsintown API for upcoming events related to the artist specified 
    * It will return the name of the venue, the venue location, and the date of the event 
    * There is no limit on the number of events returned, the data returned is completely based on the artist searched
        
1. `node liri.js movie-this <movie name here>`

    * The app will search the OMDb API for the movie specified
    * If there is no movie name input, the app will default to searching the movie "Mr. Nobody"
    * It will return many details about the movie as shown below: 
        
1. `node liri.js spotify-this-song <song title here>`

    * The app will utilize the node-spotify-api to search for the song specified
    * If there is no song title input, the app will default to searching the song "The Sign"
    * It will return the artist, song title, a preview link from Spotify, and the album that the song is from
        
1. `node liri.js do-what-it-says`

    * The app will read the file [random.txt](../master/random.txt) and run the command that written within the file
    
