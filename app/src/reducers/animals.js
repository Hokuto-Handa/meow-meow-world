import { GET, POST } from '../actions';

const initialState = [{id: '1', age: 3, name: 'Jerry'}];

export default (state=initialState, action) => {
  switch (action.type) {
    case GET:
      const newState = action.animals.data;
      // console.log(newState);
      return newState;
    case POST:
      console.log('post method');
      console.log(action);
      return state;
    default:
      return state;
  }
}
