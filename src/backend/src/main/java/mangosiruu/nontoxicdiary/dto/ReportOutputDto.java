package mangosiruu.nontoxicdiary.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReportOutputDto {

    private String message;
    private ReportRecordDto reportRecord;
}
