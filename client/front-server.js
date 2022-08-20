var express = require('express');
var app = express();
var path = require('path');
const { nextTick } = require('process');

//app.use(express.static(__dirname)); // Current directory is root
app.use(express.static(path.join(__dirname, 'build'))); //  "public" off of current is root


app.get("*", function(req, res) {   
  res.sendFile(path.join(__dirname, 'build/index.html'), 
  function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})


app.listen(8081);
console.log('Listening on port 8081');