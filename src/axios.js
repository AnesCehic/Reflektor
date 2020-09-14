import axios from 'axios';

const Axios = axios.create({
  baseURL: "https://reflektor.live/backend/"
})

export default Axios;