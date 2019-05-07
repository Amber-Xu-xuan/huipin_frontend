import axios from 'axios';

let base = '/zp';
// let base = ''
export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getJobListPage = params => { return axios.get(`${base}/enterprise/job`, { params: params }); };

export const removeJob = params => { return axios.get(`${base}/enterprise/removeJob`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };
