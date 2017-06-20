import React from 'react'
import { it, describe } from 'mocha'
import {shallow} from 'enzyme'
import {expect} from 'chai'

import {EmployeeList} from '../src/components/EmployeeList'

// import jsdom from 'jsdom'
// // const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
// //
// global.document = jsdom
// // console.log(jsdom);
// global.window = document.defaultView
//
// import jsdom from 'jsdom'
// const doc = jsdom.JSDOM
// global.document = doc
// global.window = doc.defaultView

// console.log(''+jsdom.JSDOM);

let employees = [{id: 1, firstName: 'Frodo', lastName: 'Baggins', description: 'ring bearer'},
  {id: 2, firstName: 'Bilbo', lastName: 'Baggins', description: 'burglar'},
  {id: 3, firstName: 'Gandalf', lastName: 'the Grey', description: 'wizard'},
  {id: 4, firstName: 'Samwise', lastName: 'Gamgee', description: 'gardener'},
  {id: 5, firstName: 'Meriadoc', lastName: 'Brandybuck', description: 'pony rider'},
  {id: 6, firstName: 'Peregrin', lastName: 'Took', description: 'pipe smoker'}]
let state = {employees: employees, currentEmployeeId: null}

describe('Test EmployeeList', () => {
  const wrapper = shallow(<EmployeeList {...state} />)

  it('Affichage de la liste des employees', () => {
    let employeesRow = wrapper.find('.employee-row')
    let newEmployees = []
    employeesRow.forEach(function (row) {
      let firstName = row.find('.employee-first-name').text()
      let lastName = row.find('.employee-last-name').text()
      let description = row.find('.employee-description').text()
      let newEmployee = {id: parseInt(row.key()), firstName: firstName, lastName: lastName, description: description}
      newEmployees.push(newEmployee)
    })
    let newState = {employees: newEmployees, currentEmployeeId: null}
    expect(newState).to.deep.equal(state)
  })

  // it('Supprimer un employee', () => {
  //   let employeesRow = wrapper.find('.employee-row')
  //   console.log(employeesRow)
  //   employeesRow.first().find('.delete-employee').simulate('click')
  //   console.log(employeesRow)
  // })

})
