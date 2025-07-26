package Compliant_System.CDAC.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import Compliant_System.CDAC.services.EmailService;
import Compliant_System.CDAC.services.OtpGenerator;

@Controller
public class OtpController {

    private final EmailService emailService;
    private static final java.util.Map<String, String> otpStore = new java.util.concurrent.ConcurrentHashMap<>();

    @Autowired
    public OtpController(EmailService emailService) {
        this.emailService = emailService;
    }

    @GetMapping("/request-otp-page")
    public String showRequestOtpPage() {
        return "request_otp";
    }

    @PostMapping("/request-otp")
    public String requestOtp(@RequestParam String email, RedirectAttributes redirectAttributes) {
        String otp = OtpGenerator.generateOtp();

        otpStore.put(email, otp);

        try {
            emailService.sendOtpEmail(email, otp);
            redirectAttributes.addFlashAttribute("email", email);
            redirectAttributes.addFlashAttribute("message", "OTP sent successfully to " + email + ". Please check your inbox.");

            return "redirect:/verify-otp-page";
        } catch (RuntimeException e) {
            redirectAttributes.addFlashAttribute("error", "Failed to send OTP: " + e.getMessage());
            return "redirect:/request-otp-page";
        }
    }

    @GetMapping("/verify-otp-page")
    public String showVerifyOtpPage(Model model) {
        return "verify_otp";
    }


    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestParam String email, @RequestParam String enteredOtp, Model model) {
        String storedOtp = otpStore.get(email);

        if (storedOtp != null && storedOtp.equals(enteredOtp)) {
            otpStore.remove(email);
            model.addAttribute("success", "OTP verified successfully!");
            return "otp_success";
        } else {
            model.addAttribute("email", email);
            model.addAttribute("error", "Invalid or expired OTP. Please try again or request a new OTP.");
            return "verify_otp";
        }
    }
}
