package mangosiruu.nontoxicdiary.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import mangosiruu.nontoxicdiary.entity.RefreshToken;
import mangosiruu.nontoxicdiary.repository.RefreshTokenRepository;
import mangosiruu.nontoxicdiary.util.JwtUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Log4j2
@Service
@Transactional
@RequiredArgsConstructor
public class RefreshTokenServiceImpl implements RefreshTokenService{
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtUtil jwtUtil;


    @Override
    public void register(String token){
        RefreshToken refreshToken=RefreshToken.builder()
                .token(token)
                .username(jwtUtil.getUserNameFromJwtToken(token))
                .expirationTime(jwtUtil.getExpirationFromJwtToken(token))
                .build();

        refreshTokenRepository.save(refreshToken);
    }

    @Override
    public void delete(String token){
        refreshTokenRepository.deleteByToken(token);
    }

    @Override
    public boolean exists(String token){
        return refreshTokenRepository.existsByToken(token);
    }
}
