package mangosiruu.nontoxicdiary.dto;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import mangosiruu.nontoxicdiary.service.ChallengeService;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChallengeUpdateDto {
    @Size(min=ChallengeService.MIN_TITLE_LENGTH, max= ChallengeService.MAX_TITLE_LENGTH)
    private String title;
}
