package com.cdac.complaint_system.BharatFix.exceptions;


public class AccessDeniedException extends RuntimeException {
	private static final long serialVersionUID = 4942214003950143844L;

	public AccessDeniedException(String message) {
        super(message);
    }
}

