package com.alex.tabata;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;

import com.alex.tabata.persistence.DataBaseService;

@SpringBootApplication
public class Application implements ApplicationListener<ApplicationReadyEvent> {
	
	private static final String APPLICATION_VERSION = "0.0.1";
	private static final Logger LOG = LoggerFactory.getLogger(Application.class.getName());
	
	@Autowired
	DataBaseService dataBaseService;
	
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
        LOG.info("Tabata Application Started!");
    }

	@Override
    public void onApplicationEvent(final ApplicationReadyEvent event) {
    	LOG.info("ApplicationReadyEvent");
    	dataBaseService.populateDataBase();
    	dataBaseService.performQueries();
    }
	
	public static String getApplicationversion() {
		return APPLICATION_VERSION;
	}	
}
