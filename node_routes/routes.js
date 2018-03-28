var config = require('../src/constants/config.js');
var axios = require('axios');
const util = require('util');
const bunyan = require('bunyan');
const NodeCache = require('node-cache');
const myCache = new NodeCache( { stdTTL: 100, checkperiod: 120 } );
const ROOT_URL = "https://jenkins-continuous-infra.apps.ci.centos.org/blue/rest/organizations/jenkins/pipelines/";
const JENKINS_URL = "https://jenkins-continuous-infra.apps.ci.centos.org";
const PIPELINE_BLACKLIST = ["_ci-pipeline-f26","stagesender","tt"];

var log = bunyan.createLogger({
  name: 'ci-pipeline-ui',
  streams: [
    {
      level: 'info',
      path: 'ci-ui-info.log',
      type: 'rotating-file',
      period: '1d',
      count: 3
    },
    {
      level: 'error',
      path: 'ci-ui-error-warning.log',
      type: 'rotating-file',
      period: '1d',
      count: 3
    },
    {
      level: 'debug',
      path: 'ci-ui-debug.log',
      type: 'rotating-file',
      period: '1d',
      count: 3
    }
  ]
});


myCache.on( "del", function( key, value ){
  console.log("Cache expiring");
  axios.get(key, { responseType: 'json' }).then(function(data){
    setCacheData(key, data['data']);
    log.info("cache updated for "+key);
  });
});

function setCacheData(url, data, timeout = 1000){
  console.log("setting cachefor ");
  console.log("http://"+url);
  var status = myCache.set( "http://"+url , data, timeout);
  return status;
}

