package mangosiruu.nontoxicdiary.service;

import mangosiruu.nontoxicdiary.dto.ReportOutputDto;
import org.springframework.transaction.annotation.Transactional;

public interface ReportService {

    ReportOutputDto getReport(int year, int month, Long userId);
}
