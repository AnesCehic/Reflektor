import axios from 'axios';

const Axios = axios.create({
  baseURL: "http://34.89.184.202:8080/"
})

export default Axios;