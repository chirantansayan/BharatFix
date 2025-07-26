package Compliant_System.CDAC.services;

import java.security.SecureRandom;
import java.text.DecimalFormat;

public class OtpGenerator {
	public static String generateOtp() {
		int length = 6;
		int min = (int) Math.pow(10, length-1);
		int max = (int) Math.pow(10, length) - 1;
		
		SecureRandom secureRandom = new SecureRandom();
		int otp = secureRandom.nextInt((max - min) + 1) + min;
		
		StringBuilder formatted = new StringBuilder();
		for(int i=0; i<length; i++) {
			formatted.append("0");
		}
		
		DecimalFormat decimalFormat = new DecimalFormat(formatted.toString());
		return decimalFormat.format(otp);
	}
}
