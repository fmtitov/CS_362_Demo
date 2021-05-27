var express = require('express');
var http = require('http');
const axios = require('axios')


var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('port', 3000);



function scrapeText(title) {
  axios.get('http://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=&origin=*&format=json&titles='+title)
    .then(response => {
      let keys = Object.keys(response.data.query.pages);
      let text = response.data.query.pages[keys[0]].extract;
      text = text.replace(/(<([^>]+)>)/ig, "");
      console.log(text);
      return text;
    })
    .catch(error => {
      console.log(error);
    });

}


app.get('/',function(req,res){
  axios.get('http://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=&origin=*&format=json&titles='+req.query.articleName)
    .then(response => {
      let keys = Object.keys(response.data.query.pages);
      let text = response.data.query.pages[keys[0]].extract;
      text = text.replace(/(<([^>]+)>)/ig, "");
      text = text.replace(/\s\s+/g, "");
      console.log(text);
      res.type('text/plain');
      res.send(text);
    })
    .catch(error => {
      console.log(error);
    });

/*  let description = scrapeText(req.query.myData);
  console.log(description);
  res.type('text/plain');
  res.send(description);*/
});

app.post('/',function(req,res){
  axios.get('http://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=&origin=*&format=json&titles='+ req.body.articleName)
    .then(response => {
      let keys = Object.keys(response.data.query.pages);
      let text = response.data.query.pages[keys[0]].extract;
      text = text.replace(/(<([^>]+)>)/ig, "");
      text = text.replace(/\s\s+/g, "");
      console.log(text);
      res.type('text/plain');
      res.send(text);
    })
    .catch(error => {
      console.log(error);
    });

/*  let description = scrapeText(req.query.myData);
  console.log(description);
  res.type('text/plain');
  res.send(description);*/
});



app.use(function(req,res){
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});