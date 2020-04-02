import axios from 'axios';

export const GET = 'GET';
export const POST = 'POST';

export const get = () => async (dispatch) => {
  const animals = await axios.get('http://localhost:8080/');
  dispatch({type: GET, animals});
}

// export const postIt = (values) => async (dispatch) => {
//   const msg = {
//     id: 119,
//     age: 342,
//     name: 'Fred'
//   };
//   const response = await axios.post('http://localhost:8080/', "s");
//   dispatch({type: POST, response});
// }

export const postIt = (values) => async (dispatch) => {
  console.log(values);
  let params = new URLSearchParams();
  params.append("age", values.age);
  params.append("name", values.name);
  const response = await axios.post("http://localhost:8080/", params);
  dispatch({ type: POST, response });
};
