import axios from 'axios';

export const GET = 'GET';
export const POST = 'POST';

export const get = () => async (dispatch) => {
  const animals = await axios.get('http://ec2-13-114-28-204.ap-northeast-1.compute.amazonaws.com:8080');
  dispatch({type: GET, animals});
}

export const postIt = (formData) => async (dispatch) => {
  const response = await axios.post("http://ec2-13-114-28-204.ap-northeast-1.compute.amazonaws.com:8080", formData);
  console.log(response);
  dispatch({ type: POST, });
};
