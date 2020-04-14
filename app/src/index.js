import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/Home';
import Post from './components/Post';
import Edit from './components/Edit';
import About from './components/About';
import { BottomNavi } from './components/BottomNav';
import { ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { theme } from './theme';
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
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <Router>
            <Switch>
              <Route path="/post" component={Post}/>
              <Route path="/edit/:id" component={Edit}/>
              <Route path="/about" component={About}/>
              <Route path="/" component={Home} />
            </Switch>
            <BottomNavi />
          </Router>
        </Container>
      </ThemeProvider>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
