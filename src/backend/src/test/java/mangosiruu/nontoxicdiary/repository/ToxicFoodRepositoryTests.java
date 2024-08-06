package mangosiruu.nontoxicdiary.repository;

import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;

@Log4j2
@SpringBootTest
public class ToxicFoodRepositoryTests {
    @Autowired
    private ToxicFoodRepository toxicFoodRepository;

    @Test
    public void testFindFailedDate(){
        Long userId=2L;
        Long categoryId=4L;
        LocalDate startDate=LocalDate.of(2024, 7, 18);
        LocalDate endDate=LocalDate.of(2024, 7, 24);
        Long maxCount=1L;
        List<LocalDate> successDates=toxicFoodRepository.findChallengeFailedDates(userId, categoryId, startDate, endDate, maxCount);
        log.info(successDates.size());
    }
}
