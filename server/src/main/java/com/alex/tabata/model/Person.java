package com.alex.tabata.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
public class Person {

	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

	private String firstName;

	private String lastName;
    
    @Column(unique=true)
    private String userName;

    @OneToOne
    @JoinColumn(name="setting_id")
    private Setting setting;         
    
	protected Person() {}

    public Person(String userName, String firstName, String lastName) {
        this.userName = userName;
    	this.firstName = firstName;
        this.lastName = lastName;
    }

    @Override
    public String toString() {
        return String.format(
                "Person[id=%d, userName='%s', firstName='%s', lastName='%s', setting='%s']",
                id, userName, firstName, lastName, setting ==null ? "null" : setting.toString());
    }

	@Override
	public boolean equals(Object obj) {
		if((obj == null) || (obj.getClass() != this.getClass())) return false;
		
		Person person = (Person) obj;

		if (id != person.id) return false;
		if (firstName != person.firstName) return false;
		if (lastName != person.lastName) return false;		
		if (userName != person.userName) return false;
		return true;
	}		

    public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
    
    public Setting getSetting() {
		return setting;
	}

	public void setSetting(Setting setting) {
		this.setting = setting;
	}
	
}
