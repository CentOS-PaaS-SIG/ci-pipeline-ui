var axios = require('axios')
const util = require('util');
function getPipelines(url){
return axios.get('https://jenkins-continuous-infra.apps.ci.centos.org/blue/rest/organizations/jenkins/pipelines/', { responseType: 'json' });
}

var appRouter = function (app) {
  app.get("/", function(req, res) {
    res.status(200).send("Welcome to our restful API");
  });
  app.get("/pipelines", function(req, res) {
	  var promiseObj = getPipelines('test');
    promiseObj.then(function(data){
	    var names = [];
	    for (index in data["data"]){
            console.log("############")
	    names.push( data["data"][index]["displayName"]);
            
	    }
    console.log(names);
    res.status(200).send(names);
    });
  });
}

module.exports = appRouter;
