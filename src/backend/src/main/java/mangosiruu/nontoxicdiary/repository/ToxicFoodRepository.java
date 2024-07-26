package mangosiruu.nontoxicdiary.repository;

import mangosiruu.nontoxicdiary.entity.ToxicFood;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ToxicFoodRepository extends JpaRepository<ToxicFood, Long> {
    @Query("SELECT t.date " +
            "FROM ToxicFood t " +
            "WHERE t.userInfo.id=:userId " +
                "AND t.category.id=:categoryId " +
                "AND t.date BETWEEN :startDate AND :endDate " +
                "AND t.count > :maxCount")
    List<LocalDate> findChallengeFailedDates(@Param("userId") Long userId,
                                              @Param("categoryId") Long categoryId,
                                              @Param("startDate") LocalDate startDate,
                                              @Param("endDate") LocalDate endDate,
                                              @Param("maxCount") Long maxCount);
}
