package mangosiruu.nontoxicdiary.service;

import lombok.extern.log4j.Log4j2;
import mangosiruu.nontoxicdiary.dto.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;

@Log4j2
@SpringBootTest
public class ChallengeServiceTests {
    @Autowired
    private ChallengeService challengeService;

    @Test
    public void testRegister(){
        for(int i=0;i<15;i++){
            Long userId=2L;
            ChallengeInputDto challengeInputDto=ChallengeInputDto.builder()
                    .title("카페인 끊기 ("+i+")")
                    .category("카페인")
                    .startDate(LocalDate.of(2024, 7, 18))
                    .endDate(LocalDate.of(2024, 7, 27))
                    .maxCount(1L)
                    .build();
            Long result=challengeService.register(challengeInputDto, userId);
        }
    }

    @Test
    public void testRead(){
        Long challengeId=2L;
        ChallengeOutputWithSuccessDto result=challengeService.read(challengeId);
        log.info(result);
    }

    @Test
    public void testModify(){
        ChallengeUpdateDto challengeUpdateDto=ChallengeUpdateDto.builder()
                .title("카페인 끊기")
                .build();
        Long challengeId=1L;
        Long result=challengeService.modify(challengeId, challengeUpdateDto);
        log.info(result);
    }

    @Test
    public void testDelete(){
        Long challengeId=1L;
        challengeService.remove(challengeId);
    }

    @Test
    public void testReadUnFinishedPage(){
        Long userId=2L;
        Long cursor=23L;
        PageRequestDto pageRequestDto=PageRequestDto.builder().cursor(cursor).build();
        PageResponseDto<ChallengeOutputDto> result=challengeService.readUnfinishedPage(pageRequestDto, userId);

        log.info("hasNext: "+result.isHasNext());
        result.getContent().forEach(challengeOutputDto -> {
            log.info(challengeOutputDto);
        });
    }

    @Test
    public void testReadFinishedPage(){
        Long userId=2L;
        Long cursor=8L;
        PageRequestDto pageRequestDto=PageRequestDto.builder().cursor(cursor).build();
        PageResponseDto<ChallengeOutputDto> result=challengeService.readFinishedPage(pageRequestDto, userId);

        log.info("hasNext: "+result.isHasNext());
        result.getContent().forEach(challengeOutputDto -> {
            log.info(challengeOutputDto);
        });
    }
}
