import React from 'react'
import { it, describe } from 'mocha'
import {shallow} from 'enzyme'
import {expect} from 'chai'

import {EmployeeStateForm} from '../src/components/Employee'


let employees = [{id: 1, firstName: 'Frodo', lastName: 'Baggins', description: 'ring bearer'},
  {id: 2, firstName: 'Bilbo', lastName: 'Baggins', description: 'burglar'},
  {id: 3, firstName: 'Gandalf', lastName: 'the Grey', description: 'wizard'},
  {id: 4, firstName: 'Samwise', lastName: 'Gamgee', description: 'gardener'},
  {id: 5, firstName: 'Meriadoc', lastName: 'Brandybuck', description: 'pony rider'},
  {id: 6, firstName: 'Peregrin', lastName: 'Took', description: 'pipe smoker'}]
let state = {employees: employees, currentEmployeeId: 1}


describe('Test Employee', () => {
  const wrapper = shallow(<EmployeeStateForm {...state} />)
  it('Affichage de lemployee', () => {

  })
})
