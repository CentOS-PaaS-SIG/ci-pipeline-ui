var axios = require('axios')
const util = require('util');
const ROOT_URL = "https://jenkins-continuous-infra.apps.ci.centos.org/blue/rest/organizations/jenkins/pipelines/";
function getPipelines(url){
  return axios.get('https://jenkins-continuous-infra.apps.ci.centos.org/blue/rest/organizations/jenkins/pipelines/', { responseType: 'json' });
}

function getPipelineDetails(name){
  console.log(name);
  return axios.get('https://jenkins-continuous-infra.apps.ci.centos.org/blue/rest/organizations/jenkins/pipelines/'+name, { responseType: 'json' });
}

var appRouter = function (app) {
  app.get("/", function(req, res) {
    res.status(200).send("Welcome to our restful API");
  });


  app.get("/pipelines/:id", function(req, res) {
    console.log("Id is ");
    console.log(req.params.id);
    var promiseObj = getPipelineDetails(req.params.id);
    promiseObj.then(function(data){
      console.log(data['data']);
      res.status(200).send(data['data']);
    });
  });

  app.get("/pipelines", function(req, res) {
    var promiseObj = getPipelines('test');
    promiseObj.then(function(data){
      var names = [];
      var i = 1;
      for (index in data["data"]){
        var dict = {};
        dict["id"] = i;
        dict["name"] = data["data"][index]["displayName"];
	names.push(dict);
        i = i+1;
      }
      res.status(200).send(names);
    });
  });

}

module.exports = appRouter;