function getCacheData(url){
  console.log("inside the getcache");
  console.log(url);
  try{
    value = myCache.get("http://"+url, true);
    return value;
  }
  catch(err){
    log.info(err);
    log.info("Key not found in cache")
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

function getPipelineViews(){
  var REQ_URL = JENKINS_URL+'/api/json';
  return formatReturnData(REQ_URL, axios.get(REQ_URL, { responseType: 'json' }));
}

function getPipelineViewByName(name='all'){
  var REQ_URL = JENKINS_URL+'/view/'+name+'/api/json';
  return formatReturnData(REQ_URL, axios.get(REQ_URL, { responseType: 'json' }));
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
  //console.log(REQ_URL);
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

function getPipelineLatestRun(name, subid){
  var REQ_URL = ROOT_URL+name+'/latestRun/';
  return formatReturnData(REQ_URL, axios.get(REQ_URL, { responseType: 'json' }));
}

function getPipelineRunArtifacts(name, runid){
  var REQ_URL = ROOT_URL+name+'/runs/'+runid+'/artifacts/';
  return formatReturnData(REQ_URL, axios.get(REQ_URL, { responseType: 'json' }));
}

function getPipelineWFAPI(name){
  // example https://jenkins-continuous-infra.apps.ci.centos.org/job/ci-pipeline-linchpin/wfapi/runs
  var REQ_URL = JENKINS_URL+'/job/'+name+'/wfapi/runs';
  return formatReturnData(REQ_URL, axios.get(REQ_URL, { responseType: 'json' }));
}

var appRouter = function (app) {
  app.get("/", function(req, res){
    //log.info("request recieved");
    //log.info(request_url);
    res.status(200).send("Welcome to our ci-pipeline restful API");
  });

  app.get("/pipelines/views", function(req, res){
    var request_url = req.headers.host+req.url;
    var responseData = getCacheData(request_url);
    if (responseData === false){
      var returnData = getPipelineViews();
      returnData["promise"].then(function(data){
        setCacheData(request_url, data['data']);
        res.status(200).send(data['data']['views']);
      });
    }
    else{
      res.status(200).send(responseData['views']);
    }
  });

  app.get("/pipelines/views/:id", function(req, res){

    var request_url = req.headers.host+req.url;
    var responseData = getCacheData(request_url);
    if (responseData === false){
      var returnData = getPipelineViewByName(req.params.id);
      returnData["promise"].then(function(data){
        //setCacheData(request_url, data['data']);
        var runData = data['data'];
        runData["jobDetails"] = [];
        var runPromises = [];
        for( index in data['data']['jobs']){
          console.log(data['data']['jobs'][index]['name']);
          runPromises.push(getPipelineDetails(data['data']['jobs'][index]['name'])["promise"]);
        }
        axios.all(runPromises).then(function(results) {
          let temp = results.map(r => r.data);
          runData["jobDetails"] = temp;
          setCacheData(request_url, runData);
          res.status(200).send(runData);
        }).catch(error => {
            log.error("Error for request url "+request_url);
            console.log(error.response)
        });
      });
    }
    else{
      res.status(200).send(responseData);
    }
  });

  app.get("/pipelines/:id/runs/:runid/artifacts", function(req, res) {
    var request_url = req.headers.host+req.url;
    //log.info("request recieved");
    //log.info(request_url);
    // fetch from cache
    var responseData = getCacheData(request_url);
    if (responseData === false){
      var returnData = getPipelineRunArtifacts(req.params.id, req.params.runid);
      returnData["promise"].then(function(data){
        setCacheData(request_url, data['data']);
        res.status(200).send(data['data']);
      });
    }
    else{
      res.status(200).send(responseData);
    }
  });

  app.get("/pipelines/:id/runs/:runid/nodes", function(req, res) {
    var request_url = req.headers.host+req.url;
    //log.info("request recieved");
    //log.info(request_url);
    // fetch from cache
    var responseData = getCacheData(request_url);
    if (responseData === false){
      var returnData = getPipelineRunNodes(req.params.id, req.params.runid);
      returnData["promise"].then(function(data){
        setCacheData(request_url, data['data']);
        res.status(200).send(data['data']);
      });
    }
    else{
      res.status(200).send(responseData);
    }
  });

  app.get("/pipelines/:id/runs/:runid", function(req, res) {
    var request_url = req.headers.host+req.url;
    //log.info("request recieved");
    //log.info(request_url);
    // fetch from cache
    var responseData = getCacheData(request_url);
    if (responseData === false){
      var returnData = getPipelineRunByID(req.params.id, req.params.runid);
      returnData["promise"].then(function(data){
        setCacheData(request_url, data['data']);
        res.status(200).send(data['data']);
      });
    }
    else{
      res.status(200).send(responseData);
    }
  });

  app.get("/pipelines/:id/wfapi", function(req, res){
    var request_url = req.headers.host+req.url;
    var responseData = getCacheData(request_url);
    if (responseData === false){
      var returnData = getPipelineWFAPI(req.params.id);
      returnData["promise"].then(function(data){
        setCacheData(request_url, data['data']);
        res.status(200).send(data['data']);
      });
    }
    else{
      res.send(responseData);
    }
  });

  app.get("/pipelines/:id/runview", function(req, res) {
    var request_url = req.headers.host+req.url;
    //log.info("request recieved");
    //log.info(request_url);
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
          if (data['data'][run_index]['name']){
            append_dict["name"]= data['data'][run_index]['name'];
          }
          else{
            append_dict["name"]= "N/A";
          }
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
        }).catch(error => {
            log.error("Error for request url "+request_url);
            console.log(error.response)
        });
        return return_data;
      }).then((response) => {
        if (!(response instanceof Array)){
          response = [response];
        }
        axios.all(run_data["node_promises"]).then(function(values) {
          var i = 0;
          for (i=0;i<values.length;i++){
            //log.info(response[i]);
            response[i]["nodes"] = values[i]["data"];
          }
          setCacheData(request_url, response);
          res.status(200).send(response);
        }).catch(error => {
            log.error("Error for request url node_promises "+request_url);
            console.log(error.response)
        });
      });
    }
    else{
      res.status(200).send(responseData);
    }
  });

  app.get("/pipelines/:id/runs", function(req, res) {
    var request_url = req.headers.host+req.url;
    log.info("request recieved");
    log.info(request_url);
    console.log("fetching from cache");
    // fetch from cache
    var responseData = getCacheData(request_url);
    if (responseData === false){
      var returnData = getPipelineRuns(req.params.id);
      returnData["promise"].then(function(data){
        setCacheData(request_url, data['data']);
        res.status(200).send(data['data']);
      });
    }
    else{
      res.status(200).send(responseData);
    }
  });

  app.get("/pipelines/:id/latestrun", function(req, res) {
    var request_url = req.headers.host+req.url;
    log.info("request recieved");
    log.info(request_url);
    // fetch from cache
    var responseData = getCacheData(request_url);
    if (responseData === false){
      var returnData = getPipelineLatestRun(req.params.id);
      returnData["promise"].then(function(data){
        setCacheData(request_url, data['data']);
        res.status(200).send(data['data']);
      });
    }
    else{
      res.status(200).send(responseData);
    }
  });

  app.get("/pipelines/:id", function(req, res) {
    var request_url = req.headers.host+req.url;
    log.info("request recieved");
    log.info(request_url);
    // fetch from cache
    var responseData = getCacheData(request_url);
    if (responseData === false){
      var returnData = getPipelineDetails(req.params.id);
      returnData["promise"].then(function(data){
        setCacheData(request_url, data['data']);
        res.status(200).send(data['data']);
      });
    }
    else{
      res.status(200).send(responseData);
    }
  });

  app.get("/pipelines", function(req, res) {
    var request_url = req.headers.host+req.url;
    //console.log(request_url);
    // fetch from cache
    var responseData = getCacheData(request_url);
    console.log(responseData);
    if (responseData === false){
      //console.log("inside false cond");
      var returnData = getPipelines();
      returnData["promise"].then(function(data){
        var names = [];
        var i = 1;
        for (index in data["data"]){
          //console.log(data["data"][index]["displayName"]);
          //console.log(PIPELINE_BLACKLIST.indexOf(data["data"][index]["displayName"]));
          if (PIPELINE_BLACKLIST.indexOf(data["data"][index]["displayName"]) === -1){
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
        }
        //console.log("priniting pipeline names");
        //console.log(names);
        setCacheData(request_url, names);
        res.status(200).send(names);
      });
    }
    else{
      res.status(200).send(responseData);
    }
  });
}
// initialisation script
function init(){
  axios.get("http://localhost:3000/pipelines", { responseType: 'json' }).then(function(data){
    console.log("initialising the cache for http://localhost:3000/pipelines");
    setCacheData("http://localhost:3000/pipelines", data['data']);
    var pipelines = getCacheData("http://localhost:3000/pipelines");
    for (index in pipelines){
      console.log(pipelines[index]["name"]);
      RUNVIEW_URL = "http://localhost:3000/pipelines/"+pipelines[index]["name"]+"/runview";
      //console.log(RUNVIEW_URL);
      axios.get(RUNVIEW_URL, { responseType: 'json' }).then(function(data){
        console.log("Initialising the cache for RUNVIEW URL "+RUNVIEW_URL);
        setCacheData(RUNVIEW_URL, data['data']);
      }).catch(error => {
        console.log("Error occured for URL "+RUNVIEW_URL);
        //console.log(error.response);
      });
    }
  });
}

//init();

module.exports = appRouter;
