package mangosiruu.nontoxicdiary.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Map;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import mangosiruu.nontoxicdiary.dto.*;
import mangosiruu.nontoxicdiary.entity.Challenge;
import mangosiruu.nontoxicdiary.entity.FoodCategory;
import mangosiruu.nontoxicdiary.entity.ToxicFood;
import mangosiruu.nontoxicdiary.repository.ChallengeRepository;
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
    private final ChallengeRepository challengeRepository;

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

    @Transactional(readOnly = true)
    public CalendarOutputDto getToxicFoods(LocalDate date) {
        List<ToxicFood> toxicFoods = toxicFoodRepository.findByDate(date);

        List<ToxicFoodDto> toxicFoodDtos = toxicFoods.stream().map(tf -> new ToxicFoodDto(
            tf.getCategory().getFood(), tf.getCount()
        )).collect(Collectors.toList());

        DailyRecordDto dailyRecordDto = new DailyRecordDto(date, toxicFoodDtos);

        return new CalendarOutputDto("섭취 기록 조회 성공", dailyRecordDto);
    }

    @Transactional(readOnly = true)
    public CalendarListOutputDto getToxicFoodsByRange(LocalDate startDate, LocalDate endDate,
        String filterCategory) {
        LocalDate today = LocalDate.now();
        List<ToxicFood> toxicFoods;

        if (filterCategory.equals("전체")) {
            toxicFoods = toxicFoodRepository.findByDateBetween(startDate, endDate);
        } else {
            toxicFoods = toxicFoodRepository.findByDateBetweenAndCategoryFood(startDate, endDate,
                filterCategory);
        }

        List<LocalDate> datesInRange = startDate.datesUntil(endDate.plusDays(1)).toList();

        Map<LocalDate, List<ToxicFood>> groupedToxicFoods = toxicFoods.stream()
            .collect(Collectors.groupingBy(ToxicFood::getDate));

        List<DailyRecordWithChallengeDto> dailyRecordChallengeDtos = datesInRange.stream()
            .map(date -> {
                List<ToxicFoodDto> toxicFoodDtos = groupedToxicFoods.getOrDefault(date,
                        new ArrayList<>()).stream()
                    .map(tf -> new ToxicFoodDto(tf.getCategory().getFood(), tf.getCount()))
                    .collect(Collectors.toList());

                boolean isChallengeSuccessful = determineChallengeSuccess(date, today,
                    groupedToxicFoods);

                return new DailyRecordWithChallengeDto(date, toxicFoodDtos, isChallengeSuccessful);
            })
            .collect(Collectors.toList());

        return new CalendarListOutputDto("섭취 기록 리스트 조회 성공", dailyRecordChallengeDtos);
    }

    private boolean determineChallengeSuccess(LocalDate date, LocalDate today,
        Map<LocalDate, List<ToxicFood>> groupedToxicFoods) {
        if (date.isAfter(today)) {
            return false;
        }

        List<Challenge> validChallenges = challengeRepository.findChallengesForDate(date);
        if (validChallenges.isEmpty()) {
            return false;
        }

        Set<Long> toxicFoodCategoryIds = groupedToxicFoods.getOrDefault(date, new ArrayList<>())
            .stream()
            .map(tf -> tf.getCategory().getId())
            .collect(Collectors.toSet());

        return validChallenges.stream()
            .noneMatch(challenge -> toxicFoodCategoryIds.contains(challenge.getCategory().getId()));
    }
}
