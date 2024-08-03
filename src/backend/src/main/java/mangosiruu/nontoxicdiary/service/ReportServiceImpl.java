package mangosiruu.nontoxicdiary.service;

import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import mangosiruu.nontoxicdiary.dto.FoodCategoryEnum;
import mangosiruu.nontoxicdiary.dto.ReportOutputDto;
import mangosiruu.nontoxicdiary.dto.ToxicFoodDto;
import mangosiruu.nontoxicdiary.entity.ToxicFood;
import mangosiruu.nontoxicdiary.entity.UserInfo;
import mangosiruu.nontoxicdiary.repository.ToxicFoodRepository;
import mangosiruu.nontoxicdiary.repository.UserInfoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final ToxicFoodRepository toxicFoodRepository;
    private final UserInfoRepository userInfoRepository;

    /**
     * 월별 리포트 기능
     * @param year 리포트 해당 년
     * @param month 리포트 해당 월
     * @return 리포트 정보
     */
    @Override
    @Transactional(readOnly = true)
    public ReportOutputDto getReport(int year, int month, Long userId) {

        // UserInfo 가져오기
        UserInfo userInfo = userInfoRepository.findById(userId)
            .orElseThrow(
                () -> new IllegalArgumentException("존재하지 않는 사용자입니다. (id = " + userId + ")"));

        // ToxicFoods 가져오기
        List<ToxicFood> toxicFoods = toxicFoodRepository.findByYearAndMonthAndUserInfo(year, month, userInfo);

        // 카테고리별 월별 합계 더하기
        Map<FoodCategoryEnum, Long> sumCounts = toxicFoods.stream()
            .collect(Collectors.groupingBy(
                tf -> FoodCategoryEnum.valueOf(tf.getCategory().getFood()),
                Collectors.summingLong(ToxicFood::getCount)
            ));

        // DTO 변환
        List<ToxicFoodDto> toxicFoodDtos = Stream.of(FoodCategoryEnum.values())
            .map(category -> ToxicFoodDto.builder()
                .name(category.getFoodName())
                .count(sumCounts.getOrDefault(category, 0L))
                .build())
            .sorted((dto1, dto2) -> Long.compare(dto2.getCount(), dto1.getCount()))
            .collect(Collectors.toList());

        // 월별 리포트 정보 반환
        return ReportOutputDto.builder()
            .year(year)
            .month(month)
            .toxicFoods(toxicFoodDtos)
            .build();
    }
}
