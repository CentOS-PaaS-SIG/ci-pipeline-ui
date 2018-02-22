var axios = require('axios')
const util = require('util');
const NodeCache = require('node-cache');
const myCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );

const ROOT_URL = "https://jenkins-continuous-infra.apps.ci.centos.org/blue/rest/organizations/jenkins/pipelines/";
const JENKINS_URL = "https://jenkins-continuous-infra.apps.ci.centos.org";

myCache.on( "del", function( key, value ){
  console.log("delete function called");
});

function setCacheData(url, data){
  var status = myCache.set( url , data, 1000);
  return status;
}

function getCacheData(url){
  try{
    value = myCache.get(url, true);
    return value;
  }
  catch( err ){
    return false;
  }
}

function formatReturnData(rqurl, promise){
  var returnData = {};
  returnData["url"] = rqurl;
  returnData["promise"] = promise;
  return returnData;
}

function getPipelines(){
  return formatReturnData(ROOT_URL, axios.get(ROOT_URL, { responseType: 'json' }));
}

function getPipelineDetails(name){
  var REQ_URL = ROOT_URL+name;
  return formatReturnData(REQ_URL, axios.get(REQ_URL, { responseType: 'json' }));
}

function getPipelineRuns(name){
  var REQ_URL = ROOT_URL+name+'/runs/';
  return formatReturnData(REQ_URL, axios.get(REQ_URL, { responseType: 'json' }));
}

function getPipelineRunview(name){
  var REQ_URL = ROOT_URL+name+'/runs/';
  return formatReturnData(REQ_URL, axios.get(REQ_URL, { responseType: 'json' }));
}

function getPipelineRunByID(name, runid){
  var REQ_URL = ROOT_URL+name+'/runs/'+runid;
  return formatReturnData(REQ_URL, axios.get(REQ_URL, { responseType: 'json' }));
}

function getPipelineRunNodes(name, runid){
  var REQ_URL = ROOT_URL+name+'/runs/'+runid+'/nodes/';
  return formatReturnData(REQ_URL, axios.get(REQ_URL, { responseType: 'json' }));
}

function getPipelineLatestRun(name, runid){
  var REQ_URL = ROOT_URL+name+'/latestRun/';
  return formatReturnData(REQ_URL, axios.get(REQ_URL, { responseType: 'json' }));
}

function getPipelineRunArtifacts(name, runid){
  var REQ_URL = ROOT_URL+name+'/runs/'+runid+'/artifacts/';
  return formatReturnData(REQ_URL, axios.get(REQ_URL, { responseType: 'json' }));
}

