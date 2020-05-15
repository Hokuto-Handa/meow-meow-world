import { GET, POST } from '../actions';

const initialState = [{id: 0, name: '', age: 0, image: "cat.png"}];

export default (state=initialState, action) => {
  switch (action.type) {
    case GET:
      const newState = action.animals.data;
      return newState;
    case POST:
      return state;
    default:
      return state;
  }
}
