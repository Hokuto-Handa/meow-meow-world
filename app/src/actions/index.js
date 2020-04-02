import axios from 'axios';

export const GET = 'GET';
export const POST = 'POST';

export const get = () => async (dispatch) => {
  const animals = await axios.get('http://localhost:8080/');
  dispatch({type: GET, animals});
}

export const postIt = (values) => async (dispatch) => {
  // const msg = {name: "name", age: 3};
  // console.log(values);
  // const response = await axios.post('http://localhost:8080/', msg);
  // dispatch({type: POST, response});
  //
  axios.post('http://localhost:8080/', {
    name: 'Fred',
    age: 3
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}
