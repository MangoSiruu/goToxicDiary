package mangosiruu.nontoxicdiary.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChallengeOutputDto {
    private Long id;
    private String title;
    private String category;
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate endDate;
}
