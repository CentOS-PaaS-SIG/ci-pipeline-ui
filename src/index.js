import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import reducers from './reducers';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import MenuBar from './components/menubar';
import PipelinesIndex from './components/pipelines_index';
import About from './components/about';
import PipelinesShow from './components/pipelines_show';
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
	<div>
	<Header />
	<MenuBar />
        <Switch>
	  <Route path="/pipelines/:id" component={PipelinesShow} />
	  <Route path="/about" component={About} />
	  <Route path="/" component={PipelinesIndex} />
        </Switch>
	<Footer />
	</div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
