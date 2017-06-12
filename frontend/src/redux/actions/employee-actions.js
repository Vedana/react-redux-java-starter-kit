import 'isomorphic-fetch'

export const SET_EMPLOYEES = 'employees/SET_EMPLOYEES'
export const SET_CURRENT_EMPLOYEE = 'employees/SET_EMPLOYEE'
export const DELETE_EMPLOYEE = 'employees/DELETE_EMPLOYEE'
export const ADD_EMPLOYEE = 'employees/ADD_EMPLOYEE'
export const MODIFY_EMPLOYEE = 'employees/MODIFY_EMPLOYEE'

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
 * Chargement de l'employee courant dans le store
 */
export function setEmployee (employee) {
  return {type: SET_CURRENT_EMPLOYEE, employee: employee}
}

/**
 * Appel de l'API REST pour modifier un employé (via PUT)
 */
export function putEmployee (employee) {
  return fetch(ROOT_API + '/employees/' + employee.id, {
    credentials: 'include',
    headers: {'Content-Type': 'application/json'},
    method: 'PUT',
    body: JSON.stringify(employee)
  })
  .then(response =>
    response.json()
  )
}

/**
 * Sauvegarde/Ajoute un employee
 */
export function saveEmployee (employee, method) {
  if (method === 'Add') {
    return (dispatch) => {
      postEmployee(employee)
      .then(data => {
        dispatch(addEmployee(data))
        console.log(data);
      })
      .catch((e) => {
        alert(e.message)
      })
    }
  } else {
    return (dispatch) => {
      putEmployee(employee)
      .then(data => {
        dispatch(modifyEmployee(data))
      })
      .catch((e) => {
        alert(e.message)
      })
    }
  }
}

/**
 * Ajoute un employee dans le store
**/
export function addEmployee(employee) {
  return {type: ADD_EMPLOYEE, employee: employee}
}

/**
 * Modifie un employee dans le store
**/
export function modifyEmployee(employee) {
  return {type: MODIFY_EMPLOYEE, employee: employee}
}

/**
 * Supprime un employee dans l'API puis le supprime dans le store
**/
export function deleteAnEmployee (employee) {
  deleteEmployee(employee)
  return {type: DELETE_EMPLOYEE, employee: employee}
}

/**
 * Appel de l'API pour supprimer un employee
**/
export function deleteEmployee (employee) {
  return fetch(ROOT_API + '/employees/' + employee.id, {
    credentials: 'include',
    headers: {'Content-Type': 'application/json'},
    method: 'DELETE'
  })
  .then(response =>
    response.json()
  )
}

/**
 * Appel de l'api pour ajouter un employee
**/
export function postEmployee (employee) {
  return fetch(ROOT_API + '/employees/', {
    credentials: 'include',
    headers: {'Content-Type': 'application/json'},
    method: 'POST',
    body: JSON.stringify(employee)
  })
  .then(response =>
    response.json()
  )
}
