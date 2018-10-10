require("dotenv").config();
var request = require("request");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var command = process.argv[2];
var spotify = new Spotify(keys.spotify);

function movieThis(){
    var movieName = "Mr. Nobody";
    if(process.argv[3]){
        movieName = process.argv.slice(3);
    }
    var queryURL = "http://www.omdbapi.com/?type=movie&t=" + movieName + "&apikey=trilogy";
    request(queryURL, function(error, response, body){
        if(error){
            console.log(error);
        }
        else if(!error && response.statusCode === 200){
            var movie = JSON.parse(body);
            console.log("Title: " + movie.Title);
            console.log("Year: " + movie.Year);
            console.log("IMDB Rating: " + movie.imdbRating);
            console.log("Rotten Tomatoes Rating: " + movie.Ratings[1].Value);
            console.log("Country: " + movie.Country);
            console.log("Language: " + movie.Language);
            console.log("Plot: " + movie.Plot);
            console.log("Actors: " + movie.Actors);
        }
    })
}

function concertThis(){
    if(!process.argv[3]){
        console.log("Please enter an artist or band name!");
    }
    else{
        var artist = process.argv.slice(3);
        var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
        request(queryURL, function(error, response, body){
            if(error){
                console.log(error);
            }
            else if(!error && response.statusCode === 200){
                var events = JSON.parse(body);
                for(var i = 0; i < events.length; i ++){
                    var venue = events[i].venue;
                    console.log(venue.name);
                    if(venue.region !== ""){
                        console.log(venue.city + ", " + venue.region + ", " + venue.country);
                    }
                    else{
                        console.log(venue.city + ", " + venue.country);
                    }
                    var date = moment(events[i].datetime).format("MM/DD/YYYY");
                    console.log(date);
                    console.log("--------------------------------------------------------------------------------------");
                }
            }
        })
    }
}

function spotifyThis(){
    var song = "The Sign";
    if(process.argv[3]){
        song = process.argv.slice(3);
    }
    spotify.search({type: "track", query: song, limit: 10}, function(error, data){
        if(error){
            console.log(error);
        }
        else{
            var songInfo = data.tracks.items;
            for(var i = 0; i < songInfo.length; i++){
                console.log("Artist: " + songInfo[i].artists[0].name);
                console.log("Song Title: " + songInfo[i].name);
                if(songInfo[i].preview_url !== null){
                    console.log("Preview URL: " + songInfo[i].preview_url);
                }
                else{
                    console.log("Preview URL not available");
                }
                console.log("Album Title: " + songInfo[i].album.name);
                console.log("--------------------------------------------------------------------------------------");
            }
        }
    })
}

switch(command){
    case "movie-this":
        movieThis();
        break;
    case "concert-this":
        concertThis();
        break;
    case "spotify-this-song":
        spotifyThis();
        break;
}