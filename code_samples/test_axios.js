var axios = require('axios')
function getRepos(url){
return axios.get('https://jenkins-continuous-infra.apps.ci.centos.org/blue/rest/organizations/jenkins/pipelines/');
}
var promiseObj = getRepos('test');
promiseObj.then(function(data){
 console.log(data);
});

