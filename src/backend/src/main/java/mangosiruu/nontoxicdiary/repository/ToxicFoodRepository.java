package mangosiruu.nontoxicdiary.repository;

import java.util.List;
import mangosiruu.nontoxicdiary.entity.ToxicFood;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface ToxicFoodRepository extends JpaRepository<ToxicFood, Long> {

    void deleteByDate(LocalDate date);

    List<ToxicFood> findByDate(LocalDate date);

    List<ToxicFood> findByDateBetween(LocalDate startDate, LocalDate endDate);

    List<ToxicFood> findByDateBetweenAndCategoryFood(LocalDate startDate, LocalDate endDate,
        String filterCategory);

    @Query("SELECT tf FROM ToxicFood tf WHERE YEAR(tf.date) = :year AND MONTH(tf.date) = :month")
    List<ToxicFood> findByYearAndMonth(@Param("year") int year, @Param("month") int month);
}
