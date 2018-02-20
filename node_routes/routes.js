var axios = require('axios')
const util = require('util');

const ROOT_URL = "https://jenkins-continuous-infra.apps.ci.centos.org/blue/rest/organizations/jenkins/pipelines/";
const JENKINS_URL = "https://jenkins-continuous-infra.apps.ci.centos.org";

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
  app.get("/", function(req, res) {
    res.status(200).send("Welcome to our ci-pipeline restful API");
  });

  app.get("/pipelines/:id/runs/:runid/artifacts", function(req, res) {
    var returnData = getPipelineRunArtifacts(req.params.id, req.params.runid);
    returnData["promise"].then(function(data){
      res.status(200).send(data['data']);
    });
  });

  app.get("/pipelines/:id/runs/:runid/nodes", function(req, res) {
    var returnData = getPipelineRunNodes(req.params.id, req.params.runid);
    returnData["promise"].then(function(data){
      res.status(200).send(data['data']);
    });
  });

  app.get("/pipelines/:id/runs/:runid", function(req, res) {
    var returnData = getPipelineRunByID(req.params.id, req.params.runid);
    returnData["promise"].then(function(data){
      res.status(200).send(data['data']);
    });
  });

  app.get("/pipelines/:id/runview", function(req, res) {
    var returnData = getPipelineRunview(req.params.id);
    run_data = {}
    run_data["node_promises"] = []
    run_data["node_results"] = []
    var return_data = []
    returnData["promise"].then(function(data){
      //console.log("Start of console : runview");
      //console.log(data);
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
      //console.log(run_data);
      axios.all(run_data["node_promises"]).then(function(results) {
        let temp = results.map(r => r.data);
        //console.log(temp);
        run_data["node_results"] = temp;
      });
      return return_data;

    }).then((response) => {
      axios.all(run_data["node_promises"]).then(function(values) {
        //console.log("end of node results ####")
        var i = 0;
        for (i=0;i<values.length;i++){
          response[i]["nodes"] = values[i]["data"];
        }
        res.status(200).send(response);
      });

    });
  });

  app.get("/pipelines/:id/runs", function(req, res) {
    var returnData = getPipelineRuns(req.params.id);
    returnData["promise"].then(function(data){
      res.status(200).send(data['data']);
    });
  });

  app.get("/pipelines/:id/latestrun", function(req, res) {
    var returnData = getPipelineLatestRun(req.params.id);
    returnData["promise"].then(function(data){
      res.status(200).send(data['data']);
    });
  });

  app.get("/pipelines/:id", function(req, res) {
    var returnData = getPipelineDetails(req.params.id);
    returnData["promise"].then(function(data){
      res.status(200).send(data['data']);
    });
  });

  app.get("/pipelines", function(req, res) {
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
    });
  });
}

module.exports = appRouter;
