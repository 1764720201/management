import { Service } from '..'

export const upload = (data?: FormData) => {
  return Service.post({
    url: '/upload/file',
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
