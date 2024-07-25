package mangosiruu.nontoxicdiary.controller;

import jakarta.validation.Valid;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import mangosiruu.nontoxicdiary.dto.CalendarInputDto;
import mangosiruu.nontoxicdiary.dto.CalendarListOutputDto;
import mangosiruu.nontoxicdiary.dto.CalendarOutputDto;
import mangosiruu.nontoxicdiary.service.CalendarService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/calendar")
@RequiredArgsConstructor
public class CalendarController {

    private final CalendarService calendarService;

    @PostMapping
    public ResponseEntity<CalendarOutputDto> saveToxicFoods(
        @Valid @RequestBody CalendarInputDto inputDto) {

        CalendarOutputDto outputDto = calendarService.saveToxicFoods(inputDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(outputDto);
    }

    @GetMapping("/{date}")
    public ResponseEntity<CalendarOutputDto> getToxicFoods(@PathVariable LocalDate date) {
        CalendarOutputDto outputDto = calendarService.getToxicFoods(date);
        return ResponseEntity.status(HttpStatus.OK).body(outputDto);
    }

    @GetMapping
    public ResponseEntity<CalendarListOutputDto> getToxicFoodsByRange(
        @RequestParam(value = "start_date") LocalDate startDate,
        @RequestParam(value = "end_date") LocalDate endDate,
        @RequestParam(value = "filter_category") String filterCategory) {

        CalendarListOutputDto outputDto = calendarService.getToxicFoodsByRange(startDate, endDate,
            filterCategory);
        return ResponseEntity.status(HttpStatus.OK).body(outputDto);
    }
}
