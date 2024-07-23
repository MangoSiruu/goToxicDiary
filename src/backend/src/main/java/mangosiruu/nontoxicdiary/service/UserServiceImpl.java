package mangosiruu.nontoxicdiary.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import mangosiruu.nontoxicdiary.dto.SignupRequestDto;
import mangosiruu.nontoxicdiary.entity.User;
import mangosiruu.nontoxicdiary.entity.UserInfo;
import mangosiruu.nontoxicdiary.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Log4j2
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    /**
     * 새로운 유저를 생성한다. (회원가입 메서드)
     * @param signupRequestDto 회원가입 정보
     * @return 유저 정보 반환
     */
    @Override
    public Long registerUser(SignupRequestDto signupRequestDto){
        // 아이디 중복 검사
        if (userRepository.existsByUsername(signupRequestDto.getUsername())) {
            throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
        }

        // User, UserInfo 엔티티 생성
        UserInfo userInfo= UserInfo.builder()
                .nickname(signupRequestDto.getNickname())
                .build();

        User user=User.builder()
                .username(signupRequestDto.getUsername())
                .password(encoder.encode(signupRequestDto.getPassword()))
                .userInfo(userInfo)
                .build();

        // User, UserInfo 는 OneToOne 으로 연결되어 있기 때문에 하나만 저장
        User result = userRepository.save(user);

        // 등록에 성공한 유저 ID 반환
        return result.getUserInfo().getId();
    }
}
