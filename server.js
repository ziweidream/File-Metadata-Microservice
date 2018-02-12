var multer = require('multer');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();
//rmDir is based on the code in this GitHub post at https://gist.github.com/liangzan/807712/8fb16263cb39e8472d17aea760b6b1492c465af2
//on 11 Feb, 2018
var rmDir = function(dirPath, removeSelf) {
      if (removeSelf === undefined)
        removeSelf = true;
      try { var files = fs.readdirSync(dirPath); }
      catch(e) { return; }
      if (files.length > 0)
        for (var i = 0; i < files.length; i++) {
          var filePath = dirPath + '/' + files[i];
          if (fs.statSync(filePath).isFile())
            fs.unlinkSync(filePath);
          else
            rmDir(filePath);
        }
      if (removeSelf)
        fs.rmdirSync(dirPath);
    };

app.use(express.static('public'));
app.use(bodyParser.json());

app.get("/", function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/delete", function(req, res) {
  rmDir('./uploads', false);
});

app.post('/', multer({dest: './uploads/'}).single('fileToUpload'), function(req, res) {
  res.end("Your file size: " + req.file.size);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
