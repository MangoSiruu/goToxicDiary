package mangosiruu.nontoxicdiary.repository;

import mangosiruu.nontoxicdiary.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    void deleteByToken(String token);
    boolean existsByToken(String token);
}
