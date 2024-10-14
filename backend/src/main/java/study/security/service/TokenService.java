package study.security.service;

import lombok.AllArgsConstructor;
import study.security.model.entity.Token;
import study.security.repository.TokenRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TokenService {
    private final TokenRepository tokenRepository;
    public void saveConfirmationToken(Token token) {
        tokenRepository.save(token);
    }
    public Optional<Token> getToken(String token) {
        return tokenRepository.findByToken(token);
    }

    public int setConfirmedAt(String token) {
        return tokenRepository.updateConfirmedAt(
                token, LocalDateTime.now());
    }
}
