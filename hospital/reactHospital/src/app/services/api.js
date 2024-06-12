import axios from 'axios';

const instance = axios.create({ baseURL: 'http://localhost:8080/' });

export const createUser = async (user) => await instance.post('/hospital/', user);

export const getUsers = async () => await instance.get('/hospital/');

export const deleteUser = async (id) => await instance.delete(`/hospital/${id}`);

export const updateUser = async (id, user) => await instance.put(`/hospital/${id}`, user);
