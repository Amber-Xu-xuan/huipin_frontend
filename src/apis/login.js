import request from '@/utils/request'
export function loginReq(phone,password) {
  return request.post('/login.json',{
    loginName: phone,
    loginPassword: password
  })
}
