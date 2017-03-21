import {SET_EMPLOYEES, SET_EMPLOYEE} from '../actions/employee-actions'

/** Etat initial */
const initialState = {
	employees : []
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
export function employee(state = initialState, action) {
  switch (action.type) {
		case SET_EMPLOYEES:
			return {...state, employees: action.employees};
		case SET_EMPLOYEE:
			return {...state, employee: action.employee};
    default:
			return state;
	}
}

export default { employee }
