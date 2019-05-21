var shelljs = require('shelljs');
var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/HW4.html');
});

app.get ('/api', function (req, res) {

	//console.log('url:', req.url);
	var radius = req.query.R;
	var circleX = req.query.cX;
	var circleY = req.query.cY;
	var rectangleX = req.query.rX;
	var rectangleY = req.query.rY;
	
	shelljs.exec('main.exe ' + radius + ' ' + circleX + ' ' + circleY + ' ' + rectangleX + ' ' + rectangleY, function(status, output) {
	  console.log('Exit status:', status);
	  console.log('Program output:', output);

      var output = {
        status: status,
        output: output
      };
		
      /*
        The response header for supporting CORS:
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type"
      */

	  res.writeHead(200, {
		  "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type"
	  });
	
	  res.write( JSON.stringify(output) );
	  res.end();

	});

});

// or simply
// app.listen (1337); 
// will do

var server = app.listen (1337, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log ('server started on http://' + host + ':' + port);
});
