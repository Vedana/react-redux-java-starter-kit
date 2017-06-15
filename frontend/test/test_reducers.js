import assert from 'assert'

import { SET_EMPLOYEES, SET_CURRENT_EMPLOYEE, DELETE_EMPLOYEE, ADD_EMPLOYEE, MODIFY_EMPLOYEE } from '../src/redux/actions/employee-actions'
import {employee} from '../src/redux/reducers/employee-reducer'

function testObject (object1, object2) {
  if (JSON.stringify(object1) === JSON.stringify(object2)) {
    return true
  }
  return false
}

let state = {employees: [], currentEmployeeId: null}
let employees = [{id: 1, firstName: 'Frodo', lastName: 'Baggins', description: 'ring bearer'},
  {id: 2, firstName: 'Bilbo', lastName: 'Baggins', description: 'burglar'},
  {id: 3, firstName: 'Gandalf', lastName: 'the Grey', description: 'wizard'},
  {id: 4, firstName: 'Samwise', lastName: 'Gamgee', description: 'gardener'},
  {id: 5, firstName: 'Meriadoc', lastName: 'Brandybuck', description: 'pony rider'},
  {id: 6, firstName: 'Peregrin', lastName: 'Took', description: 'pipe smoker'}]
let employees2 = [{id: 2, firstName: 'Bilbo', lastName: 'Baggins', description: 'burglar'},
  {id: 3, firstName: 'Gandalf', lastName: 'the Grey', description: 'wizard'},
  {id: 4, firstName: 'Samwise', lastName: 'Gamgee', description: 'gardener'},
  {id: 5, firstName: 'Meriadoc', lastName: 'Brandybuck', description: 'pony rider'},
  {id: 6, firstName: 'Peregrin', lastName: 'Took', description: 'pipe smoker'}]
let employees3 = [{id: 2, firstName: 'Bilbo', lastName: 'Baggins', description: 'burglar'},
  {id: 3, firstName: 'Gandalf', lastName: 'the Grey', description: 'wizard'},
  {id: 4, firstName: 'Samwise', lastName: 'Gamgee', description: 'gardener'},
  {id: 5, firstName: 'Meriadoc', lastName: 'Brandybuck', description: 'pony rider'},
  {id: 6, firstName: 'Peregrin', lastName: 'Took', description: 'pipe smoker'},
  {id: 1, firstName: 'Frodo', lastName: 'Baggins', description: 'ring bearer'}]
let employees4 = [{id: 2, firstName: 'Bilbo', lastName: 'Baggins', description: 'burglar'},
  {id: 3, firstName: 'Gandalf', lastName: 'the Grey', description: 'wizard'},
  {id: 4, firstName: 'Samwise', lastName: 'Gamgee', description: 'gardener'},
  {id: 5, firstName: 'Meriadoc', lastName: 'Brandybuck', description: 'pony rider'},
  {id: 6, firstName: 'Peregrin', lastName: 'Took', description: 'pipe smoker'},
  {id: 1, firstName: 'Patate', lastName: 'Patate', description: 'Patate'}]

let employeeAlone = employees[0]
let employeeModified = {id: 1, firstName: 'Patate', lastName: 'Patate', description: 'Patate'}

describe('Test Reducers', () => {

  it('reducer setEmployees', () => {
    state = employee(state, { type: SET_EMPLOYEES, employees })
    assert.equal(
      testObject(state, { employees: employees, currentEmployeeId: null }
    ), true)
  })

  it('reducer setCurrentEmployees', () => {
    state = employee(state, { type: SET_CURRENT_EMPLOYEE, employee: employeeAlone })
    assert.equal(
      testObject(state, { employees: employees, currentEmployeeId: 1 }
    ), true)
  })

  it('reducer deleteEmployees', () => {
    state = employee(state, { type: DELETE_EMPLOYEE, employee: employeeAlone })
    assert.equal(
      testObject(state, { employees: employees2, currentEmployeeId: 1 }),
      true)
  })

  it('reducer addEmployee', () => {
    state = employee(state, { type: ADD_EMPLOYEE, employee: employeeAlone })
    assert.equal(
      testObject(state, { employees: employees3, currentEmployeeId: 1 }),
      true)
  })

  it('reducer modifyEmployee', () => {
    state = employee(state, { type: MODIFY_EMPLOYEE, employee: employeeModified })
    assert.equal(
      testObject(state, { employees: employees4, currentEmployeeId: null }),
      true)
  })
})

// [{id: 1, firstName: 'Frodo', lastName: 'Baggins', description: 'ring bearer'},
//   {id: 2, firstName: 'Bilbo', lastName: 'Baggins', description: 'burglar'},
//   {id: 3, firstName: 'Gandalf', lastName: 'the Grey', description: 'wizard'},
//   {id: 4, firstName: 'Samwise', lastName: 'Gamgee', description: 'gardener'},
//   {id: 5, firstName: 'Meriadoc', lastName: 'Brandybuck', description: 'pony rider'},
//   {id: 6, firstName: 'Peregrin', lastName: 'Took', description: 'pipe smoker'}]
