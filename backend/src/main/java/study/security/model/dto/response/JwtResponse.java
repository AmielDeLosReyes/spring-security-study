package study.security.model.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class JwtResponse {
    @JsonProperty("bearer_token")
    private String bearer_token;

    public JwtResponse(String bearer_token) {
        this.bearer_token = bearer_token;
    }

}
