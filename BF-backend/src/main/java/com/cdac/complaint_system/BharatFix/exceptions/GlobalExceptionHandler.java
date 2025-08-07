package com.cdac.complaint_system.BharatFix.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?> handleResourceNotFound(ResourceNotFoundException ex) {
		return buildResponse(HttpStatus.NOT_FOUND, ex.getMessage());
	}

	@ExceptionHandler(BadRequestException.class)
	public ResponseEntity<?> handleBadRequest(BadRequestException ex) {
		return buildResponse(HttpStatus.BAD_REQUEST, ex.getMessage());
	}

	@ExceptionHandler(UnauthorizedException.class)
	public ResponseEntity<?> handleUnauthorized(UnauthorizedException ex) {
		return buildResponse(HttpStatus.UNAUTHORIZED, ex.getMessage());
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<?> handleGeneral(Exception ex) {
		ex.printStackTrace(); // Helpful for debugging
		return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
	}

	@ExceptionHandler(AccessDeniedException.class)
	public ResponseEntity<?> handleAccessDenied(AccessDeniedException ex) {
		return buildResponse(HttpStatus.FORBIDDEN, ex.getMessage());
	}

	@ExceptionHandler(TeamUnavailableException.class)
	public ResponseEntity<?> handleTeamUnavailable(TeamUnavailableException ex) {
		return buildResponse(HttpStatus.SERVICE_UNAVAILABLE, ex.getMessage());
	}

	@ExceptionHandler(FeedbackAlreadySubmittedException.class)
	public ResponseEntity<?> handleFeedbackSubmitted(FeedbackAlreadySubmittedException ex) {
		return buildResponse(HttpStatus.CONFLICT, ex.getMessage());
	}

	private ResponseEntity<Map<String, Object>> buildResponse(HttpStatus status, String message) {
		Map<String, Object> body = new HashMap<>();
		body.put("timestamp", LocalDateTime.now());
		body.put("status", status.value());
		body.put("error", status.getReasonPhrase());
		body.put("message", message);
		return new ResponseEntity<>(body, status);
	}
}
