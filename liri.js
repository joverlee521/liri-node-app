var request = require("request");

var command = process.argv[2];

switch(command){
    case "movie-this":
        var movieName = "Mr. Nobody";
        if(process.argv[3]){
            movieName = process.argv.slice(3);
        }
        var queryURL = "http://www.omdbapi.com/?type=movie&t=" + movieName + "&apikey=trilogy";
        request(queryURL, function(error, response, body){
            if(!error && response.statusCode === 200){
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