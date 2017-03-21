package com.vedana.reactstarter;

import java.io.IOException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.mock.http.MockHttpOutputMessage;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;

import static org.hamcrest.Matchers.*;
import static org.junit.Assert.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = ReactStarterApplication.class)
@WebAppConfiguration
public class EmployeesRestControllerTest {
	private MediaType contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
			MediaType.APPLICATION_JSON.getSubtype(), Charset.forName("utf8"));

	@Autowired
	private EmployeeRepository employeeRepository;

	@Autowired
	private WebApplicationContext webApplicationContext;

	private List<Employee> employeeList = new ArrayList<>();

	private MockMvc mockMvc;

	@SuppressWarnings("rawtypes")
	private HttpMessageConverter mappingJackson2HttpMessageConverter;
	
	@Autowired
    void setConverters(HttpMessageConverter<?>[] converters) {

        this.mappingJackson2HttpMessageConverter = Arrays.asList(converters).stream()
            .filter(hmc -> hmc instanceof MappingJackson2HttpMessageConverter)
            .findAny()
            .orElse(null);

        assertNotNull("the JSON message converter must not be null",
                this.mappingJackson2HttpMessageConverter);
    }
	
	@Before
	public void setup() throws Exception {
		this.mockMvc = webAppContextSetup(webApplicationContext).build();

		this.employeeRepository.deleteAllInBatch();

		this.employeeList.add(employeeRepository.save(new Employee("Frodo", "Baggins", "ring bearer")));
		this.employeeList.add(employeeRepository.save(new Employee("Bilbo", "Baggins", "burglar")));
	}

	@Test
    public void readEmployees() throws Exception {
        mockMvc.perform(get("/api/employees/"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(contentType))
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(this.employeeList.get(0).getId().intValue())))
                .andExpect(jsonPath("$[0].description", is("ring bearer")))
                .andExpect(jsonPath("$[1].id", is(this.employeeList.get(1).getId().intValue())))
                .andExpect(jsonPath("$[1].description", is("burglar")));
    }
	
	@Test
	public void readSingleEmployee() throws Exception {
		mockMvc.perform(get("/api/employees/" + this.employeeList.get(0).getId())).andExpect(status().isOk())
				.andExpect(content().contentType(contentType))
				.andExpect(jsonPath("$.id", is(this.employeeList.get(0).getId().intValue())))
				.andExpect(jsonPath("$.description", is("ring bearer")));
	}
	
	@Test
    public void employeeNotFound() throws Exception {
		mockMvc.perform(get("/api/employees/9999"))
		.andExpect(status().isOk())
		.andExpect(content().string(""));
    }
	
	@Test
    public void createEmployee() throws Exception {
		Employee gandalf = new Employee("Gandalf", "the Grey", "wizard");
		employeeList.add(gandalf);
        String employeeJson = json(gandalf);

        this.mockMvc.perform(post("/api/employees/")
                .contentType(contentType)
                .content(employeeJson))
                .andExpect(status().isCreated());
    }
	
	@Test
    public void updateEmployee() throws Exception {
		Employee frodo = employeeList.get(0);
		frodo.setLastName("Saquet");
        String employeeJson = json(frodo);

        this.mockMvc.perform(put("/api/employees/"+frodo.getId())
                .contentType(contentType)
                .content(employeeJson))
                .andExpect(status().isCreated());
    }

	@Test
	public void deleteEmployee() throws Exception {
		mockMvc.perform(delete("/api/employees/" + this.employeeList.get(0).getId()))
			.andExpect(status().isNoContent());
	}

	protected String json(Object o) throws IOException {
        MockHttpOutputMessage mockHttpOutputMessage = new MockHttpOutputMessage();
        this.mappingJackson2HttpMessageConverter.write(
                o, MediaType.APPLICATION_JSON, mockHttpOutputMessage);
        return mockHttpOutputMessage.getBodyAsString();
    }
}
