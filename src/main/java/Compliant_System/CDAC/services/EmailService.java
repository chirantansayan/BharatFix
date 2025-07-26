package Compliant_System.CDAC.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender javaMailSender;

    @Autowired
    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendOtpEmail(String toEmail, String otp) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom("patilaniruddha.mail@gmail.com");
            mailMessage.setTo(toEmail);
            mailMessage.setSubject("Your One-Time Password (OTP) for BharatFix");
            mailMessage.setText("Dear User,\n\nYour One-Time Password (OTP) is: " + otp +
                                "\n\nThis OTP is valid for 5 minutes. Please do not share it with anyone." +
                                "\n\nRegards,\nBharatFix Team");

            javaMailSender.send(mailMessage);
            System.out.println("OTP email sent successfully to: " + toEmail);
        } catch (MailException e) {
            System.err.println("Failed to send OTP email to " + toEmail + ": " + e.getMessage());
            throw new RuntimeException("Failed to send OTP email", e);
        }
    }
}
