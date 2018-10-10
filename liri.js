var request = require("request");
var moment = require("moment");
var command = process.argv[2];

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

switch(command){
    case "movie-this":
        movieThis();
        break;
    case "concert-this":
        concertThis();
        break;
}