package com.alex.tabata.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Setting {

	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	private Integer prepare;
	private Integer work;
	private Integer rest;
	private Integer cycles;
	private Integer tabatas;

    @Override
    public String toString() {
        return String.format(
                "Setting[id=%d, prepare='%d', work='%d', rest='%d', cycles='%d', tabatas='%d']",
                id, prepare, work, rest, cycles, tabatas);
    }

	@Override
	public boolean equals(Object obj) {
		if((obj == null) || (obj.getClass() != this.getClass())) return false;
		
		Setting setting = (Setting) obj;
		if (prepare != setting.prepare) return false;
		if (work != setting.work) return false;
		if (rest != setting.rest) return false;
		if (cycles != setting.cycles) return false;
		if (tabatas != setting.tabatas) return false;
		return true;
	}	
    
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getPrepare() {
		return prepare;
	}

	public void setPrepare(Integer prepare) {
		this.prepare = prepare;
	}

	public Integer getWork() {
		return work;
	}

	public void setWork(Integer work) {
		this.work = work;
	}

	public Integer getRest() {
		return rest;
	}

	public void setRest(Integer rest) {
		this.rest = rest;
	}

	public Integer getCycles() {
		return cycles;
	}

	public void setCycles(Integer cycles) {
		this.cycles = cycles;
	}

	public Integer getTabatas() {
		return tabatas;
	}

	public void setTabatas(Integer tabatas) {
		this.tabatas = tabatas;
	}
	
}
