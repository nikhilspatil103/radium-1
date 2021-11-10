const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});

// localhost:3000/movies(localhost: local server,3000:port) (port means use to run on OS System .tecnology port)
// ip adddress
//127.44(something):3000/test-me
// port number internal communication of api