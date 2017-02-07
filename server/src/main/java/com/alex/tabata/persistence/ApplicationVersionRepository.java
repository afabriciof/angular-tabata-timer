package com.alex.tabata.persistence;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.alex.tabata.model.ApplicationVersion;

public interface ApplicationVersionRepository extends CrudRepository<ApplicationVersion, Long> {

	Optional<ApplicationVersion> findFirstByOrderByIdAsc();

}