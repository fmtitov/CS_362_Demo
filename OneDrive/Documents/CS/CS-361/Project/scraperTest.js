const axios = require('axios');


axios.get('http://flip1.engr.oregonstate.edu:3025/?articleName=Samel', )
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });