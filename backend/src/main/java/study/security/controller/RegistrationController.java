package study.security.controller;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import study.security.model.dto.request.RegistrationRequest;
import study.security.service.RegistrationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping( "/registration")
@AllArgsConstructor
public class RegistrationController {

    private RegistrationService registrationService;
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping
    public ResponseEntity<Map<String, String>> register(@RequestBody @Valid RegistrationRequest request) {
        String token = registrationService.register(request);

        // Create a map to hold the token in JSON format
        Map<String, String> response = new HashMap<>();
        response.put("token", token);

        return ResponseEntity.ok(response);
    }
    @GetMapping("/confirmation")
    public ResponseEntity<String> confirm(@RequestParam("token") String token) {
        return ResponseEntity.ok(registrationService.confirmToken(token));
    }
}
