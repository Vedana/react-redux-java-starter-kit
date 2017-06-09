import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Button } from 'react-bootstrap'
// import FontAwesome from 'react-fontawesome'
import {deleteAnEmployee} from '../redux/actions/employee-actions'

const EmployeeList = (props) => (
  <div className="container">
    <h1>Employee List</h1>
    <div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th className="col-md-2">First name</th>
            <th className="col-md-2">Last name</th>
            <th className="col-md-8">Description</th>
            <th className="col-md-1">Modify</th>
            <th className="col-md-1">Delete</th>

          </tr>
        </thead>
        <tbody>
          {props.employees.map(
            employee =>
              <tr key={employee.id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.description}</td>
                <td>
                  <Link to={`/Employee/${employee.id}`}>
                    <Button bsStyle="info" bsSize="small">
                      <span className="fa fa-edit"></span>
                    </Button>
                  </Link>
                </td>
                <td>
                  <Button bsStyle="danger" bsSize="small" onClick={ () => { props.deleteEmployee(employee) } }>
                    <span className="fa fa-remove"></span>
                  </Button>
                </td>

              </tr>
          )}

        </tbody>

      </table>
      <Link to={`/Employee/Add`}>
        <Button bsStyle="success">
          <span className="fa fa-plus-square"></span>
        </Button>
      </Link>
    </div>
  </div>
)

/**
 * Map the Redux state to component properties
 * @param state Redux state
 * @return Component properties
 */
function mapStateToProps (state) {
  const props = {
    employees: state.employee.employees
  }

  return props
}

/**
 * Create redux dispatch actions from the component.
 * @param dispatch Redux dispatcher
 * @return Component properties
 */
// function mapDispatchToProps (dispatch) {
//   return bindActionCreators(, dispatch)
// }

/**
 * Connect component to the Redux store.
 */
export default connect(
  mapStateToProps, {
    deleteEmployee: deleteAnEmployee
  }
)(EmployeeList)
