import React from 'react'
import { it, describe } from 'mocha'
import {shallow} from 'enzyme'
import { Provider } from 'react-redux'

import {EmployeeForm} from '../src/components/Employee'

// let employees = [{id: 1, firstName: 'Frodo', lastName: 'Baggins', description: 'ring bearer'},
//   {id: 2, firstName: 'Bilbo', lastName: 'Baggins', description: 'burglar'},
//   {id: 3, firstName: 'Gandalf', lastName: 'the Grey', description: 'wizard'},
//   {id: 4, firstName: 'Samwise', lastName: 'Gamgee', description: 'gardener'},
//   {id: 5, firstName: 'Meriadoc', lastName: 'Brandybuck', description: 'pony rider'},
//   {id: 6, firstName: 'Peregrin', lastName: 'Took', description: 'pipe smoker'}]
// let state = {employees: employees, currentEmployeeId: 1}
// const defaultProps = {
//   initialValues: {id: 1, firstName: 'Frodo', lastName: 'Baggins', description: 'ring bearer'},
// };
//
//
// let statetest = {
//   form: {
//     employee: {
//       registeredFields: {
//         firstName: {
//           name: 'firstName',
//           type: 'Field',
//           count: 1
//         },
//         lastName: {
//           name: 'lastName',
//           type: 'Field',
//           count: 1
//         },
//         description: {
//           name: 'description',
//           type: 'Field',
//           count: 1
//         }
//       },
//       values: {
//         id: 1,
//         firstName: 'Frodo',
//         lastName: 'Baggins',
//         description: 'ring bearer'
//       },
//       initial: {
//         id: 1,
//         firstName: 'Frodo',
//         lastName: 'Baggins',
//         description: 'ring bearer'
//       }
//     }
//   },
//   employee: {
//     employees: [
//       {
//         id: 1,
//         firstName: 'Frodo',
//         lastName: 'Baggins',
//         description: 'ring bearer'
//       },
//       {
//         id: 2,
//         firstName: 'Bilbo',
//         lastName: 'Baggins',
//         description: 'burglar'
//       },
//       {
//         id: 3,
//         firstName: 'Gandalf',
//         lastName: 'the Grey',
//         description: 'wizard'
//       },
//       {
//         id: 4,
//         firstName: 'Samwise',
//         lastName: 'Gamgee',
//         description: 'gardener'
//       },
//       {
//         id: 5,
//         firstName: 'Meriadoc',
//         lastName: 'Brandybuck',
//         description: 'pony rider'
//       },
//       {
//         id: 6,
//         firstName: 'Peregrin',
//         lastName: 'Took',
//         description: 'pipe smoker'
//       }
//     ],
//     currentEmployeeId: 1
//   }
// }
//
// describe('Test Employee', () => {
//   const wrapper = shallow(<EmployeeForm {...statetest}/>)
//
//   it('Affichage de lemployee', () => {
//     console.log(wrapper.nodes[0]
// );
//   })
// })
