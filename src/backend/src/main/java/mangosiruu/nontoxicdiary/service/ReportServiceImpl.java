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

    @Override
    @Transactional(readOnly = true)
    public ReportOutputDto getReport(int year, int month, Long userId) {
        UserInfo userInfo = userInfoRepository.findById(userId)
            .orElseThrow(
                () -> new IllegalArgumentException("존재하지 않는 사용자입니다. (id = " + userId + ")"));

        List<ToxicFood> toxicFoods = toxicFoodRepository.findByYearAndMonthAndUserInfo(year, month, userInfo);

        Map<FoodCategoryEnum, Long> sumCounts = toxicFoods.stream()
            .collect(Collectors.groupingBy(
                tf -> FoodCategoryEnum.valueOf(tf.getCategory().getFood()),
                Collectors.summingLong(ToxicFood::getCount)
            ));

        List<ToxicFoodDto> toxicFoodDtos = Stream.of(FoodCategoryEnum.values())
            .map(category -> ToxicFoodDto.builder()
                .name(category.getFoodName())
                .count(sumCounts.getOrDefault(category, 0L))
                .build())
            .sorted((dto1, dto2) -> Long.compare(dto2.getCount(), dto1.getCount()))
            .collect(Collectors.toList());

        return ReportOutputDto.builder()
            .year(year)
            .month(month)
            .toxicFoods(toxicFoodDtos)
            .build();
    }
}
