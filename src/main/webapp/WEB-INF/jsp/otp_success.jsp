<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Welcome Page</title>
	</head>
	
	<body>
		<h2>OTP Verification Status</h2>
	    <p style="color: green;">${success}</p>
	    <p>You can now proceed.</p>
	    <a href="/login">Go to Login</a>
	</body>
</html>