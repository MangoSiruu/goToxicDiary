package mangosiruu.nontoxicdiary.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PageRequestDto {
    @Builder.Default
    private int size=10;  // 페이지 사이즈
    private Long cursor;  // 커서
}
