import Axios from 'axios';

const axios = Axios.create({
  // 필요하면 .env에 VITE_OPENMIND_API_BASE_URL로 덮어쓸 수 있습니다.
  baseURL:
    import.meta.env.VITE_OPENMIND_API_BASE_URL ??
    'https://openmind-api.vercel.app/0-4',
});

export default axios;
