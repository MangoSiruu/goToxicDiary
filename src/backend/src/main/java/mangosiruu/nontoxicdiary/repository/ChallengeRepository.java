package mangosiruu.nontoxicdiary.repository;

import java.time.LocalDate;
import java.util.List;
import mangosiruu.nontoxicdiary.entity.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ChallengeRepository extends JpaRepository<Challenge, Long> {

    @Query("SELECT c FROM Challenge c WHERE c.startDate <= :date AND c.endDate >= :date")
    List<Challenge> findChallengesForDate(@Param("date") LocalDate date);
}
