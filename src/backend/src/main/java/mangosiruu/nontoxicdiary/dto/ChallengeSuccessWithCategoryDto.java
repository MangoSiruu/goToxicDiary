package mangosiruu.nontoxicdiary.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChallengeSuccessWithCategoryDto {
    private String category;
    private boolean success;
}
