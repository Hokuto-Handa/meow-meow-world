import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Post from './components/Post';
import * as serviceWorker from './serviceWorker';

import reducer from './reducers';
import { createStore,  applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/post" component={Post}/>
          <Route path="/" component={App} />
        </Switch>
      </Router>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
