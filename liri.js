require("dotenv").config();
var request = require("request");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var command = process.argv[2];
var input = process.argv.slice(3).join(" ");
var output;
var separator = "---------------------------------------";

function movieThis(input){
    var movieName = "Mr. Nobody";
    if(input.length > 0){
        movieName = input;
    }
    var queryURL = "http://www.omdbapi.com/?type=movie&t=" + movieName + "&apikey=trilogy";
    request(queryURL, function(error, response, body){
        if(error){
            return console.log(error);
        }
        else if(!error && response.statusCode === 200){
            var movie = JSON.parse(body);
            var title = "Title: " + movie.Title + "\n";
            var year = "Year: " + movie.Year + "\n";
            var imdbRating = "IMDB Rating: " + movie.imdbRating + "\n";
            var rtRating = "Rotten Tomatoes Rating: " + movie.Ratings[1].Value + "\n";
            var country = "Country: " + movie.Country + "\n";
            var language = "Language: " + movie.Language + "\n";
            var plot = "Plot: " + movie.Plot + "\n";
            var actors = "Actors: " + movie.Actors;
            output = title + year + imdbRating + rtRating + country + language + plot + actors;
            logData();
            console.log(output);
        }
    })
}

function concertThis(input){
    if(!process.argv[3]){
        console.log("Please enter an artist or band name!");
    }
    else{
        var artist = input;
        var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
        request(queryURL, function(error, response, body){
            if(error){
                return console.log(error);
            }
            else if(!error && response.statusCode === 200){
                var events = JSON.parse(body);
                for(var i = 0; i < events.length; i ++){
                    var venue = events[i].venue;
                    var name = "Venue: " + venue.name + "\n";
                    var venueLocation;
                    if(venue.region !== ""){
                        venueLocation = "Venue Location: " + venue.city + ", " + venue.region + ", " + venue.country + "\n";
                    }
                    else{
                        venueLocation = "Venue Location: " + venue.city + ", " + venue.country + "\n";
                    }
                    var date = "Date of Event: " + moment(events[i].datetime).format("MM/DD/YYYY") + "\n";
                    output = name + venueLocation  + date + separator;
                    logData();
                    console.log(output);
                }
            }
        })
    }
}

function spotifyThis(input){
    var song = "The Sign";
    if(input.length > 0){
        song = input;
    }
    spotify.search({type: "track", query: song, limit: 10}, function(error, data){
        if(error){
            return console.log(error);
        }
        else{
            var songInfo = data.tracks.items;
            for(var i = 0; i < songInfo.length; i++){
                var artist = "Artist: " + songInfo[i].artists[0].name + "\n";
                var songTitle = "Song Title: " + songInfo[i].name + "\n";
                var previewURL;
                if(songInfo[i].preview_url !== null){
                    previewURL = "Preview URL: " + songInfo[i].preview_url + "\n";
                }
                else{
                    previewURL = "Preview URL not available" + "\n";
                }
                var album = "Album Title: " + songInfo[i].album.name + "\n";
                output = artist + songTitle + previewURL + album + separator;
                logData();
                console.log(output);
            }
        }
    })
}

function doThis(){
    fs.readFile("random.txt", "utf8", function(error, data){
        if(error){
            return console.log(error);
        }
        else{
            var dataArray = data.split(",");
            var newCommand = dataArray[0];
            var newInput = dataArray[1];
            switchStatement(newCommand, newInput);
        }
    })
}

function logCommand(){
    fs.appendFile("log.txt", "\n" + command + ", " + input + "\n" + separator + "\n", function(error){
        if(error){
            return console.log(error);
        }
    })
}

function logData(){
    fs.appendFile("log.txt", output + "\n", function(error){
        if(error){
            return console.log(error);
        }
    })
}

function switchStatement(command, input){
    switch(command){
        case "movie-this":
            movieThis(input);
            break;
        case "concert-this":
            concertThis(input);
            break;
        case "spotify-this-song":
            spotifyThis(input);
            break;
        case "do-what-it-says":
            doThis();
            break;
        default: 
            console.log("Please enter a correct command!");
            break;
    }
}

switchStatement(command, input);
logCommand();