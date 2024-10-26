package study.security.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import study.security.config.security.JwtUtil;
import study.security.model.dto.request.LoginRequest;
import study.security.model.dto.response.JwtResponse;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.security.core.GrantedAuthority;

@Service
@AllArgsConstructor
@Slf4j
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final AppUserService appUserService;
    private final JwtUtil jwtUtil;

    public JwtResponse login(LoginRequest loginRequest) {
        log.info("===== Inside login() =====");
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String jwtToken = jwtUtil.generateToken(userDetails);

        // Get user roles
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        // Return JWT response with token and roles
        return new JwtResponse(jwtToken, roles);
    }
}
