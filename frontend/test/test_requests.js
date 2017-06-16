
import fetch from 'isomorphic-fetch'
import nock from 'nock'
import assert from 'assert'

import { fetchEmployees,
  fetchEmployee,
  putEmployee,
  destroyEmployee,
  postEmployee } from '../src/redux/actions/employee-actions'

function testObject (object1, object2) {
  if (JSON.stringify(object1) === JSON.stringify(object2)) {
    return true
  }
  return false
}

let employee = {id: 1, firstName: 'Frodon', lastName: 'Baggins', description: 'ring bearer'}

let employees = [{id: 1, firstName: 'Frodo', lastName: 'Baggins', description: 'ring bearer'},
  {id: 2, firstName: 'Bilbo', lastName: 'Baggins', description: 'burglar'},
  {id: 3, firstName: 'Gandalf', lastName: 'the Grey', description: 'wizard'},
  {id: 4, firstName: 'Samwise', lastName: 'Gamgee', description: 'gardener'},
  {id: 5, firstName: 'Meriadoc', lastName: 'Brandybuck', description: 'pony rider'},
  {id: 6, firstName: 'Peregrin', lastName: 'Took', description: 'pipe smoker'}]

let employees2 = [{id: 1, firstName: 'Frodon', lastName: 'Baggins', description: 'ring bearer'},
  {id: 2, firstName: 'Bilbo', lastName: 'Baggins', description: 'burglar'},
  {id: 3, firstName: 'Gandalf', lastName: 'the Grey', description: 'wizard'},
  {id: 4, firstName: 'Samwise', lastName: 'Gamgee', description: 'gardener'},
  {id: 5, firstName: 'Meriadoc', lastName: 'Brandybuck', description: 'pony rider'},
  {id: 6, firstName: 'Peregrin', lastName: 'Took', description: 'pipe smoker'}]

let employees3 = [{id: 2, firstName: 'Bilbo', lastName: 'Baggins', description: 'burglar'},
  {id: 3, firstName: 'Gandalf', lastName: 'the Grey', description: 'wizard'},
  {id: 4, firstName: 'Samwise', lastName: 'Gamgee', description: 'gardener'},
  {id: 5, firstName: 'Meriadoc', lastName: 'Brandybuck', description: 'pony rider'},
  {id: 6, firstName: 'Peregrin', lastName: 'Took', description: 'pipe smoker'}]

let employees4 = [{id: 2, firstName: 'Bilbo', lastName: 'Baggins', description: 'burglar'},
  {id: 3, firstName: 'Gandalf', lastName: 'the Grey', description: 'wizard'},
  {id: 4, firstName: 'Samwise', lastName: 'Gamgee', description: 'gardener'},
  {id: 5, firstName: 'Meriadoc', lastName: 'Brandybuck', description: 'pony rider'},
  {id: 6, firstName: 'Peregrin', lastName: 'Took', description: 'pipe smoker'},
  {id: 1, firstName: 'Frodon', lastName: 'Baggins', description: 'ring bearer'}]

global.fetch = function (url, options) {
  const finalUrl = `http://localhost:4444${url}`
  return fetch(finalUrl, options)
}


//
// fetchEmployees().then(response => {
//   console.log(response)
// })

describe('Test Requests', () => {

  it('request fetchEmployees', () => {
    nock('http://localhost:4444/api')
      .get('/employees')
      .reply(200, employees)

    fetchEmployees().then(response => {
      assert.equal(testObject(response, employees), true)
    })

    nock.cleanAll()
  })

  it('request fetchEmployee', () => {
    nock('http://localhost:4444/api')
      .get('/employees/1')
      .reply(200, employee)

    fetchEmployee(1).then(response => {
      assert.equal(testObject(response, employee), true)
    })

    nock.cleanAll()
  })

  it('request putEmployee', () => {
    nock('http://localhost:4444/api')
      .put('/employees/1')
      .reply(200, employee)

    putEmployee(employee).then(response => {
      assert.equal(testObject(response, employee), true)
    })

    nock.cleanAll()
  })

  it('request destroyEmployee', () => {
    nock('http://localhost:4444/api')
      .delete('/employees/1')
      .reply(200)

    destroyEmployee(employee).then(response => {
      assert.equal(response.status, 200)
    })

    nock.cleanAll()
  })

  it('request postEmployee', () => {
    nock('http://localhost:4444/api')
      .post('/employees/')
      .reply(200, employees4)

    postEmployee(employee).then(response => {
      assert.equal(testObject(response, employees4), true)
    })

    nock.cleanAll()
  })
})



// console.log(fetchEmployees())
//
//console.log(fetchEmployee(1))
//
// let employee = {id: 7, firstName: 'Patate', lastName: 'Patate', description: 'Patate'}
//
// console.log(putEmployee(employee))
//
// console.log(postEmployee(employee))
//
// console.log(destroyEmployee(0))
