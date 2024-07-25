package mangosiruu.nontoxicdiary.controller;

import lombok.RequiredArgsConstructor;
import mangosiruu.nontoxicdiary.dto.ReportOutputDto;
import mangosiruu.nontoxicdiary.service.ReportService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/report")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @GetMapping
    public ResponseEntity<ReportOutputDto> getReport(
        @RequestParam int year,
        @RequestParam int month) {

        ReportOutputDto outputDto = reportService.getReport(year, month);
        return ResponseEntity.status(HttpStatus.OK).body(outputDto);
    }
}
