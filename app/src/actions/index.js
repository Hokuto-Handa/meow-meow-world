import axios from 'axios';

export const GET = 'GET';
export const POST = 'POST';
export const EDIT = 'EDIT';
export const ERASE = 'ERASE';

export const get = () => async (dispatch) => {
  const data = await axios.get('http://localhost:8080/');
  dispatch({type: GET, data});
}

export const postIt = (values) => async (dispatch) => {
  let params = new URLSearchParams();
  params.append("type", "post");
  params.append("age", values.age);
  params.append("name", values.name);
  params.append("token", values.token);
  const response = await axios.post("http://localhost:8080/", params);
  console.log(response);
  dispatch({ type: POST, response });
};

export const edit = (values) => async (dispatch) => {
  let params = new URLSearchParams();
  params.append("type", "put");
  params.append("id", values.id);
  params.append("age", values.age);
  params.append("name", values.name);
  params.append("token", values.token);
  const response = await axios.post("http://localhost:8080/", params);
  dispatch({ type: EDIT, response });
};

export const erase = (id, token) => async (dispatch) => {
  let params = new URLSearchParams();
  params.append("type", "delete");
  params.append("id", id);
  params.append("token", token);
  const response = await axios.post("http://localhost:8080/", params);
  dispatch({ type: ERASE, response });
};
