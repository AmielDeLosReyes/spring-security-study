package study.security.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import study.security.model.dto.request.RegistrationRequest;
import study.security.model.entity.AppUser;
import study.security.model.entity.Token;
import study.security.model.entity.enums.AppUserRole;
import study.security.util.Email.EmailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
@Slf4j
public class RegistrationService {
    private final AppUserService appUserService;
    private final TokenService tokenService;
    private final EmailSender emailSender;

    public String register(RegistrationRequest request) {
        log.info("REGISTERING USER...");
        AppUser appUser = new AppUser(
                request.getFirstname(),
                request.getLastname(),
                request.getEmail(),
                request.getPassword(),
                AppUserRole.USER // hardcoded as USER for now but need to be dynamic for admin or user
        );

        String token = appUserService.signUpUser(appUser);
        String confirmationLink = "http://localhost:8080/registration/confirmation?token=" + token;

        //send the email.
        emailSender.send(request.getEmail(), buildEmail(request.getFirstname(), confirmationLink));

        return token;
    }
    @Transactional
    public String confirmToken(String token) {
        String loginLink = "http://localhost:4200/login";
        Token confirmationToken = tokenService
                .getToken(token)
                .orElseThrow(() ->
                        new IllegalStateException("token not found"));

        if (confirmationToken.getConfirmedAt() != null) {
            throw new IllegalStateException(buildConfirmedPage(loginLink,"Email already confirmed."));
        }

        LocalDateTime expiredAt = confirmationToken.getExpiresAt();

        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new IllegalStateException("token expired");
        }

        tokenService.setConfirmedAt(token);
        appUserService.enableAppUser(
                confirmationToken.getAppUser().getEmail());
        return buildConfirmedPage(loginLink,"Email Confirmed");
    }

    private String buildEmail(String name, String link) {
        return
                "<p> Hi " + name +
                ",</p>" +
                "<p> Thank you for registering. Please click on the below link to activate your account: </p>" +
                "<blockquote><p> <a href=\"" + link + "\">Activate Now</a> </p></blockquote>\n Link will expire in 10 minutes. <p>See you soon</p>";
    }
    private String buildConfirmedPage(String link, String message){
        return "<p> " + message + ". Please click on the below link to Login: </p>" +
                "<blockquote><p> <a href=\"" + link + "\">Login</a> </p>";
    }
}
