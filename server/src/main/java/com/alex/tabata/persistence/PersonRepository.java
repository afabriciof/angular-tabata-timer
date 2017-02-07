package com.alex.tabata.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.alex.tabata.model.Person;

public interface PersonRepository extends CrudRepository<Person, Long> {

    List<Person> findByLastName(String lastName);
    
    Optional<Person> findFirstByUserName(String userName);
    
    Optional<Person> findById(Long id);
    
}