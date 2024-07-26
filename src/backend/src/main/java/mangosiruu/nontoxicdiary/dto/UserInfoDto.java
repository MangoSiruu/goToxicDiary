package mangosiruu.nontoxicdiary.dto;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import mangosiruu.nontoxicdiary.service.UserInfoService;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoDto {
    private String id;
    @Size(min = UserInfoService.MIN_NICKNAME_LENGTH, max = UserInfoService.MAX_NICKNAME_LENGTH)
    private String nickname;
}

