package mangosiruu.nontoxicdiary.controller;

import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import mangosiruu.nontoxicdiary.dto.CalendarInputDto;
import mangosiruu.nontoxicdiary.dto.CalendarListOutputDto;
import mangosiruu.nontoxicdiary.dto.CalendarOutputDto;
import mangosiruu.nontoxicdiary.exception.ResponseMap;
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
    public ResponseEntity<Map<String, Object>> saveToxicFoods(
        @Valid @RequestBody CalendarInputDto inputDto) {

        CalendarOutputDto outputDto = calendarService.saveToxicFoods(inputDto);

        ResponseMap responseMap = new ResponseMap();
        responseMap.put("message", "섭취 기록 등록 성공");
        responseMap.put("dailyRecord", outputDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(responseMap.getMap());
    }

    @GetMapping("/{date}")
    public ResponseEntity<Map<String, Object>> getToxicFoods(@PathVariable LocalDate date) {

        CalendarOutputDto outputDto = calendarService.getToxicFoods(date);

        ResponseMap responseMap = new ResponseMap();
        responseMap.put("message", "섭취 기록 조회 성공");
        responseMap.put("dailyRecord", outputDto);

        return ResponseEntity.status(HttpStatus.OK).body(responseMap.getMap());
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getToxicFoodsByRange(
        @RequestParam(value = "start_date") LocalDate startDate,
        @RequestParam(value = "end_date") LocalDate endDate,
        @RequestParam(value = "filter_category") String filterCategory) {

        List<CalendarListOutputDto> outputDto = calendarService.getToxicFoodsByRange(startDate, endDate,
            filterCategory);

        ResponseMap responseMap = new ResponseMap();
        responseMap.put("message", "섭취 기록 리스트 조회 성공");
        responseMap.put("dailyRecords", outputDto);

        return ResponseEntity.status(HttpStatus.OK).body(responseMap.getMap());
    }
}
