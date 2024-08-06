package mangosiruu.nontoxicdiary.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import mangosiruu.nontoxicdiary.dto.*;
import mangosiruu.nontoxicdiary.entity.Challenge;
import mangosiruu.nontoxicdiary.entity.FoodCategory;
import mangosiruu.nontoxicdiary.entity.UserInfo;
import mangosiruu.nontoxicdiary.repository.ChallengeRepository;
import mangosiruu.nontoxicdiary.repository.FoodCategoryRepository;
import mangosiruu.nontoxicdiary.repository.ToxicFoodRepository;
import mangosiruu.nontoxicdiary.repository.UserInfoRepository;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Log4j2
@Service
@Transactional
@RequiredArgsConstructor
public class ChallengeServiceImpl implements ChallengeService {
    private final ChallengeRepository challengeRepository;
    private final UserInfoRepository userInfoRepository;
    private final FoodCategoryRepository foodCategoryRepository;
    private final ToxicFoodRepository toxicFoodRepository;
    private final ModelMapper modelMapper;

    /**
     * 챌린지 등록
     * @param challengeInputDto 챌린지 입력 정보
     * @return 생성된 챌린지 ID
     */
    @Override
    public Long register(ChallengeInputDto challengeInputDto, Long userId){
        // UserInfo 가져오기
        UserInfo userInfo=userInfoRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 사용자입니다. (id = " + userId + ")"));

        // FoodCategory 가져오기
        FoodCategory category=foodCategoryRepository.findByFood(challengeInputDto.getCategory())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 카테고리입니다. (category = "+challengeInputDto.getCategory() + ")"));

        // Challenge 엔티티 생성
        Challenge challenge=Challenge.builder()
                .title(challengeInputDto.getTitle())
                .userInfo(userInfo)
                .category(category)
                .startDate(challengeInputDto.getStartDate())
                .endDate(challengeInputDto.getEndDate())
                .maxCount(challengeInputDto.getMaxCount())
                .build();

        // DB에 저장
        Challenge result=challengeRepository.save(challenge);

        // 리소스 ID 반환
        return result.getId();
    }

    /**
     * 특정 챌린지 조회
     * @param challengeId 챌린지 ID
     * @return 챌린지 정보
     */
    @Override
    public ChallengeOutputWithSuccessDto read(Long challengeId){
        // Challenge 가져오기
        Challenge challenge=challengeRepository.findById(challengeId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 챌린지입니다. (id = "+challengeId+")"));

        // ToxicFood에서 챌린지 기간 동안 섭취 회수를 지켰는지 성공 여부 확인
        Long userId=challenge.getUserInfo().getId();
        Long categoryId=challenge.getCategory().getId();
        LocalDate startDate=challenge.getStartDate();
        LocalDate endDate=challenge.getEndDate();
        Long maxCount=challenge.getMaxCount();

        // 특정 유저가 특정 기간 동안에 특정 카테고리에 대해서 먹은 회수 중 제한 개수보다 작거나 같은 행 조회
        List<LocalDate> failedDates=toxicFoodRepository.findChallengeFailedDates(userId, categoryId, startDate, endDate, maxCount);
        List<ChallengeSuccessWithDateDto> successes=new LinkedList<>();

        // (시작일 ~ 어제)까지의 챌린지 성공 목록 생성
        int successCount=0;
        LocalDate yesterday=LocalDate.now().minusDays(1);
        for(LocalDate date=startDate; !date.isAfter(endDate) && !date.isAfter(yesterday); date=date.plusDays(1)){
            // 성공 회수 계산
            boolean success=!failedDates.contains(date);
            if(success) successCount++;

            // 성공 목록에 ChallengeSuccessDto 추가
            successes.add(ChallengeSuccessWithDateDto.builder()
                    .success(success)
                    .date(date)
                    .build());
        }

        // 달성률 계산
        long total=ChronoUnit.DAYS.between(startDate, endDate) + 1;
        int progress=(int)(((double)successCount/total) * 100);

        // DTO 변환
        ChallengeOutputWithSuccessDto challengeOutputWithSuccessDto=modelMapper.map(challenge, ChallengeOutputWithSuccessDto.class);
        challengeOutputWithSuccessDto.setCategory(challenge.getCategory().getFood());
        challengeOutputWithSuccessDto.setProgress(progress);
        challengeOutputWithSuccessDto.setSuccesses(successes);

        return challengeOutputWithSuccessDto;
    }

    /**
     * 챌린지 수정
     * @param challengeId 챌린지 ID
     * @param challengeUpdateDto 챌린지 수정 사항
     * @return 수정한 챌린지 ID
     */
    @Override
    public Long modify(Long challengeId, ChallengeUpdateDto challengeUpdateDto){
        // 기존 Challenge 엔티티 가져오기
        Challenge challenge=challengeRepository.findById(challengeId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 챌린지입니다. (id = " + challengeId + ")"));

        // 엔티티 수정하기
        challenge.changeTitle(challengeUpdateDto.getTitle());

        // DB에 적용
        Challenge result=challengeRepository.save(challenge);

        // 리소스 ID 반환
        return result.getId();
    }

    /**
     * 챌린지 삭제
     * @param challengeId 챌린지 ID
     */
    @Override
    public void remove(Long challengeId){
        // DB에서 제거
        challengeRepository.deleteById(challengeId);
    }

    /**
     * 진행 중인 챌린지 목록 조회
     * @param pageRequestDto 페이지 요청 정보
     * @return 진행 중인 챌린지 목록
     */
    @Override
    public PageResponseDto<ChallengeOutputDto> readUnfinishedPage(PageRequestDto pageRequestDto, Long userId){
        // 다음 페이지 존재 여부를 확인하기 위해 (size + 1)
        int pageSize=pageRequestDto.getSize()+1;
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        Pageable pageable = PageRequest.of(0, pageSize, sort);
        Long cursor= pageRequestDto.getCursor();
        LocalDate today=LocalDate.now();

        // 진행 중인 Challenge 목록 가져오기
        List<Challenge> challenges=challengeRepository.findUnfinishedChallenges(cursor, today, userId, pageable);

        // hasNext 계산
        boolean hasNext=false;
        if(challenges.size()>pageRequestDto.getSize()){
            challenges.remove(challenges.size() - 1);
            hasNext=true;
        }

        // Dto 변환
        List<ChallengeOutputDto> challengeOutputDtos=challenges.stream().map(challenge -> {
            ChallengeOutputDto challengeOutputDto=modelMapper.map(challenge, ChallengeOutputDto.class);
            challengeOutputDto.setCategory(challenge.getCategory().getFood());
            return challengeOutputDto;
        }).collect(Collectors.toList());

        // PageResponseDto 구성
        PageResponseDto<ChallengeOutputDto> pageResponseDto=PageResponseDto.<ChallengeOutputDto>builder()
                .content(challengeOutputDtos)
                .hasNext(hasNext)
                .build();

        return pageResponseDto;
    }

    /**
     * 완료된 챌린지 목록 조회
     * @param pageRequestDto 페이지 요청 정보
     * @return 완료된 챌린지 목록
     */
    @Override
    public PageResponseDto<ChallengeOutputDto> readFinishedPage(PageRequestDto pageRequestDto, Long userId){
        // 다음 페이지 존재 여부를 확인하기 위해 (size + 1)
        int pageSize=pageRequestDto.getSize()+1;
        Sort sort = Sort.by(Sort.Direction.DESC, "id");
        Pageable pageable = PageRequest.of(0, pageSize, sort);
        Long cursor= pageRequestDto.getCursor();
        LocalDate today=LocalDate.now();

        // 완료된 Challenge 목록 가져오기
        List<Challenge> challenges=challengeRepository.findFinishedChallenges(cursor, today, userId, pageable);

        // hasNext 계산
        boolean hasNext=false;
        if(challenges.size()>pageRequestDto.getSize()){
            challenges.remove(challenges.size() - 1);
            hasNext=true;
        }

        // Dto 변환
        List<ChallengeOutputDto> challengeOutputDtos=challenges.stream().map(challenge -> {
            ChallengeOutputDto challengeOutputDto=modelMapper.map(challenge, ChallengeOutputDto.class);
            challengeOutputDto.setCategory(challenge.getCategory().getFood());
            return challengeOutputDto;
        }).collect(Collectors.toList());

        // PageResponseDto 구성
        PageResponseDto<ChallengeOutputDto> pageResponseDto=PageResponseDto.<ChallengeOutputDto>builder()
                .content(challengeOutputDtos)
                .hasNext(hasNext)
                .build();

        return pageResponseDto;
    }

    /**
     * 특정 사용자가 챌린지의 소유자가 맞는지 확인
     * @param challengeId 챌린지 ID
     * @param userId 사용자 ID
     * @return
     */
    @Override
    public boolean isOwner(Long challengeId, Long userId){
        // Challenge 가져오기
        Challenge challenge=challengeRepository.findById(challengeId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 챌린지입니다. (id = "+challengeId+")"));

        // 소유자가 맞는지 여부 반환
        return challenge.getUserInfo().getId() == userId;
    }
}
