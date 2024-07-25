package mangosiruu.nontoxicdiary.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalendarOutputDto {

    private String message;
    private DailyRecordDto dailyRecord;
}
