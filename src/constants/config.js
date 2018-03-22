module.exports = {
  JENKINS_BASE_URL: "https://jenkins-continuous-infra.apps.ci.centos.org",
  CUSTOM_REST_URL: "http://localhost:3000",
  CACHE_TIMEOUT: 15000,
  getRESTURL: function() {
    if ((process.env.OPENSHIFT_BUILD_NAMESPACE !=null) && (process.env.OPENSHIFT_DOMAIN_NAME !='undefined') ){
      return "http://ci-ui-rest-"+process.env.OPENSHIFT_BUILD_NAMESPACE.replace(/'/g,"").replace(/"/g,"")+"."+process.env.OPENSHIFT_DOMAIN_NAME.replace(/'/g,"").replace(/"/g,"");
    }
    else{
      return "http://localhost:3000";
    }
  }
};
