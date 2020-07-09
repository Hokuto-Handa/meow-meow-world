import { GET, POST } from '../actions';

const initialState = [
  {id: 0, name: 'にゃんこ', age: 4, image: "cat.png"},
  {id: 1, name: 'うさこ', age: 3, image: "rabbit.png"},
  {id: 2, name: 'どんこ', age: 2, image: "fish_donko.png"},
  {id: 3, name: 'フクロー', age: 8, image: "fukuro.png"},
];

export default (state=initialState, action) => {
  switch (action.type) {
    case GET:
      return state;
    default:
      return state;
  }
}
