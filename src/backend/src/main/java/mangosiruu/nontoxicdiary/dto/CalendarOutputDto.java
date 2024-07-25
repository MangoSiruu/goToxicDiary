package mangosiruu.nontoxicdiary.dto;

import java.time.LocalDate;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CalendarOutputDto {

    private LocalDate date;
    private List<ToxicFoodDto> toxicFoods;
}
