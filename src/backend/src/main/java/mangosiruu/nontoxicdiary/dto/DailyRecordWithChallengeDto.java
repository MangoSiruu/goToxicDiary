package mangosiruu.nontoxicdiary.dto;

import java.time.LocalDate;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DailyRecordWithChallengeDto {

    private LocalDate date;
    private List<ToxicFoodDto> toxicFoods;
    private boolean challengeSuccess;
}
