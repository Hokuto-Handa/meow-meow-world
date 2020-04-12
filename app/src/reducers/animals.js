import { GET, POST } from '../actions';
// import { GET, POST, EDIT, ERASE } from '../actions';

const initialState = [{id: 0, name: '', age: 0, image: "cat.png"}];

export default (state=initialState, action) => {
  switch (action.type) {
    case GET:
      console.log('get きた');
      const newState = action.animals.data;
      return newState;
    case POST:
      console.log('post きた');
      return state;
    // case EDIT:
    //   console.log('edit きた');
    //   return state;
    // case ERASE:
    //   console.log('erase きた');
    //   return state;
    default:
      return state;
  }
}
