var multer = require('multer');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.get("/", function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.post('/', multer({dest: './uploads/'}).single('fileToUpload'), function(req, res) {
  res.end("Your file size: " + req.file.size);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
