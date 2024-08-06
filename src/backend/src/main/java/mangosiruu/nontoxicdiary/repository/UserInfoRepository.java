package mangosiruu.nontoxicdiary.repository;

import mangosiruu.nontoxicdiary.entity.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserInfoRepository extends JpaRepository<UserInfo, Long> {
}