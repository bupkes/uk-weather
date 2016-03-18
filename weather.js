/*  This code runs on node.js (on the command line) so you'll
    need that installed.
    It relies on two APIs:
      - http://postcodes.io/
      - https://developer.forecast.io/
     You will need to register for an API key for forecast.io.
     This is my first node project so I'm sure there are potential
    improvements but I'm uploading this now because at least it works!
     Remember you need to put the postcode in with no spaces, so for
    example:      $ node weather.js nw16xe                              */

              // Get the postcode from command line input
            var postcode = process.argv.slice(2);

              //declaring lots of variables
            var myLat = '';
            var myLong = '';
            var weatherNow = '';
            var weatherNowSummary = '';
            var postcodeUrl = '';
            var body = '';
            var weather = '';


              // Getting latitude and latitude from the API
            var http = require('http');
              // Ask for the data
            http.get('http://api.postcodes.io/postcodes/' + postcode, function(res) {
            res.on('data', function(d){body += d;} );
              // Once the data arrives...
            res.on("end", function() {

                  // Parse the JSON data
                body = JSON.parse(body);
                var result = body.result;

                  // Get latitude and longitude from data
                  // (more data is available in the returned JSON
                  // see http://postcodes.io/ for details)
                myLat = result.latitude;
                myLong = result.longitude;


                  // Getting weather data from the API
                var https = require('https');
                // *** INSERT FORECAST.IO API KEY IN LINE BELOW ***
                var postcodeUrl = "https://api.forecast.io/forecast/YOUR_API_KEY/";
                postcodeUrl += myLat + ",";
                postcodeUrl += myLong;
                  // Ask for the data
                https.get(postcodeUrl, function(res){
                  // Ask for the data
                res.on('data', function(d) {
                weather += d;  });
                  //Once the data arrives
                res.on('end', function() {
                  // Parse the JSON data
                weather = JSON.parse(weather);
                  // Get the current weather at the given postcard
                  // (more data is available in the returned JSON
                  //  see https://developer.forecast.io/ for details)
                weatherNow = weather.currently;
                weatherNowSummary = weatherNow.summary
                  // Presuming all is well, we can print out the weather details
                console.log("The weather is " + weatherNowSummary); });

                  // If all is _not_ well, log an error
                res.on('error', function(e) {
                console.error(e); });

                  //  and here are some semicolons and brackets to finish off
                });});})
