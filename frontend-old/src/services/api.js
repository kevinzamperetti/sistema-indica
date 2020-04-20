import * as axios from 'axios'

// const api = axios.create( {
// 	baseURL : "http://localhost:8080"
// } )

// export default api;

export default axios.create({
  baseURL: `http://localhost:8080`
});