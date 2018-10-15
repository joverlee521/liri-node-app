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

            ![move-this default screenshot](../master/images/movie-this-default.png)

        * It will return many details about the movie as shown below: 
        
            ![movie-this screenshot](../master/images/movie-this.png)

    * Choose `concert-this` to search the Bandsintown API for upcoming event related to a specific artist
        * LIRI will ask "Which artist do you want to search?":

            ![concert-this input prompt screenshot](../master/images/concert-this-input-prompt.png)

        * If there is no artist name input, the app will ask you to input an artist again:

            ![concert-this second input prompt screenshot](../master/images/concert-this-input-again.png)
        
        * There is no limit on the number of events returned, the data returned is completely based on the artist searched:

            ![concert-this screenshot](../master/images/concert-this.png)

    * Choose `spotify-this-song` to search the node-spotify-api 
        * LIRI wil as "Which song do you want to search?":

            ![spotify-this-song prompt screenshot](../master/images/spotify-this-input-prompt.png)

        * If there is no song title input, the app will default to searching "The Sign":

            ![spotify-this-song default screenshot](../master/images/spotify-this-default.png)

        * The app will return data on 10 songs related to your search:

            ![spotify-this-song screenshot](../master/images/spotify-this-song.png)

    * Choose `do-what-it-says` to run the command that is written in the file [random.txt](../master/random.txt):

        ![do-what-it-says screenshot](../master/images/do-what-it-says.png)
        
    
## Technologies Used
* JavaScript, Node.js
* [OMDb API](http://www.omdbapi.com/)
* [Bandsintown API](http://www.artists.bandsintown.com/bandsintown-api)
* [Request](https://www.npmjs.com/package/request)
* [Node Spotify API](https://www.npmjs.com/package/node-spotify-api)
* [Moment](https://www.npmjs.com/package/moment)
* [Dotenv](https://www.npmjs.com/package/dotenv)
