import 'isomorphic-fetch'

export const SET_EMPLOYEES = 'employees/SET_EMPLOYEES'
export const SET_EMPLOYEE = 'employees/SET_EMPLOYEE'

const ROOT_API = '/api'

/**
 * Récupération de la liste des employés via l'API
 */
export function getEmployees () {
  return (dispatch) => {
    fetchEmployees()
    .then(data => {
      dispatch(setEmployees(data))
    })
    .catch((e) => {
      alert(e.message)
    })
  }
}

/**
 * Appel de l'API REST pour lire la liste des employés
 */
export function fetchEmployees () {
  return fetch(ROOT_API + '/employees', {
    credentials: 'include',
    headers: {'Content-Type': 'application/json'}
  })
  .then(response =>
    response.json()
  )
}

/**
 * Chargement de la liste des employés dans le store
 */
export function setEmployees (employees) {
  return {type: SET_EMPLOYEES, employees}
}

/**
 * Récupération d'un employé via l'API
 */
export function getEmployee (id) {
  return (dispatch) => {
    fetchEmployee(id)
    .then(data => {
      dispatch(setEmployee(data))
    })
    .catch((e) => {
      alert(e.message)
    })
  }
}

/**
 * Appel de l'API REST pour lire un employé
 */
export function fetchEmployee (id) {
  return fetch(ROOT_API + '/employees/' + id, {
    credentials: 'include',
    headers: {'Content-Type': 'application/json'}
  })
  .then(response =>
    response.json()
  )
}

/**
 * Chargement de l'employee courant
 */
export function setEmployee (employee) {
  return {type: SET_EMPLOYEE, employee}
}
