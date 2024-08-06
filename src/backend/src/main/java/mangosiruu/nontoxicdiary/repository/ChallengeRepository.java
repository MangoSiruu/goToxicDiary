package mangosiruu.nontoxicdiary.repository;

import mangosiruu.nontoxicdiary.entity.Challenge;
import mangosiruu.nontoxicdiary.entity.UserInfo;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
    @Query("SELECT c " +
            "FROM Challenge c " +
            "WHERE (:cursor IS NULL OR c.id < :cursor) " +
                "AND c.endDate >= :today " +
                "AND c.userInfo.id = :userId")
    List<Challenge> findUnfinishedChallenges(@Param("cursor") Long cursor,
                                             @Param("today") LocalDate today,
                                             @Param("userId") Long userId,
                                             Pageable pageable);

    @Query("SELECT c " +
            "FROM Challenge c " +
            "WHERE (:cursor IS NULL OR c.id < :cursor) " +
                "AND c.endDate < :today " +
                "AND c.userInfo.id = :userId")
    List<Challenge> findFinishedChallenges(@Param("cursor") Long cursor,
                                           @Param("today") LocalDate today,
                                           @Param("userId") Long userId,
                                           Pageable pageable);

    @Query("SELECT c FROM Challenge c WHERE c.startDate <= :date AND c.endDate >= :date AND c.userInfo = :userInfo")
    List<Challenge> findChallengesForDateAndUserInfo(@Param("date") LocalDate date, @Param("userInfo") UserInfo userInfo);
}
