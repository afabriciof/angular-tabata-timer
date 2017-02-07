package com.alex.tabata;

import com.fasterxml.jackson.databind.ObjectMapper;

public class UnitTestUtils {

	public static final String CHARSET_UTF_8 = "application/json;charset=UTF-8";	
	
    public static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }    	
	
}
