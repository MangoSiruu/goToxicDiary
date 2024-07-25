package mangosiruu.nontoxicdiary.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalendarListOutputDto {

    private String message;
    private List<DailyRecordWithChallengeDto> dailyRecord;
}
