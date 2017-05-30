import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'

// actions
import {getEmployee, saveEmployee} from '../redux/actions/employee-actions'

// Employee form
class Employee extends React.Component {
  componentWillMount () {
    let id = this.employeeId()
    if (id) {
      this.props.load(id)
    }
  }

  employeeId () {
    return this.props.params.employeeId
  }

  handleSaveEvent = (employee) => {
    this.props.save(employee)
  };

  render () {
    const {handleSubmit, submitting, pristine} = this.props

    return (
      <div>
        <h1>Employee</h1>
        <form>
          <div>First Name : <Field component="input" type="text" name="firstName" /></div>
          <div>Last Name : <Field component="input" type="text" name="lastName" /></div>
          <div>Description : <Field component="input" type="text" name="description" /></div>
          <button type="submit" onClick={handleSubmit(this.handleSaveEvent)} disabled={pristine || submitting}>OK</button>
        </form>
      </div>
    )
  }
}

/**
 * Connect component to Redux form.
 */
const EmployeeForm = reduxForm({
  form: 'employee' // form identifier
})(Employee)

// You have to connect() to any reducers that you wish to connect to yourself
const EmployeeStateForm = connect(
  state => ({
    initialValues: state.employee.employee // pull initial values from reducer
  }),
  {
    load: getEmployee,
    save: saveEmployee
  }
)(EmployeeForm)

export default EmployeeStateForm
