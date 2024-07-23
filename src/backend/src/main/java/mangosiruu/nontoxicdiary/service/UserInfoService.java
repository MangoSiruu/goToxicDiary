package mangosiruu.nontoxicdiary.service;

import mangosiruu.nontoxicdiary.dto.UserInfoDto;

public interface UserInfoService {
    int MIN_NICKNAME_LENGTH=2;
    int MAX_NICKNAME_LENGTH=10;

    UserInfoDto read(Long userId);
}
