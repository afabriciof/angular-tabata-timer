package com.alex.tabata.persistence;

import org.springframework.data.repository.CrudRepository;

import com.alex.tabata.model.Setting;

public interface SettingRepository extends CrudRepository<Setting, Long> {

}