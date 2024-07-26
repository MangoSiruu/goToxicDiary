package mangosiruu.nontoxicdiary.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import mangosiruu.nontoxicdiary.service.ChallengeService;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChallengeInputDto {
    @NotBlank
    @Size(min=ChallengeService.MIN_TITLE_LENGTH, max= ChallengeService.MAX_TITLE_LENGTH)
    private String title;
    @NotBlank
    private String category;
    private LocalDate startDate;
    private LocalDate endDate;
    @Min(0)
    private Long maxCount;
}
