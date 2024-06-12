import axios from 'axios';

const instance = axios.create({ baseURL: 'http://localhost:8080/' });

export const createGuest = async (guest) => await instance.post('/guest/', guest);

export const getGuests = async () => await instance.get('/guest/');

export const deleteGuest = async (id) => await instance.delete(`/guest/${id}`);

export const updateGuest = async (id, guest) => await instance.put(`/guest/${id}`, guest);
