package study.security.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import study.security.model.dto.request.LoginRequest;
import study.security.model.dto.response.JwtResponse;
import study.security.service.AuthService;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody LoginRequest loginRequest) {
        String jwtToken = authService.login(loginRequest);

        JwtResponse jwtResponse = new JwtResponse(jwtToken);

        return ResponseEntity.ok(jwtResponse);
    }
}
