<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Login Page</title>
	</head>
	
	<body>
		<h2>Login via OTP</h2>
		
		<form action="/request-otp" method="post">
			<label>
				Enter your email: 
				<input type="email" id="email" name="email" required>
			</label>
			<br><br>
			<button type="submit">Generate OTP</button>
		</form>
	</body>
</html>