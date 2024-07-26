package mangosiruu.nontoxicdiary.controller;

import io.swagger.annotations.ApiOperation;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import mangosiruu.nontoxicdiary.dto.CalendarListOutputDto;
import mangosiruu.nontoxicdiary.dto.ReportOutputDto;
import mangosiruu.nontoxicdiary.exception.ResponseMap;
import mangosiruu.nontoxicdiary.exception.TokenException;
import mangosiruu.nontoxicdiary.security.UserDetailsImpl;
import mangosiruu.nontoxicdiary.service.ReportService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/report")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @ApiOperation("월별 리포트 조회")
    @PreAuthorize("isAuthenticated()")
    @GetMapping
    public ResponseEntity<Map<String, Object>> getReport(
        @RequestParam int year,
        @RequestParam int month) {

        // Context 에서 principal 가져오기
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal != null && principal instanceof UserDetailsImpl) {
            Long userId = ((UserDetailsImpl) principal).getId();

            // 월별 리포트 조회
            ReportOutputDto outputDto = reportService.getReport(year, month, userId);
            // 응답 생성
            ResponseMap responseMap = new ResponseMap();
            responseMap.put("message", "리포트 조회 성공");
            responseMap.put("reportRecord", outputDto);

            return ResponseEntity.status(HttpStatus.OK).body(responseMap.getMap());
        } else {
            // 인증 정보가 없는 경우 조회 불가
            throw new TokenException(TokenException.TOKEN_ERROR.UNACCEPT);
        }

    }
}
