import React from 'react';
import axios from 'axios';



const getAll = () => {
    const request = axios.get('http://localhost:3001/persons')
    return request.then(response => {
        return response.data
    })
}


const add = (nameObject) => {
    const request = axios.post('http://localhost:3001/persons', nameObject)
    return request.then(response => {
        return response.data
    })
}



export default {getAll, add }