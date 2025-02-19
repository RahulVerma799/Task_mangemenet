import axios from 'axios';

const API_URL = 'https://task-manage-bankend.onrender.com/api/tasks';

export const getTasks = () => axios.get(API_URL);
//export const addTask = (task) => axios.post(API_URL, task) 
export const addTask = async (task) => {
    const response = await axios.post(API_URL, task);
    return response; 
  };
//export const updateTask = (id, task) => axios.put(`${API_URL}/${id}`, task);
export const getTask = (id) => axios.get(`${API_URL}/${id}`)
export const updateTask = async (id, task) => {
    const response = await axios.put(`${API_URL}/${id}`, task);
    return response; 
  };
//rgb(224, 244, 186),rgb(246, 229, 229)
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);
