import React, { Component } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import PipelineViewcon from './pipeline_viewcon';
import { fetchPipelineViews } from '../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PipelineView extends Component {
  componentWillMount() {
    this.props.fetchPipelineViews();
  }

  renderTabList(){
    return _.map(this.props.pipelines.pipelineviews, function(pv, index) {
      var pvindex = `pvtab-${index}`;
      return(
      <Tab key={pvindex}>{pv.name}</Tab>
    );
    });
  }

  renderTabPanels(){
    return _.map(this.props.pipelines.pipelineviews, function(pv, index) {
      var pvindex = `pvtabp-${index}`;
      return(
        <TabPanel key={pvindex}>
           <PipelineViewcon viewname={pv.name}/>
        </TabPanel>
      );
    });
  }
  render(){
    if (this.props.pipelines){
    return(
      <Tabs>
        <TabList>
          {this.renderTabList()}
        </TabList>
          {this.renderTabPanels()}
      </Tabs>

    );
  }
  else{
    return(
      <Tabs>
        <TabList>
          <Tab>Title 1</Tab>
          <Tab>Title 2</Tab>
        </TabList>
        <TabPanel>
          <PipelineViewcon />
        </TabPanel>
        <TabPanel>
          <PipelineViewcon />
        </TabPanel>
      </Tabs>
    );
  }
  }
}

function mapStateToProps(state){
  return {pipelines: state.pipelines};
}

export default connect(mapStateToProps, { fetchPipelineViews } )(PipelineView);
