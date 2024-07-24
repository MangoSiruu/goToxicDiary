package mangosiruu.nontoxicdiary.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import mangosiruu.nontoxicdiary.dto.UserInfoDto;
import mangosiruu.nontoxicdiary.entity.UserInfo;
import mangosiruu.nontoxicdiary.repository.UserInfoRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Log4j2
@Service
@Transactional
@RequiredArgsConstructor
public class UserInfoServiceImpl implements UserInfoService {
    private final UserInfoRepository userInfoRepository;
    private final ModelMapper modelMapper;

    @Override
    public UserInfoDto read(Long userId){
        // 유저 정보 가져오기
        UserInfo userInfo=userInfoRepository.findById(userId).orElseThrow();
        return modelMapper.map(userInfo, UserInfoDto.class);
    }
}
