// Include all the packages that are necessary for the app
require("dotenv").config();
var request = require("request");
var fs = require("fs");
var inquirer = require("inquirer");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

// Variable declarations
var command;
var input;
var output;
var separator = "---------------------------------------";
var doThisCommand = false;

// Movie-this function
function movieThis(input){
    // Default movie is Mr. Nobody
    var movieName = "Mr. Nobody";
    // IF there is a movie name input from the user, replace Mr. Nobody with user input
    if(input.length > 0){
        movieName = input;
    }
    // URL for the request module
    var queryURL = "http://www.omdbapi.com/?type=movie&t=" + movieName + "&apikey=trilogy";
    request(queryURL, function(error, response, body){
        if(error){
            return console.log(error);
        }
        // Return the data when there is no error and the request was successful
        else if(!error && response.statusCode === 200){
            // Grabbing the necessary data for the output
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
            // Logs the output data into log.txt
            logData();
            // Print out the output
            console.log(output);
        }
    })
}

// Concert-this function
function concertThis(input){
    var artist = input;
    // URL for the request module
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    request(queryURL, function(error, response, body){
        if(error){
            console.log(error);
        }
        // Return the data when there is no error and the request was successful
        else if(!error && response.statusCode === 200){
            var events = JSON.parse(body);
            // Loops through all of the events that are returned 
            for(var i = 0; i < events.length; i ++){
                // Grabs the necessary data for the output
                var venue = events[i].venue;
                var name = "Venue: " + venue.name + "\n";
                var venueLocation;
                // Some events do not include a region, so only print region if returned from data
                if(venue.region !== ""){
                    venueLocation = "Venue Location: " + venue.city + ", " + venue.region + ", " + venue.country + "\n";
                }
                else{
                    venueLocation = "Venue Location: " + venue.city + ", " + venue.country + "\n";
                }
                // Use Moment to change the format of the event date
                var date = "Date of Event: " + moment(events[i].datetime).format("MM/DD/YYYY") + "\n";
                output = name + venueLocation  + date + separator;
                // Logs the output data into log.txt
                logData();
                // Prints out the output
                console.log(output);
            }
        }
    })
}

// Spotify-this-song function
function spotifyThis(input){
    // Default song is The Sign
    var song = "The Sign";
    // If user enters a song, replace The Sign with the user's input
    if(input.length > 0){
        song = input;
    }
    // Run the spotify package to search for tracks containing user's input
    spotify.search({type: "track", query: song, limit: 10}, function(error, data){
        if(error){
            return console.log(error);
        }
        // Return data if there is no error 
        else{
            var songInfo = data.tracks.items;
            // Loops through all the tracks that are returned
            for(var i = 0; i < songInfo.length; i++){
                // Grabs necessary data for the output
                var artist = "Artist: " + songInfo[i].artists[0].name + "\n";
                var songTitle = "Song Title: " + songInfo[i].name + "\n";
                var previewURL;
                // Only print preview URL if on is returned in the data, else print not available
                if(songInfo[i].preview_url !== null){
                    previewURL = "Preview URL: " + songInfo[i].preview_url + "\n";
                }
                else{
                    previewURL = "Preview URL not available" + "\n";
                }
                var album = "Album Title: " + songInfo[i].album.name + "\n";
                output = artist + songTitle + previewURL + album + separator;
                // Logs the output data into log.txt
                logData();
                // Prints out the output
                console.log(output);
            }
        }
    })
}

// Do-what-it-says function
function doThis(){
    logCommand(command, "no input");
    // Uses fs module to read the random.txt file
    fs.readFile("random.txt", "utf8", function(error, data){
        if(error){
            return console.log(error);
        }
        else{
            // Grabs data from the file and saves newCommand and newInput
            var dataArray = data.split(",");
            var newCommand = dataArray[0];
            var newInput = dataArray[1];
            logCommand(newCommand, newInput);
            console.log("Do this: " + newCommand + ", " + newInput + "\n");
            // Calls on the switchStatement using the data from the file
            switchStatement(newCommand, newInput);
        }
    })
}

// Log Command function
function logCommand(command, input){
    // Appends each new command and input into log.txt file
    fs.appendFile("log.txt", "\n" + command + ", " + input + "\n" + separator + "\n", function(error){
        if(error){
            return console.log(error);
        }
    })
}

// Log Data function
function logData(){
    // Appends output data into log.txt file
    fs.appendFile("log.txt", output + "\n", function(error){
        if(error){
            return console.log(error);
        }
    })
}

function inputPrompt(inputType){
    return inquirer.prompt([
        {
            type: "input",
            name: "input",
            message: "Which " + inputType + " do you want to search?"
        }
    ]).then(function(data){
        input = data.input;
        logCommand(command, input);
    })
}

// Switch statment for determining function to run based on user's input
function switchStatement(command, newInput){
    switch(command){
        case "movie-this":
            if(!doThisCommand){
                inputPrompt("movie").then(function(){
                    movieThis(input);
                })
            }
            else{
                movieThis(newInput);
            }
            break;
        case "concert-this":
            if(!doThisCommand){
                inputPrompt("artist").then(function(){
                    concertThis(input);
                })
            }
            else{
                concertThis(newInput);
            }
            break;
        case "spotify-this-song":
            if(!doThisCommand){
                inputPrompt("song").then(function(){
                    spotifyThis(input);
                })
            }
            else{
                spotifyThis(newInput);
            }
            break;
        case "do-what-it-says":
            doThisCommand = true;
            doThis();
            break;
    }
}

inquirer.prompt([
    {
        type: "list",
        name: "command",
        message: "Choose a command: ",
        choices: ["movie-this", "concert-this", "spotify-this-song", "do-what-it-says"]
    }
]).then(function(data){
    command = data.command;
    switchStatement(command);
})