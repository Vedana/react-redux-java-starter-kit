import {expect} from 'chai'
import { it, describe } from 'mocha'

import { SET_EMPLOYEES,
  SET_CURRENT_EMPLOYEE,
  DELETE_EMPLOYEE,
  ADD_EMPLOYEE,
  MODIFY_EMPLOYEE,
  setEmployees,
  setCurrentEmployee,
  addEmployee,
  modifyEmployee,
  deleteEmployee } from '../src/redux/actions/employee-actions'

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
    expect(action).to.deep.equal(setEmployees(employees))
    // assert.equal(testObject(setEmployees(employees), action), true)
  })

  it('action setCurrentEmployee', () => {
    action = {type: SET_CURRENT_EMPLOYEE, employee}
    expect(action).to.deep.equal(setCurrentEmployee(employee))
  })

  it('action addEmployee', () => {
    action = {type: ADD_EMPLOYEE, employee}
    expect(action).to.deep.equal(addEmployee(employee))
  })

  it('action modifyEmployee', () => {
    action = {type: MODIFY_EMPLOYEE, employee}
    expect(action).to.deep.equal(modifyEmployee(employee))
  })

  it('action deleteEmployee', () => {
    action = {type: DELETE_EMPLOYEE, employee}
    expect(action).to.deep.equal(deleteEmployee(employee))
  })
})
