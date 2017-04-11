import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// actions
import {getEmployee} from '../redux/actions/employee-actions'

// Employee form
class Employee extends React.Component {
  render () {
    let employee = this.props.employee
    if (!employee) return null
    return (
      <div>
        <h1>Employee {this.employeeId()}</h1>
        <form>
          <div>First Name : <input type="text" value={employee.firstName} /></div>
          <div>Last Name : <input type="text" value={employee.lastName} /></div>
          <div>Description : <input type="text" value={employee.description} /></div>
          <button>Modify</button>
        </form>
      </div>
    )
  }

  componentWillMount () {
    let id = this.employeeId()
    if (id) {
      this.props.getEmployee(id)
    }
  }

  employeeId () {
    return this.props.params.employeeId
  }
}

/**
 * Map the Redux state to component properties
 * @param state Redux state
 * @return Component properties
 */
function mapStateToProps (state) {
  const props = {
    employee: state.employee.employee
  }

  return props
}

/**
 * Create redux dispatch actions from the component.
 * @param dispatch Redux dispatcher
 * @return Component properties
 */
function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    getEmployee
  }, dispatch)
}

/**
 * Connect component to the Redux store.
 */
export default connect(
  mapStateToProps, mapDispatchToProps
)(Employee)
