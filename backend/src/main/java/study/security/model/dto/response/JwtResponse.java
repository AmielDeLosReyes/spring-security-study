package study.security.model.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class JwtResponse {
    @JsonProperty("bearer_token")
    private String bearer_token;

    @JsonProperty("roles")
    private List<String> roles; // New field for user roles

    public JwtResponse(String bearer_token, List<String> roles) {
        this.bearer_token = bearer_token;
        this.roles = roles; // Set roles in the constructor
    }
}
