const axios = require('axios');
var FormData = require('form-data');

var data = new FormData();
data.append("width", 200);
data.append("height", 200);
data.append("image", "D6-1", "/D6-1/png");



axios.post('http://ejk-361-project.xyz:50550/resize', data, {
	headers: {
	  'Content-Type': 'multipart/form-data'
	}
     })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });