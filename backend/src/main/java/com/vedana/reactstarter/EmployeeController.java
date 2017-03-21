package com.vedana.reactstarter;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
	private final EmployeeRepository employeeRepository;

	@Autowired
	EmployeeController(EmployeeRepository employeeRepository) {
		this.employeeRepository = employeeRepository;
	}
	
	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public  ResponseEntity<Collection<Employee>> getEmployees() {
		return new ResponseEntity<>(employeeRepository.findAll(), HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/{employeeId}")
	public ResponseEntity<Employee> getEmployee(@PathVariable long employeeId) {
		Employee employee = employeeRepository.findOne(employeeId);
		if (employee != null) {
			return new ResponseEntity<>(employee,HttpStatus.OK);
		} else {
			return new ResponseEntity<Employee>(HttpStatus.NOT_FOUND);
		}
	}
	
	@RequestMapping(method = RequestMethod.POST)
	ResponseEntity<?> addEmployee(@RequestBody Employee employee) {
		return new ResponseEntity<>(employeeRepository.save(employee), HttpStatus.CREATED);
	}
	
	@RequestMapping(method = RequestMethod.PUT, value = "/{employeeId}")
	ResponseEntity<?> updateEmployee(@PathVariable long employeeId, @RequestBody Employee employee) {
		employee.setId(employeeId);
		return new ResponseEntity<>(employeeRepository.save(employee), HttpStatus.CREATED);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/{employeeId}")
	ResponseEntity<?> deleteEmployee(@PathVariable long employeeId) {
		employeeRepository.delete(employeeId);
		return new ResponseEntity<Employee>(HttpStatus.NO_CONTENT);
	}	
}
