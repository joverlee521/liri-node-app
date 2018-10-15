# LIRI App

## About LIRI
LIRI stands for Language Interpretation and Recognition Interface. It is a command line Node app that takes in certain parameters and returns data to the user.

## How To Use LIRI
1. Navigate to the root of the LIRI app in your terminal and type in `node liri.js` to initialize the app
1. LIRI will as you to choose one of four commands: 

    ![command prompt screenshot](../master/images/command-prompt.png)
    
    * Choose `movie-this` to search the OMDb API for details about a specific movie
        * LIRI will ask "Which movie do you want to search?":
    
            ![movie-this input prompt screenshot](../master/images/movie-this-input-prompt.png)
 
        * If there is no movie name input, the app will default to searching the movie "Mr. Nobody"
        * It will return many details about the movie as shown below: 
        
            ![movie-this screenshot](../master/images/movie-this.png)

    * Choose `concert-this` to search the Bandsintown API for upcoming event related to a specific artist
        * LIRI will ask "Which artist do you want to search?":

            ![concert-this input prompt screenshot](../master/images/concert-this-input-prompt.png)

        * If there is no artist name input, the app will ask you to input an artist again:

            ![concert-this second input prompt screenshot](../master/images/concert-this-input-again.png)
        
        * There is no limit on the number of events returned, the data returned is completely based on the artist searched:

            ![concert-this screenshot](../master/images/concert-this.png)



        
1. `node liri.js spotify-this-song <song title here>`

    * The app will utilize the node-spotify-api to search for the song specified
    * If there is no song title input, the app will default to searching the song "The Sign"
    * It will return the artist, song title, a preview link from Spotify, and the album that the song is from
    ![spotify-this-song](../master/images/spotify-this-song.png)
        
1. `node liri.js do-what-it-says`

    * The app will read the file [random.txt](../master/random.txt) and run the command that written within the file
    
## Technologies Used
* JavaScript, Node.js
* [OMDb API](http://www.omdbapi.com/)
* [Bandsintown API](http://www.artists.bandsintown.com/bandsintown-api)
* [Request](https://www.npmjs.com/package/request)
* [Node Spotify API](https://www.npmjs.com/package/node-spotify-api)
* [Moment](https://www.npmjs.com/package/moment)
* [Dotenv](https://www.npmjs.com/package/dotenv)
