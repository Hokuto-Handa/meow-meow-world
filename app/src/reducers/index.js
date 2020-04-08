import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'

import animals from './animals';

export default combineReducers({ animals, form });
