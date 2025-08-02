package Complaint_System.BharatFixApp.exceptions;


public class ResourceNotFoundException extends RuntimeException {
	private static final long serialVersionUID = -563076953824767565L;

	public ResourceNotFoundException(String message) {
        super(message);
    }
}