var appRouter = function (app) {
  app.get("/", function(req, res){
    res.status(200).send("Welcome to our ci-pipeline restful API");
  });

  app.get("/pipelines/:id/runs/:runid/artifacts", function(req, res) {
    var request_url = req.headers.host+req.url;
    // fetch from cache
    var responseData = getCacheData(request_url);
    if (responseData === false){
      var returnData = getPipelineRunArtifacts(req.params.id, req.params.runid);
      returnData["promise"].then(function(data){
        res.status(200).send(data['data']);
        setCacheData(request_url, data['data']);
      });
    }
    else{
      res.status(200).send(responseData);
    }
  });

  app.get("/pipelines/:id/runs/:runid/nodes", function(req, res) {
    var request_url = req.headers.host+req.url;
    // fetch from cache
    var responseData = getCacheData(request_url);
    if (responseData === false){
      var returnData = getPipelineRunNodes(req.params.id, req.params.runid);
      returnData["promise"].then(function(data){
        res.status(200).send(data['data']);
        setCacheData(request_url, data['data']);
      });
    }
    else{
      res.status(200).send(responseData);
    }
  });

  app.get("/pipelines/:id/runs/:runid", function(req, res) {
    var request_url = req.headers.host+req.url;
    // fetch from cache
    var responseData = getCacheData(request_url);
    if (responseData === false){
      var returnData = getPipelineRunByID(req.params.id, req.params.runid);
      returnData["promise"].then(function(data){
        res.status(200).send(data['data']);
        setCacheData(request_url, data['data']);
      });
    }
    else{
      res.status(200).send(responseData);
    }
  });

  app.get("/pipelines/:id/runview", function(req, res) {
    var request_url = req.headers.host+req.url;
    // fetch from cache
    var responseData = getCacheData(request_url);
    if (responseData === false){
      var returnData = getPipelineRunview(req.params.id);
      run_data = {}
      run_data["node_promises"] = []
      run_data["node_results"] = []
      var return_data = []
      returnData["promise"].then(function(data){
        for (run_index in data['data']){
          var append_dict = {}
          append_dict["name"]= data['data'][run_index]['name'];
          append_dict["runid"]= data['data'][run_index]['id'];
          append_dict["pipeline"]= data['data'][run_index]['pipeline'];
          append_dict["durationInMillis"]= data['data'][run_index]['durationInMillis'];
          append_dict["logs"]= data['data'][run_index]['durationInMillis'];
          append_dict["artifacts"]= data['data'][run_index]['durationInMillis'];
          run_data["node_promises"].push(getPipelineRunNodes(append_dict["pipeline"], append_dict["runid"])["promise"]);
          return_data.push(append_dict);
        }
        axios.all(run_data["node_promises"]).then(function(results) {
          let temp = results.map(r => r.data);
          run_data["node_results"] = temp;
        });
        return return_data;
      }).then((response) => {
        axios.all(run_data["node_promises"]).then(function(values) {
          var i = 0;
          for (i=0;i<values.length;i++){
            response[i]["nodes"] = values[i]["data"];
          }
          res.status(200).send(response);
          setCacheData(request_url, response);
        });
      });
    }
    else{
      res.status(200).send(responseData);
    }
  });

  app.get("/pipelines/:id/runs", function(req, res) {
    var request_url = req.headers.host+req.url;
    // fetch from cache
    var responseData = getCacheData(request_url);
    if (responseData === false){
      var returnData = getPipelineRuns(req.params.id);
      returnData["promise"].then(function(data){
        res.status(200).send(data['data']);
        setCacheData(request_url, data['data']);
      });
    }
    else{
      res.status(200).send(responseData);
    }
  });

  app.get("/pipelines/:id/latestrun", function(req, res) {
    var request_url = req.headers.host+req.url;
    // fetch from cache
    var responseData = getCacheData(request_url);
    if (responseData === false){
      var returnData = getPipelineLatestRun(req.params.id);
      returnData["promise"].then(function(data){
        res.status(200).send(data['data']);
        setCacheData(request_url, data['data']);
      });
    }
    else{
      res.status(200).send(responseData);
    }
  });

  app.get("/pipelines/:id", function(req, res) {
    var request_url = req.headers.host+req.url;
    // fetch from cache
    var responseData = getCacheData(request_url);
    if (responseData === false){
      var returnData = getPipelineDetails(req.params.id);
      returnData["promise"].then(function(data){
        res.status(200).send(data['data']);
        setCacheData(request_url, data['data']);
      });
    }
    else{
      res.status(200).send(responseData);
    }
  });

  app.get("/pipelines", function(req, res) {
    var request_url = req.headers.host+req.url;
    // fetch from cache
    var responseData = getCacheData(request_url);
    if (responseData === false){
      var returnData = getPipelines();
      returnData["promise"].then(function(data){
        var names = [];
        var i = 1;
        for (index in data["data"]){
          var dict = {};
          dict["id"] = i;
          dict["name"] = data["data"][index]["displayName"];
          dict["weatherScore"] = data["data"][index]["weatherScore"];
          if (data["data"][index]["latestRun"]){
            dict["latestRun"] = data["data"][index]["latestRun"]
          }
          else{
            dict["latestRun"] = {};
          }
          names.push(dict);
          i = i+1;
        }
        res.status(200).send(names);
        setCacheData(request_url, names);
      });
    }
    else{
      res.status(200).send(responseData);
    }
  });
}

module.exports = appRouter;
