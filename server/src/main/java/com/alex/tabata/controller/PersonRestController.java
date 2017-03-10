package com.alex.tabata.controller;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alex.tabata.model.Person;
import com.alex.tabata.persistence.PersonRepository;
import com.alex.tabata.persistence.SettingRepository;

@RestController
@RequestMapping("/person")
public class PersonRestController {

	private static final Logger LOG = LoggerFactory.getLogger(PersonRestController.class.getName());
	
	@Autowired
	PersonRepository personRepository;

	@Autowired
	SettingRepository settingRepository;	
	
	@CrossOrigin
	@RequestMapping(value = "/get", method = RequestMethod.GET)
	public ResponseEntity<Person> get(@RequestParam(value="userName") String userName) {
		Optional<Person> optionalPerson = personRepository.findFirstByUserName(userName);
		if (optionalPerson.isPresent()) {
			return new ResponseEntity<Person>(optionalPerson.get(), HttpStatus.OK);
		} else {
            LOG.info("Person with userName " + userName + " not found");
            return new ResponseEntity<Person>(HttpStatus.NOT_FOUND);
        }
	}
	
	@Transactional
	@CrossOrigin
	@RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
	public ResponseEntity<Person> update(@PathVariable("id") long id, @RequestBody Person person) {
		Optional<Person> optionalCurrentPerson = personRepository.findById(id);
        
        if (!optionalCurrentPerson.isPresent()) {
            LOG.info("Person with id " + id + " not found");
            return new ResponseEntity<Person>(HttpStatus.NOT_FOUND);
        }
 
        Person currentPerson = optionalCurrentPerson.get();
        currentPerson.setFirstName(person.getFirstName());
        currentPerson.setLastName(person.getLastName());
        currentPerson.setUserName(person.getUserName());
        currentPerson.setSetting(person.getSetting());
        
        settingRepository.save(currentPerson.getSetting());
        personRepository.save(currentPerson);
        
        return new ResponseEntity<Person>(currentPerson, HttpStatus.OK);
	}
}
