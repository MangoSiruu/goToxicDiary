package mangosiruu.nontoxicdiary.service;

import lombok.RequiredArgsConstructor;
import mangosiruu.nontoxicdiary.dto.ReportOutputDto;
import mangosiruu.nontoxicdiary.dto.ReportRecordDto;
import mangosiruu.nontoxicdiary.dto.ToxicFoodDto;
import mangosiruu.nontoxicdiary.entity.ToxicFood;
import mangosiruu.nontoxicdiary.repository.ToxicFoodRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final ToxicFoodRepository toxicFoodRepository;

    private static final List<String> CATEGORIES = Arrays.asList(
        "술", "인스턴트", "매운음식", "카페인", "야식", "액상과당", "기타"
    );

    @Transactional(readOnly = true)
    public ReportOutputDto getReport(int year, int month) {
        List<ToxicFood> toxicFoods = toxicFoodRepository.findByYearAndMonth(year, month);

        Map<String, Long> sumCounts = toxicFoods.stream()
            .collect(Collectors.groupingBy(tf -> tf.getCategory().getFood(),
                Collectors.summingLong(ToxicFood::getCount)));

        List<ToxicFoodDto> toxicFoodDtos = CATEGORIES.stream()
            .map(category -> new ToxicFoodDto(category, sumCounts.getOrDefault(category, 0L)))
            .sorted((dto1, dto2) -> Long.compare(dto2.getCount(), dto1.getCount()))
            .collect(Collectors.toList());

        ReportRecordDto reportRecordDto = new ReportRecordDto(year, month, toxicFoodDtos);

        return new ReportOutputDto("리포트 조회 성공", reportRecordDto);
    }

}
