import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://openmind-api.vercel.app/21-5',
});

export default axios;
