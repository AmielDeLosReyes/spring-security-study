package study.security.model.dto.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class RegistrationRequest {
    @NotNull
    @JsonProperty("firstname")
    private String firstname;

    @NotNull
    @JsonProperty("lastname")
    private String lastname;

    @NotNull
    @Size(min = 8)
    @JsonProperty("password")
    private String password;

    @NotNull
    @Email
    @JsonProperty("email")
    private String email;
}
