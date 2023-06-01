import axios from 'axios'





    const api = axios.create({
        baseURL: 'http://localhost:5000/'
    })//parte que não vai mudar

export default api