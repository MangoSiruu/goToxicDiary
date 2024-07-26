package mangosiruu.nontoxicdiary.service;

import mangosiruu.nontoxicdiary.dto.SignupRequestDto;

public interface UserService {
    int MIN_USERNAME_LENGTH=8;
    int MAX_USERNAME_LENGTH=15;
    int MIN_PASSWORD_LENGTH=12;
    int MAX_PASSWORD_LENGTH=20;

    Long registerUser(SignupRequestDto signupRequestDto);
}
