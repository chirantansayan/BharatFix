package Complaint_System.BharatFixApp.exceptions;


public class UnauthorizedException extends RuntimeException {
	private static final long serialVersionUID = -2447904086973515628L;

	public UnauthorizedException(String message) {
        super(message);
    }
}

