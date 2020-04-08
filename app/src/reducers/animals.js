import { GET, POST, EDIT, ERASE } from '../actions';

const initialState = [{id: 0, name: '', age: 0}];

export default (state=initialState, action) => {
  switch (action.type) {
    case GET:
      console.log('post きた');
      const newState = action.data.data.animal;
      return newState;
    case POST:
      console.log('post きた');
      return state;
    case EDIT:
      console.log('edit きた');
      return state;
    case ERASE:
      console.log('erase きた');
      return state;
    default:
      return state;
  }
}
