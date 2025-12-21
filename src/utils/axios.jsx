import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://openmind-api.vercel.app/19-1',
});

export default axios;
