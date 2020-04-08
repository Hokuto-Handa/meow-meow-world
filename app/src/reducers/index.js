import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'

import animals from './animals';
import token from './token';

export default combineReducers({ animals, token, form });
