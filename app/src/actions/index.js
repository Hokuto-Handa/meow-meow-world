import axios from 'axios';

export const GET = 'GET';
export const POST = 'POST';
export const EDIT = 'EDIT';
export const ERASE = 'ERASE';

const headers = {"content-type": "multipart/form-data"}

export const get = () => async (dispatch) => {
  const animals = await axios.get('http://localhost:8080/');
  dispatch({type: GET, animals});
}

export const postIt = (formData) => async (dispatch) => {
  const response = await axios.post("http://localhost:8080/", formData, {headers});
  console.log(response);
  dispatch({ type: POST, });
};

export const edit = (values) => async (dispatch) => {
  let params = new URLSearchParams();
  params.append("type", "edit");
  params.append("id", values.id);
  params.append("age", values.age);
  params.append("name", values.name);
  const response = await axios.post("http://localhost:8080/", params);
  dispatch({ type: EDIT, response });
};

export const erase = (id) => async (dispatch) => {
  let params = new URLSearchParams();
  params.append("type", "delete");
  params.append("id", id);
  const response = await axios.post("http://localhost:8080/", params);
  console.log(response);
  dispatch({ type: ERASE, response });
};
