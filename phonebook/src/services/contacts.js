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

const erase = (id) => {
    const request = axios.delete(`http://localhost:3001/persons/${id}`)
    return request.then(response=>{
        return response.data
    })
  }
  const update = (id, updatedContact) => {
    const request = axios.put(`http://localhost:3001/persons/${id}`, updatedContact)
    return request.then(response => {
        return response.data
    })
  }

export default {getAll, add, erase, update }