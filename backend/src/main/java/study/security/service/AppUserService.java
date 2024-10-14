package study.security.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import study.security.model.entity.AppUser;
import study.security.model.entity.Token;
import study.security.repository.AppUserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@AllArgsConstructor
@Slf4j
public class AppUserService implements UserDetailsService {
    private final AppUserRepository appUserRepository;
    private final TokenService tokenService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final static String USER_NOT_FOUND_MSG = "user with email %s not found";

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return appUserRepository.findByEmail(email)
                .orElseThrow(()->
                        new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, email)));
    }
    public String signUpUser(AppUser appUser){
        log.info("===== inside signUpUser() =====");
        boolean userExists = appUserRepository.findByEmail((appUser.getEmail())).isPresent();
        if (userExists) {
            throw new IllegalStateException("User already exists");
        }
        String encodedPassword = bCryptPasswordEncoder.encode(appUser.getPassword());


        appUser.setPassword(encodedPassword);
        appUserRepository.save(appUser);

        String token = UUID.randomUUID().toString();
        Token confirmationToken = new Token(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(10),
                appUser
        );

        tokenService.saveConfirmationToken(confirmationToken);
        return token;
    }
    public int enableAppUser(String email) {
        return appUserRepository.enableAppUser(email);
    }
}
