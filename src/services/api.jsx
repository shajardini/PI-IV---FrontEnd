import axios from 'axios'





    const api = axios.create({
        baseURL: 'https://backrecomendacaopi.herokuapp.com/'
    })//parte que não vai mudar

export default api