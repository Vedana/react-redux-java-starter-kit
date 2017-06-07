import 'isomorphic-fetch'

export const SET_EMPLOYEES = 'employees/SET_EMPLOYEES'
export const SET_EMPLOYEE = 'employees/SET_EMPLOYEE'
export const DELETE_EMPLOYEE = 'employees/DELETE_EMPLOYEE'

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
  return {type: SET_EMPLOYEE, employee: employee}
}

/**
 * Appel de l'API REST pour modifier un employé (via PUT)
 */
export function putEmployee (employee) {
  return fetch(ROOT_API + '/employees/' + employee.id, {
    credentials: 'include',
    headers: {'Content-Type': 'application/json'},
    method: 'put',
    body: JSON.stringify(employee)
  })
  .then(response =>
    response.json()
  )
}

/**
 * Modification d'un employé via l'API
 */
export function saveEmployee (employee) {
  return (dispatch) => {
    putEmployee(employee)
    .then(data => {
      dispatch(setEmployee(data))
    })
    .catch((e) => {
      alert(e.message)
    })
  }
}

export function deleteAnEmployee (employees, employee) {
  var employees2 = []
  employees.forEach(function (element) {
    if (element === employee) {
      console.log('Employee ' + employee.firstName + ' deleted')
    } else {
      employees2.push(element)
    }
  })
  return (dispatch) => {
    deleteEmployee(employee)
    .then(
      dispatch(setEmployees(employees2))
    )
    .catch((e) => {
      alert(e.message)
    })
  }
}

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

export function postEmployee (employee) {
  return fetch(ROOT_API + '/employees/', {
    credentials: 'include',
    headers: {'Content-Type': 'application/json'},
    method: 'post',
    body: JSON.stringify(employee)
  })
  .then(response =>
    response.json()
  )
}
