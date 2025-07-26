//package Compliant_System.CDAC;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//            .authorizeHttpRequests(authorize -> authorize
//                .requestMatchers(
//                    "/request-otp-page",
//                    "/request-otp",
//                    "/verify-otp-page",
//                    "/verify-otp",
//                    "/otp_success",
//                    "/login",
//                    "/css/**", "/js/**", "/images/**",
//                    "/WEB-INF/jsp/**",
//                    "/favicon.ico"
//                ).permitAll()
//                .anyRequest().authenticated()
//            )
//            .formLogin(form -> form
////                .loginPage("/login")
//                .permitAll()
//            )
//            .logout(logout -> logout
//                .permitAll());
//
//        return http.build();
//    }
//}
