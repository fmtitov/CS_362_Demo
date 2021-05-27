var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var FormData = require('form-data');

var data = new FormData();
data.append("width", 200);
data.append("height", 200);
data.append("image", "D6.png");

var req = new XMLHttpRequest();
req.open("POST", "http://ejk-361-project.xyz:50550/resize");
req.send(JSON.stringify(data));
console.log(req.responseText);