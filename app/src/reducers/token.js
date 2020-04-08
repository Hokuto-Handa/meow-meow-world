import { GET } from '../actions';

const initialState = {token: "token"};

export default (state=initialState, action) => {
  switch (action.type) {
    case GET:
      const newState = {token: action.data.data.token};
      console.log(newState);
      return newState;
    default:
      return state;
  }
}
