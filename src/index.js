import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import reducers from './reducers';

import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import MenuBar from './components/menubar';
import PipelinesIndex from './components/pipelines_index';
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
	<div>
	<Header />
	<MenuBar />
	<Route path="/" component={PipelinesIndex} />
	<Footer />
	</div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
