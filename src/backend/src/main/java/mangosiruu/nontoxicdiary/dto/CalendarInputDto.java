package mangosiruu.nontoxicdiary.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalendarInputDto {

    @NotNull
    private LocalDate date;

    @NotNull
    @Valid
    private List<ToxicFoodDto> toxicFoods;
}
