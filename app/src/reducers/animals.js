import { GET, POST, EDIT, ERASE } from '../actions';

const initialState = [{id: 0, name: '', age: 0}];

export default (state=initialState, action) => {
  switch (action.type) {
    case GET:
      const newState = action.animals.data;
      console.log('getきた');
      return newState;
    case POST:
      console.log('post きた');
      console.log(action);
      return state;
    case EDIT:
      console.log('edit きた');
      console.log(action);
      return state;
    case ERASE:
      console.log('erase きた');
      console.log(action);
      return state;
    default:
      return state;
  }
}
