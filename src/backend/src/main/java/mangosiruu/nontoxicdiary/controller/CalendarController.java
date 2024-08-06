package mangosiruu.nontoxicdiary.controller;

import io.swagger.annotations.ApiOperation;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import mangosiruu.nontoxicdiary.dto.CalendarInputDto;
import mangosiruu.nontoxicdiary.dto.CalendarListOutputDto;
import mangosiruu.nontoxicdiary.dto.CalendarOutputDto;
import mangosiruu.nontoxicdiary.exception.ResponseMap;
import mangosiruu.nontoxicdiary.exception.TokenException;
import mangosiruu.nontoxicdiary.security.UserDetailsImpl;
import mangosiruu.nontoxicdiary.service.CalendarService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/calendar")
@RequiredArgsConstructor
public class CalendarController {

    private final CalendarService calendarService;

    @ApiOperation("캘린더 등록")
    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public ResponseEntity<Map<String, Object>> saveToxicFoods(
        @Valid @RequestBody CalendarInputDto inputDto) {
        // Context 에서 principal 가져오기
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal != null && principal instanceof UserDetailsImpl) {
            Long userId = ((UserDetailsImpl) principal).getId();

            // 캘린더 등록
            CalendarOutputDto outputDto = calendarService.saveToxicFoods(inputDto, userId);
            // 응답 생성
            ResponseMap responseMap = new ResponseMap();
            responseMap.put("message", "섭취 기록 등록 성공");
            responseMap.put("dailyRecord", outputDto);

            return ResponseEntity.status(HttpStatus.CREATED).body(responseMap.getMap());
        } else {
            // 인증 정보가 없는 경우 등록 불가
            throw new TokenException(TokenException.TOKEN_ERROR.UNACCEPT);
        }

    }

    @ApiOperation("캘린더 조회(특정 날짜)")
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{date}")
    public ResponseEntity<Map<String, Object>> getToxicFoods(@PathVariable LocalDate date) {
        // Context 에서 principal 가져오기
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal != null && principal instanceof UserDetailsImpl) {
            Long userId = ((UserDetailsImpl) principal).getId();

            // 캘린더 조회
            CalendarOutputDto outputDto = calendarService.getToxicFoods(date, userId);
            // 응답 생성
            ResponseMap responseMap = new ResponseMap();
            responseMap.put("message", "섭취 기록 조회 성공");
            responseMap.put("dailyRecord", outputDto);

            return ResponseEntity.status(HttpStatus.OK).body(responseMap.getMap());
        } else {
            // 인증 정보가 없는 경우 조회 불가
            throw new TokenException(TokenException.TOKEN_ERROR.UNACCEPT);
        }

    }

    @ApiOperation("캘린더 조회(특정 기간)")
    @PreAuthorize("isAuthenticated()")
    @GetMapping
    public ResponseEntity<Map<String, Object>> getToxicFoodsByRange(
        @RequestParam(value = "start_date") LocalDate startDate,
        @RequestParam(value = "end_date") LocalDate endDate,
        @RequestParam(value = "filter_category") String filterCategory) {

        // Context 에서 principal 가져오기
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal != null && principal instanceof UserDetailsImpl) {
            Long userId = ((UserDetailsImpl) principal).getId();

            // 캘린더 조회
            List<CalendarListOutputDto> outputDto = calendarService.getToxicFoodsByRange(startDate,
                endDate, filterCategory, userId);
            // 응답 생성
            ResponseMap responseMap = new ResponseMap();
            responseMap.put("message", "섭취 기록 리스트 조회 성공");
            responseMap.put("dailyRecords", outputDto);

            return ResponseEntity.status(HttpStatus.OK).body(responseMap.getMap());
        } else {
            // 인증 정보가 없는 경우 조회 불가
            throw new TokenException(TokenException.TOKEN_ERROR.UNACCEPT);
        }

    }
}
