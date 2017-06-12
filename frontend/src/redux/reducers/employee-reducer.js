import {SET_EMPLOYEES, SET_CURRENT_EMPLOYEE, DELETE_EMPLOYEE, ADD_EMPLOYEE, MODIFY_EMPLOYEE } from '../actions/employee-actions'

/** Etat initial */
const initialState = {
  employees: [],
  currentEmployeeId: null
}

/**
 * Fonction 'reducer' générant un nouvel état à partir de l'état actuel et en
 * appliquant l'action indiquée.
 *
 * @param state
 *            l'état actuel
 * @param action
 *            l'action à appliquer
 * @return le nouvel état
 */


export function employee (state = initialState, action) {
  let arrayTemp
  switch (action.type) {
    case SET_EMPLOYEES:
      return {...state, employees: action.employees}
    case SET_CURRENT_EMPLOYEE:
      return {...state, currentEmployeeId: action.employee.id}
    case DELETE_EMPLOYEE:
      arrayTemp = {...state}.employees.slice()
      arrayTemp.splice(arrayTemp.indexOf(action.employee),1 )
      return {...state, employees: arrayTemp}
    case ADD_EMPLOYEE:
      arrayTemp = {...state}.employees.slice()
      arrayTemp.push(action.employee)
      return {...state, employees: arrayTemp}
    case MODIFY_EMPLOYEE:
      arrayTemp = {...state}.employees.slice()
      arrayTemp = arrayTemp.map(function(employee){
        if (employee.id === action.employee.id){
          return action.employee
        }
        return employee
      })
      return {...state, employees: arrayTemp, currentEmployeeId: null}
    default:
      return state
  }
}

export default { employee }
