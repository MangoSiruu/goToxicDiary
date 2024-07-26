package mangosiruu.nontoxicdiary.service;

import mangosiruu.nontoxicdiary.dto.*;

public interface ChallengeService {
    int MIN_TITLE_LENGTH=1;
    int MAX_TITLE_LENGTH=100;

    Long register(ChallengeInputDto challengeInputDto, Long userId);
    ChallengeOutputWithSuccessDto read(Long challengeId);
    Long modify(Long challengeId, ChallengeUpdateDto challengeUpdateDto);
    void remove(Long challengeId);
    PageResponseDto<ChallengeOutputDto> readUnfinishedPage(PageRequestDto pageRequestDto, Long userId);
    PageResponseDto<ChallengeOutputDto> readFinishedPage(PageRequestDto pageRequestDto, Long userId);

    boolean isOwner(Long challengeId, Long userId);
}
