import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import { Button } from 'react-bootstrap'
import { browserHistory } from 'react-router'



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
    this.props.save(employee, this.employeeId());
  };

  render () {
    const {handleSubmit, submitting, pristine} = this.props
    return (
      <div className="container">
        <h1>Employee</h1>
        <form className="form-group">
          <div>First Name : <Field component="input" type="text" name="firstName" className="form-control" /></div>
          <div>Last Name : <Field component="input" type="text" name="lastName" className="form-control" /></div>
          <div>Description : <Field component="input" type="text" name="description" className="form-control" /></div>
          <br />
          <Button onClick={handleSubmit(this.handleSaveEvent)} className="form-control" disabled={submitting}>
            {this.employeeId()=='Add'?'Add Employee':'Update Employee'}
          </Button>
        </form>
      </div>
    )
  }
}

/**
 * Connect component to Redux form.
 */
const EmployeeForm = reduxForm({
  form: 'employee', // form identifier
  onSubmitSuccess: () => {
    browserHistory.push('/')
  },
  enableReinitialize : true
})(Employee)


const getCurrentEmployee = (employees, currentEmployeeId) => {
  let currentEmployee
  employees.map(function(employee) {
    if (currentEmployeeId === employee.id){
      currentEmployee = employee
    }
  })
  return currentEmployee
}

const mapStateToProps = (state) => {
  return {
    initialValues: getCurrentEmployee(state.employee.employees, state.employee.currentEmployeeId)
  }
}

// You have to connect() to any reducers that you wish to connect to yourself
const EmployeeStateForm = connect(
  mapStateToProps,
  {
    load: getEmployee,
    save: saveEmployee
  }
)(EmployeeForm)

export default EmployeeStateForm
