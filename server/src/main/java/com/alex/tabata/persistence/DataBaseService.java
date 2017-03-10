package com.alex.tabata.persistence;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.alex.tabata.model.Person;
import com.alex.tabata.model.Setting;

@Service
public class DataBaseService {

	private static final Logger LOG = LoggerFactory.getLogger(DataBaseService.class.getName());

	private final PersonRepository personRepository;
	private final SettingRepository settingRepository;

	@Value("${database.populate.on.startup}")
	private Boolean databasePopulateOnStartup;	
	
	@Autowired
	public DataBaseService(PersonRepository personRepository,SettingRepository settingRepository) {
		this.personRepository = personRepository;
		this.settingRepository = settingRepository;
	}

	public void populateDataBase() {
		if (!databasePopulateOnStartup) return;

		// save a couple of customers
		personRepository.save(new Person("jbauer", "Jack", "Bauer"));
		personRepository.save(new Person("cobrian", "Chloe", "O'Brian"));
		personRepository.save(new Person("kbauer","Kim", "Bauer"));
		personRepository.save(new Person("dpalmer","David", "Palmer"));
		personRepository.save(new Person("mdessler","Michelle", "Dessler"));
		
		Setting setting = new Setting();
		setting.setWork(20);
		
		settingRepository.save(setting);
		Person person = new Person("afernandez","Alejandro", "Fernandez");
		person.setSetting(setting);
		
		personRepository.save(person);
	}

	public void performQueries() {
		// fetch all customers
		LOG.info("Customers found with findAll():");
		LOG.info("-------------------------------");
		for (Person person : personRepository.findAll()) {
			LOG.info(person.toString());
		}
		LOG.info("");
		
		// fetch an individual customer by ID
		Person customer = personRepository.findOne(2L);
		LOG.info("Customer found with findOne(2L):");
		LOG.info("--------------------------------");
		if (customer != null) LOG.info(customer.toString());
		LOG.info("");
		
		// fetch customers by last name
		LOG.info("Customer found with findByLastName('Bauer'):");
		LOG.info("--------------------------------------------");
		for (Person bauer : personRepository.findByLastName("Bauer")) {
			LOG.info(bauer.toString());
		}
		LOG.info("");

		// fetch customers by user name
		LOG.info("Customer found with findFirstByUserName('afernandez'):");
		LOG.info("--------------------------------------------");
		Optional<Person> afernandez = personRepository.findFirstByUserName("afernandez"); 
		if (afernandez.isPresent()) LOG.info(afernandez.get().toString());
		LOG.info("");
	}

}
