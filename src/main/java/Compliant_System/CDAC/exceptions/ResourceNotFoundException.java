package Compliant_System.CDAC.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException{
	
	private static final long serialVersionUID = -563076953824767565L;

	public ResourceNotFoundException(String message)
	{
		super(message);
	}
}
