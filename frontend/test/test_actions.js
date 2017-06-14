import assert from 'assert'

import { SET_EMPLOYEES, SET_CURRENT_EMPLOYEE, DELETE_EMPLOYEE, ADD_EMPLOYEE, MODIFY_EMPLOYEE,
  setEmployees, setCurrentEmployee, addEmployee, modifyEmployee, deleteEmployee } from '../src/redux/actions/employee-actions'

function testObject (object1, object2) {
  if (JSON.stringify(object1) === JSON.stringify(object2)) {
    return true
  }
  return false
}
let employees = [{id: 1, firstName: 'Frodo', lastName: 'Baggins', description: 'ring bearer'},
  {id: 2, firstName: 'Bilbo', lastName: 'Baggins', description: 'burglar'},
  {id: 3, firstName: 'Gandalf', lastName: 'the Grey', description: 'wizard'},
  {id: 4, firstName: 'Samwise', lastName: 'Gamgee', description: 'gardener'},
  {id: 5, firstName: 'Meriadoc', lastName: 'Brandybuck', description: 'pony rider'},
  {id: 6, firstName: 'Peregrin', lastName: 'Took', description: 'pipe smoker'}]
let employee = {id: 7, firstName: 'Patate', lastName: 'Patate', description: 'Patate'}
let action

describe('Test Actions', () => {
  it('action setEmployees', () => {
    action = {type: SET_EMPLOYEES, employees}
    assert.equal(testObject(setEmployees(employees), action), true)
  })
  it('action setCurrentEmployee', () => {
    action = {type: SET_CURRENT_EMPLOYEE, employee}
    assert.equal(testObject(setCurrentEmployee(employee), action), true)
  })
  it('action addEmployee', () => {
    action = {type: ADD_EMPLOYEE, employee}
    assert.equal(testObject(addEmployee(employee), action), true)
  })
  it('action modifyEmployee', () => {
    action = {type: MODIFY_EMPLOYEE, employee}
    assert.equal(testObject(modifyEmployee(employee), action), true)
  })
  it('action deleteEmployee', () => {
    action = {type: DELETE_EMPLOYEE, employee}
    assert.equal(testObject(deleteEmployee(employee), action), true)
  })
})
