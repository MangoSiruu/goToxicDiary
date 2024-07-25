package mangosiruu.nontoxicdiary.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ToxicFoodDto {

    @NotBlank
    private String name;

    @NotNull
    @Min(value = 0, message = "0 이상의 값을 입력하셔야합니다.")
    private Long count;
}
