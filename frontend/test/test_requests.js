
import { fetchEmployees,
  fetchEmployee,
  putEmployee,
  destroyEmployee,
  postEmployee } from '../src/redux/actions/employee-actions'


import nock from 'nock'

nock('/api')
  .get('/employees')
  .reply(200, 'Test')
// const proxy = require('http-proxy-middleware')
//
// const backendContextRoot = '/api'
// const backendPort = 9080
//
// var backendProxy = proxy({
//   target: `http://localhost:${backendPort}`,
//   changeOrigin: true,
//   logLevel: 'debug'
// })
//
// use(backendContextRoot, backendProxy)
//



console.log(fetchEmployees())

console.log(fetchEmployee(1));


let employee = {id: 7, firstName: 'Patate', lastName: 'Patate', description: 'Patate'}

console.log(putEmployee(employee));

console.log(postEmployee(employee));

console.log(destroyEmployee(0));
