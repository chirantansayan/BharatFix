package Complaint_System.BharatFixApp.exceptions;


public class BadRequestException extends RuntimeException {
   
	private static final long serialVersionUID = -2020096735419034748L;

	public BadRequestException(String message) {
        super(message);
    }
}

