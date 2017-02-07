package com.alex.tabata.controller;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.dao.DataAccessException;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.alex.tabata.UnitTestUtils;
import com.alex.tabata.controller.PersonRestController;
import com.alex.tabata.model.Person;
import com.alex.tabata.model.Setting;
import com.alex.tabata.persistence.DataBaseService;
import com.alex.tabata.persistence.PersonRepository;
import com.alex.tabata.persistence.SettingRepository;

@RunWith(SpringRunner.class)
@WebMvcTest(PersonRestController.class)
public class PersonRestControllerTest {

	@Autowired
	private MockMvc mockMvc;

    @MockBean
    PersonRepository personRepositoryMock;    

    @MockBean
    SettingRepository settingRepositoryMock;    
    
    @MockBean
    DataBaseService dataBaseServiceMock;
    
    @Test
    public void getShouldSucceed() throws Exception {
		Long settingId = 1234L;
		Integer workValue = 20;
    	
    	Setting setting = new Setting();
		setting.setWork(workValue);
		setting.setId(settingId);
		
		Person person = new Person("afernandez","Alejandro", "Fernandez");
		person.setSetting(setting);        
        
		when(personRepositoryMock.findFirstByUserName("afernandez")).thenReturn(Optional.of(person));
    	
		mockMvc.perform(get("/person/get?userName=afernandez"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(UnitTestUtils.CHARSET_UTF_8))
                .andExpect(jsonPath("firstName").value("Alejandro"))
				.andExpect(jsonPath("lastName").value("Fernandez"))
				.andExpect(jsonPath("userName").value("afernandez"))
				.andExpect(jsonPath("setting.id").value(settingId))
				.andExpect(jsonPath("setting.work").value(workValue));
 
        verify(personRepositoryMock, times(1)).findFirstByUserName("afernandez");
        verifyNoMoreInteractions(personRepositoryMock);
    }

    @Test
    public void getShouldReturnNotFound() throws Exception {
		when(personRepositoryMock.findFirstByUserName("rsmith")).thenReturn(Optional.empty());
    	
		mockMvc.perform(get("/person/get?userName=rsmith"))
        	.andExpect(status().isNotFound());
 
        verify(personRepositoryMock, times(1)).findFirstByUserName("rsmith");
        verifyNoMoreInteractions(personRepositoryMock);
    }
    
    @Test
    public void updateShouldSucceed() throws Exception {
		Setting originalSetting = new Setting();
		originalSetting.setWork(20);
		originalSetting.setId(2L);
		
		Person originalPerson = new Person("afernandez","Alejandro", "Fernandez");
		originalPerson.setSetting(originalSetting);
		originalPerson.setId(1L);
        
		Long settingId = 2L;
		Setting modifiedSetting = new Setting();
		modifiedSetting.setWork(30);
		modifiedSetting.setId(settingId);
		
		Person modifiedPerson = new Person("afernandez","Alejandro Fabricio", "Fernandez");
		modifiedPerson.setSetting(modifiedSetting);
		modifiedPerson.setId(1L);
		
		Long personId = modifiedPerson.getId();
		
		when(personRepositoryMock.findById(personId)).thenReturn(Optional.of(originalPerson));
		when(personRepositoryMock.save(modifiedPerson)).thenReturn(modifiedPerson);
		when(settingRepositoryMock.save(modifiedSetting)).thenReturn(modifiedSetting);
		  
		mockMvc.perform(put("/person/update/"+personId)
            	.contentType(MediaType.APPLICATION_JSON)
            	.content(UnitTestUtils.asJsonString(modifiedPerson))
            )
            .andExpect(status().isOk())
			.andExpect(content().contentType(UnitTestUtils.CHARSET_UTF_8))
			.andExpect(jsonPath("id").value(personId))
			.andExpect(jsonPath("firstName").value("Alejandro Fabricio"))
			.andExpect(jsonPath("lastName").value("Fernandez"))
			.andExpect(jsonPath("userName").value("afernandez"))
			.andExpect(jsonPath("setting.id").value(settingId))
			.andExpect(jsonPath("setting.work").value(30));
	    verify(personRepositoryMock, times(1)).findById(personId);
	    verify(personRepositoryMock, times(1)).save((Person)Mockito.anyObject());
	    verify(settingRepositoryMock, times(1)).save(modifiedSetting);
		verifyNoMoreInteractions(personRepositoryMock);
		verifyNoMoreInteractions(settingRepositoryMock);		
    
    }    

    @Test
    public void updateExceptionShouldCreateJsonExceptionResponse() throws Exception {
		Setting originalSetting = new Setting();
		originalSetting.setWork(20);
		originalSetting.setId(2L);
		
		Person originalPerson = new Person("afernandez","Alejandro", "Fernandez");
		originalPerson.setSetting(originalSetting);
		originalPerson.setId(1L);
        
		Long settingId = 2L;
		Setting modifiedSetting = new Setting();
		modifiedSetting.setWork(30);
		modifiedSetting.setId(settingId);
		
		Person modifiedPerson = new Person("afernandez","Alejandro Fabricio", "Fernandez");
		modifiedPerson.setSetting(modifiedSetting);
		modifiedPerson.setId(1L);
		
		Long personId = modifiedPerson.getId();
		
		when(personRepositoryMock.findById(personId)).thenReturn(Optional.of(originalPerson));
		when(settingRepositoryMock.save(modifiedSetting)).thenReturn(modifiedSetting);	
		
		DataAccessException dataAccessException = new DataAccessException("Simulated error to check transactions") {
				private static final long serialVersionUID = 1L;
			};
		Mockito.doThrow(dataAccessException).when(personRepositoryMock).save((Person)Mockito.anyObject());
  
		mockMvc.perform(put("/person/update/"+personId)
            	.contentType(MediaType.APPLICATION_JSON)
            	.content(UnitTestUtils.asJsonString(modifiedPerson))
            )
            .andExpect(status().isConflict());
    }    
    
    @Test
    public void updateShouldReturnNotFound() throws Exception {
		Long settingId = 2L;
		Setting modifiedSetting = new Setting();
		modifiedSetting.setWork(30);
		modifiedSetting.setId(settingId);
		
		Person modifiedPerson = new Person("afernandez","Alejandro Fabricio", "Fernandez");
		modifiedPerson.setSetting(modifiedSetting);
		modifiedPerson.setId(1L);
		
		Long personId = modifiedPerson.getId();
		
    	when(personRepositoryMock.findById(personId)).thenReturn(Optional.empty());
    	
		mockMvc.perform(put("/person/update/"+personId)
            	.contentType(MediaType.APPLICATION_JSON)
            	.content(UnitTestUtils.asJsonString(modifiedPerson))
            )
        	.andExpect(status().isNotFound());
 
        verify(personRepositoryMock, times(1)).findById(personId);
        verifyNoMoreInteractions(personRepositoryMock);
    }        
    
}
