package Complaint_System.BharatFixApp.exceptions;


public class FeedbackAlreadySubmittedException extends RuntimeException {
	private static final long serialVersionUID = -1545989701845310669L;

	public FeedbackAlreadySubmittedException(String message) {
        super(message);
    }
}

