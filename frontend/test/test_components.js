import React from 'react'
import {mount} from 'enzyme'
import {expect} from 'chai'

import {EmployeeList} from '../src/components/EmployeeList'

import {jsdom} from 'jsdom'
// const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
//
global.document = jsdom('')
global.window = document.defaultView

let employees = [{id: 1, firstName: 'Frodo', lastName: 'Baggins', description: 'ring bearer'},
  {id: 2, firstName: 'Bilbo', lastName: 'Baggins', description: 'burglar'},
  {id: 3, firstName: 'Gandalf', lastName: 'the Grey', description: 'wizard'},
  {id: 4, firstName: 'Samwise', lastName: 'Gamgee', description: 'gardener'},
  {id: 5, firstName: 'Meriadoc', lastName: 'Brandybuck', description: 'pony rider'},
  {id: 6, firstName: 'Peregrin', lastName: 'Took', description: 'pipe smoker'}]
let state = {employees: employees, currentEmployeeId: null}

describe('BlogComment', () => {
  it('should display comment body', () => {
    // This is where we create a mock state/props
    const wrapper = mount(<EmployeeList {...state} />)
    let firstName = wrapper.find('.employees-first-name')

    expect(firstName).to.have.text(state.employees[1].firstName)
  })

  // it('should dispatch action when clicking like', () => {
  //   const props = {
  //     body: 'Nice post!',
  //     author: 'Tiffany Wu',
  //     numberOfLikes: 10,
  //     likeComment: sinon.spy(),
  //   }
  //
  //   const wrapper = mount(<BlogComment {...props} />)
  //
  //   wrapper.find('button').simulate('click')
  //
  //   expect(props.likeComment.calledOnce).to.equal(true)
  // })
})
