package mangosiruu.nontoxicdiary.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReportOutputDto {

    private int year;
    private int month;
    private List<ToxicFoodDto> toxicFoods;
}
