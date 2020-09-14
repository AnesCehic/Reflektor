import axios from 'axios';

const Axios = axios.create({
  baseURL: "https://reflektor.live/"
})

export default Axios;