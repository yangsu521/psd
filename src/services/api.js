
import request, { extend } from './request';
export async function login(params) {

  return request('/mockon/login', {
    method: 'get',
    params: params,

  });
}

export async function loginout(params) {

  return request('/mockon/loginout', {
    method: 'get',
    params: params,
  
  });
}


export async function getUserInfo(params) {
  return request.get('/mockon/user', {
    params:params
  });
}

export async function getDept() {
  return await request.get("/dept")
}


export async function registerUser() {

  return await request.post('/add', {
   
    data: {  deptName: 'deptName' },
  });
}

export async function getMenuData() {
  return await request.get("/mockon/getmenu")
}

export async function getAllDmTypeS() {
  return await request.get("/getAllDmTypeS")
}


export async function getTypeDtoByObjectId(data) {

  return await request.post('/getDmTypeById', {
   
    data: data,
  });
}

export async function updateType(data) {

  return await request.post('/updateType', {
   
    data: data,
  });
}

export async function addNewType(data) {

  return await request.post('/addNewType', {
   
    data: data,
  });
}

export async function deleteType(data) {

  return await request.post('/deleteType', {
   
    data: data,
  });
}