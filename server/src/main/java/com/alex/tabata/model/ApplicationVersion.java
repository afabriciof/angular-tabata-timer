package com.alex.tabata.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ApplicationVersion {
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;	
	int mayor;
	int minor;
	int patch;	

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public int getMayor() {
		return mayor;
	}
	public void setMayor(int mayor) {
		this.mayor = mayor;
	}
	public int getMinor() {
		return minor;
	}
	public void setMinor(int minor) {
		this.minor = minor;
	}
	public int getPatch() {
		return patch;
	}
	public void setPatch(int patch) {
		this.patch = patch;
	}
}
