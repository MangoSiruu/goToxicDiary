package mangosiruu.nontoxicdiary.security.handler;

import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import mangosiruu.nontoxicdiary.dto.UserInfoDto;
import mangosiruu.nontoxicdiary.exception.ResponseMap;
import mangosiruu.nontoxicdiary.exception.TokenException;
import mangosiruu.nontoxicdiary.security.UserDetailsImpl;
import mangosiruu.nontoxicdiary.service.UserInfoService;
import mangosiruu.nontoxicdiary.util.JwtUtil;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;

@Log4j2
@RequiredArgsConstructor
public class LoginSuccessHandler implements AuthenticationSuccessHandler {
    private final JwtUtil jwtUtil;
    private final UserInfoService userInfoService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        log.info("Login Success Handler.........");

        try {
            SecurityContextHolder.getContext().setAuthentication(authentication);

            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setStatus(HttpServletResponse.SC_OK);

            // Access 토큰 발급
            String accessToken = jwtUtil.getAccessToken(authentication.getName());
            response.addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken);

            // Refresh 토큰 발급
            ResponseCookie refreshTokenCookie= jwtUtil.getRefreshTokenCookie(authentication.getName());
            response.addHeader(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());

            // 응답 본문 구성
            Gson gson = new Gson();
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

            // 인증 정보를 받지 못 한 경우
            if(userDetails==null){
                throw new TokenException(TokenException.TOKEN_ERROR.UNACCEPT);
            }

            UserInfoDto userInfoDTO=userInfoService.read(userDetails.getId());

            ResponseMap responseMap=new ResponseMap();
            responseMap.put("message", "로그인에 성공했습니다.");
            responseMap.put("user", userInfoDTO);

            response.getWriter().write(gson.toJson(responseMap.getMap()));
        }
        catch(TokenException e){
            log.error("TokenException: " + e.getMessage());
            e.sendErrorResponse(response);
        }
    }
}