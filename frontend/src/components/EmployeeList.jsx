import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { Link } from 'react-router';

const EmployeeList = (props) => (
  <div>
    <h1>Employee List</h1>
    <table border="1">
      <tbody>
        <tr>
          <th>Id</th>
          <th>First name</th>
          <th>Last name</th>
          <th>Description</th>
        </tr>
        {props.employees.map(
          employee =>
            <tr>
              <td><Link to="/Employee" query={{employee: employee.id}}>{employee.id}</Link></td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.description}</td>
            </tr>
        )}
      </tbody>
    </table>
  </div>
)

/**
 * Map the Redux state to component properties
 * @param state Redux state
 * @return Component properties
 */
function mapStateToProps(state) {
  const props = {
    employees: state.employee.employees
  };

  return props;
}

/**
 * Create redux dispatch actions from the component.
 * @param dispatch Redux dispatcher
 * @return Component properties
 */
function mapDispatchToProps (dispatch) {
	return bindActionCreators({
	}, dispatch);
}

/**
 * Connect component to the Redux store.
 */
export default connect(
  mapStateToProps, mapDispatchToProps
)(EmployeeList)
