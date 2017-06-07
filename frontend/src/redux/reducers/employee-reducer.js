import {SET_EMPLOYEES, SET_EMPLOYEE, DELETE_EMPLOYEE} from '../actions/employee-actions'

/** Etat initial */
const initialState = {
  employees: []
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
  switch (action.type) {
    case SET_EMPLOYEES:
      return {...state, employees: action.employees}
    case SET_EMPLOYEE:
      return {...state, employee: action.employee}
    case DELETE_EMPLOYEE:
      let state2 = state
      state2.employees.splice(state2.employees.indexOf(action.employee), 1)
      return state
    default:
      return state
  }
}

export default { employee }
