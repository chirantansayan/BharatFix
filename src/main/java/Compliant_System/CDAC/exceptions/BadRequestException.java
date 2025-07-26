package Compliant_System.CDAC.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BadRequestException extends RuntimeException{

	private static final long serialVersionUID = -2020096735419034748L;

	public BadRequestException(String message)
	{
		super(message);
	}
}
