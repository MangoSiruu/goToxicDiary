package mangosiruu.nontoxicdiary.service;

import lombok.RequiredArgsConstructor;
import mangosiruu.nontoxicdiary.dto.*;
import mangosiruu.nontoxicdiary.entity.FoodCategory;
import mangosiruu.nontoxicdiary.entity.ToxicFood;
import mangosiruu.nontoxicdiary.repository.FoodCategoryRepository;
import mangosiruu.nontoxicdiary.repository.ToxicFoodRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CalendarService {

    private final FoodCategoryRepository foodCategoryRepository;
    private final ToxicFoodRepository toxicFoodRepository;

    @Transactional
    public CalendarOutputDto saveToxicFoods(CalendarInputDto inputDto) {
        toxicFoodRepository.deleteByDate(inputDto.getDate());

        List<ToxicFood> toxicFoods = inputDto.getToxicFoods().stream()
            .filter(dto -> dto.getCount() > 0)
            .map(dto -> {
                FoodCategory category = foodCategoryRepository.findByFood(dto.getName());
                if (category == null) {
                    throw new IllegalArgumentException(dto.getName() + " 해당 카테고리는 존재하지 않습니다.");
                }
                return ToxicFood.builder()
                    .date(inputDto.getDate())
                    .category(category)
                    .count(dto.getCount())
                    .build();
            }).collect(Collectors.toList());

        toxicFoodRepository.saveAll(toxicFoods);

        List<ToxicFoodDto> toxicFoodDtos = toxicFoods.stream().map(tf -> new ToxicFoodDto(
            tf.getCategory().getFood(), tf.getCount()
        )).collect(Collectors.toList());

        DailyRecordDto dailyRecordDto = new DailyRecordDto(inputDto.getDate(), toxicFoodDtos);

        return new CalendarOutputDto("섭취 기록 등록 성공", dailyRecordDto);
    }
}
