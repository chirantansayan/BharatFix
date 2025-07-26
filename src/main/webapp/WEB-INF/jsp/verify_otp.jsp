<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Verify OTP Page</title>
	</head>
	
	<body>
		<h2>Verify OTP</h2>
	
	    <p style="color: green;">${message}</p>
	    <p style="color: red;">${error}</p>
	
	    <form action="/verify-otp" method="post">
	        <label for="email">Email:</label>
	        <input type="email" id="email" name="email" value="${email}" readonly>
	        <br><br>
	        <label for="otp">Enter OTP:</label>
	        <input type="text" id="otp" name="enteredOtp" required>
	        <br><br>
	        <button type="submit">Verify OTP</button>
	    </form>
	    <br>
	    <form action="/request-otp" method="post">
	        <input type="hidden" name="email" value="${email}">
	        <button type="submit">Resend OTP</button>
	    </form>
	</body>
</html>