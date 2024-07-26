package mangosiruu.nontoxicdiary.repository;

import java.util.List;
import mangosiruu.nontoxicdiary.entity.ToxicFood;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;

public interface ToxicFoodRepository extends JpaRepository<ToxicFood, Long> {

    void deleteByDate(LocalDate date);

    List<ToxicFood> findByDate(LocalDate date);

    List<ToxicFood> findByDateBetween(LocalDate startDate, LocalDate endDate);

    List<ToxicFood> findByDateBetweenAndCategoryFood(LocalDate startDate, LocalDate endDate,
        String filterCategory);

    @Query("SELECT tf FROM ToxicFood tf WHERE YEAR(tf.date) = :year AND MONTH(tf.date) = :month")
    List<ToxicFood> findByYearAndMonth(@Param("year") int year, @Param("month") int month);
    
    
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
