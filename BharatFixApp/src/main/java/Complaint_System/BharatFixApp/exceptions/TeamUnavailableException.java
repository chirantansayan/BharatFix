package Complaint_System.BharatFixApp.exceptions;


public class TeamUnavailableException extends RuntimeException {
	private static final long serialVersionUID = 8680424288832644176L;

	public TeamUnavailableException(String message) {
        super(message);
    }
}

