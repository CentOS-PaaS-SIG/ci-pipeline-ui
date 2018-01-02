import React from 'react';
var axios = require('axios');

export default function() {
  
  var domain = 'http://localhost:3000/pipelines/';
  var data = axios.get(domain, { crossdomain: true }).then(function(data){
        console.log(data);
        return data
  });
  return [
    { title: 'Javascript: The good parts', pages: 30},
    { title: 'Harry Potter', pages: 20},
    { title: 'The dark tower', pages: 78},
    { title: 'Eloquent ruby', pages: 89},

  ]
}
