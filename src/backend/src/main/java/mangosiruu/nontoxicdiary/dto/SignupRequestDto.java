package mangosiruu.nontoxicdiary.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import mangosiruu.nontoxicdiary.service.UserInfoService;
import mangosiruu.nontoxicdiary.service.UserService;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignupRequestDto {
    @NotBlank
    @Size(min= UserService.MIN_USERNAME_LENGTH, max=UserService.MAX_USERNAME_LENGTH)
    private String username;
    @NotBlank
    @Size(min=UserService.MIN_PASSWORD_LENGTH, max=UserService.MAX_PASSWORD_LENGTH)
    private String password;
    @NotBlank
    @Size(min= UserInfoService.MIN_NICKNAME_LENGTH, max=UserInfoService.MAX_NICKNAME_LENGTH)
    private String nickname;
}