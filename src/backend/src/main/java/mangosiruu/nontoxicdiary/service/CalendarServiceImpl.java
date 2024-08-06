package mangosiruu.nontoxicdiary.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import mangosiruu.nontoxicdiary.dto.*;
import mangosiruu.nontoxicdiary.entity.Challenge;
import mangosiruu.nontoxicdiary.entity.FoodCategory;
import mangosiruu.nontoxicdiary.entity.ToxicFood;
import mangosiruu.nontoxicdiary.entity.UserInfo;
import mangosiruu.nontoxicdiary.repository.ChallengeRepository;
import mangosiruu.nontoxicdiary.repository.FoodCategoryRepository;
import mangosiruu.nontoxicdiary.repository.ToxicFoodRepository;
import mangosiruu.nontoxicdiary.repository.UserInfoRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService {

    private final FoodCategoryRepository foodCategoryRepository;
    private final ToxicFoodRepository toxicFoodRepository;
    private final ChallengeRepository challengeRepository;
    private final UserInfoRepository userInfoRepository;
    private final ModelMapper modelMapper;

    /**
     * 캘린더 등록 기능
     * @param inputDto 캘린더 등록 정보
     * @return 등록한 캘린더 정보
     */
    @Override
    @Transactional
    public CalendarOutputDto saveToxicFoods(CalendarInputDto inputDto, Long userId) {

        // UserInfo 가져오기
        UserInfo userInfo = userInfoRepository.findById(userId)
            .orElseThrow(
                () -> new IllegalArgumentException("존재하지 않는 사용자입니다. (id = " + userId + ")"));

        // 해당 날짜의 섭취 기록 삭제
        toxicFoodRepository.deleteByDateAndUserInfo(inputDto.getDate(), userInfo);

        // ToxicFoods 엔티티 리스트 생성
        List<ToxicFood> toxicFoods = inputDto.getToxicFoods().stream()
            .filter(dto -> dto.getCount() > 0)
            .map(dto -> {
                // FoodCategory가 존재하는지 확인
                FoodCategory category = foodCategoryRepository.findByFood(dto.getName())
                    .orElseThrow(
                        () -> new IllegalArgumentException(dto.getName() + " 해당 카테고리는 존재하지 않습니다."));
                return ToxicFood.builder()
                    .date(inputDto.getDate())
                    .userInfo(userInfo)
                    .category(category)
                    .count(dto.getCount())
                    .build();
            }).collect(Collectors.toList());

        // ToxicFoods 엔티티 리스트 DB에 저장
        toxicFoodRepository.saveAll(toxicFoods);

        // ToxicFoods 엔티티 DTO로 변환
        List<ToxicFoodDto> toxicFoodDtos = toxicFoods.stream()
            .map(tf -> modelMapper.map(tf, ToxicFoodDto.class))
            .collect(Collectors.toList());

        // 등록한 캘린더 정보 반환
        return CalendarOutputDto.builder()
            .date(inputDto.getDate())
            .toxicFoods(toxicFoodDtos)
            .build();
    }

    /**
     * 캘린더 조회(특정 날짜) 기능
     * @param date 조회하고자 하는 날짜
     * @return 특정 날짜에 섭취 기록 정보
     */
    @Override
    @Transactional(readOnly = true)
    public CalendarOutputDto getToxicFoods(LocalDate date, Long userId) {

        // UserInfo 가져오기
        UserInfo userInfo = userInfoRepository.findById(userId)
            .orElseThrow(
                () -> new IllegalArgumentException("존재하지 않는 사용자입니다. (id = " + userId + ")"));

        // 특정 날짜로 등록된 섭취 정보 받아오기
        List<ToxicFood> toxicFoods = toxicFoodRepository.findByDateAndUserInfo(date, userInfo);

        // ToxicFoods 엔티티 DTO로 변환
        List<ToxicFoodDto> toxicFoodDtos = toxicFoods.stream()
            .map(tf -> modelMapper.map(tf, ToxicFoodDto.class))
            .collect(Collectors.toList());

        // 특정 날짜에 섭취 기록 정보 반환
        return CalendarOutputDto.builder()
            .date(date)
            .toxicFoods(toxicFoodDtos)
            .build();
    }

    /**
     * 캘린더 조회(특정 기간) 기능
     * @param startDate 조회 시작 날짜
     * @param endDate 조회 마지막 날짜
     * @param filterCategory 필터링에 쓰일 카테고리명
     * @return 특정 기간에 섭취 기록 정보와 챌린지 성공 여부 정보
     */
    @Override
    @Transactional(readOnly = true)
    public List<CalendarListOutputDto> getToxicFoodsByRange(LocalDate startDate, LocalDate endDate,
        String filterCategory, Long userId) {

        // UserInfo 가져오기
        UserInfo userInfo = userInfoRepository.findById(userId)
            .orElseThrow(
                () -> new IllegalArgumentException("존재하지 않는 사용자입니다. (id = " + userId + ")"));

        LocalDate today = LocalDate.now();
        List<ToxicFood> toxicFoods;

        // 카테고리 필터링해서 섭취 정보 가져오기
        if (filterCategory.equals("전체")) {
            toxicFoods = toxicFoodRepository.findByDateBetweenAndUserInfo(startDate, endDate, userInfo);
        } else {
            toxicFoods = toxicFoodRepository.findByDateBetweenAndCategoryFoodAndUserInfo(startDate, endDate,
                filterCategory, userInfo);
        }

        // 특정 기간만큼 리스트 만들기
        List<LocalDate> datesInRange = startDate.datesUntil(endDate.plusDays(1)).toList();

        // 특정 일자와 해당 일자에 섭취한 음식 map
        Map<LocalDate, List<ToxicFood>> groupedToxicFoods = toxicFoods.stream()
            .collect(Collectors.groupingBy(ToxicFood::getDate));

        // CalendarListOutputDto 리스트 생성
        List<CalendarListOutputDto> calendarListOutputDtos = datesInRange.stream()
            .map(date -> {

                // 해당 날짜에 ToxicFoods 엔티티 DTO로 변환
                List<ToxicFoodDto> toxicFoodDtos = groupedToxicFoods
                    .getOrDefault(date, new ArrayList<>()).stream()
                    .map(tf -> ToxicFoodDto.builder()
                        .name(tf.getCategory().getFood())
                        .count(tf.getCount())
                        .build())
                    .collect(Collectors.toList());

                // 챌린지 성공 여부 반환
                List<ChallengeSuccessWithCategoryDto> challengeSuccess = determineChallengeSuccess(date, today,
                    groupedToxicFoods, userInfo);

                // CalendarListOutputDto 생성
                return CalendarListOutputDto.builder()
                    .date(date)
                    .toxicFoods(toxicFoodDtos)
                    .challengeSuccess(challengeSuccess)
                    .build();
            })
            .collect(Collectors.toList());

        // 특정 기간에 섭취 기록 정보와 챌린지 성공 여부 정보 반환
        return calendarListOutputDtos;
    }

    /**
     * 해당 날짜에 챌린지 성공 여부 반환하는 함수
     * @param date 챌린지를 조회할 해당 날짜
     * @param today 조회한 당일
     * @param groupedToxicFoods 특정 일자와 해당 일자에 섭취한 음식 map
     * @return 챌린지 성공 여부 리스트
     */
    private List<ChallengeSuccessWithCategoryDto> determineChallengeSuccess(LocalDate date, LocalDate today,
        Map<LocalDate, List<ToxicFood>> groupedToxicFoods, UserInfo userInfo) {

        // 조회할 해당 날짜가 조회한 당일보다 이후라면 빈 리스트 반환
        if (date.isAfter(today)) {
            return new ArrayList<>();
        }

        // 챌린지를 조회할 해당 날짜에 존재하는 챌린지 리스트 받아오기
        List<Challenge> validChallenges = challengeRepository.findChallengesForDateAndUserInfo(date, userInfo);
        if (validChallenges.isEmpty()) {
            return new ArrayList<>();
        }

        // 해당 날짜에 카테고리 ID별 섭취 횟수 map
        Map<Long, Long> toxicFoodCountByCategory = groupedToxicFoods.getOrDefault(date, new ArrayList<>())
            .stream()
            .collect(Collectors.groupingBy(tf -> tf.getCategory().getId(), Collectors.summingLong(ToxicFood::getCount)));

        // 챌린지 성공 실패 여부 반환
        List<ChallengeSuccessWithCategoryDto> challengeSuccessList = new ArrayList<>();
        for (Challenge challenge : validChallenges) {
            Long toxicFoodCount = toxicFoodCountByCategory.get(challenge.getCategory().getId());
            boolean success = toxicFoodCount == null || toxicFoodCount <= challenge.getMaxCount();
            challengeSuccessList.add(new ChallengeSuccessWithCategoryDto(challenge.getCategory().getFood(), success));
        }

        return challengeSuccessList;
    }
}
