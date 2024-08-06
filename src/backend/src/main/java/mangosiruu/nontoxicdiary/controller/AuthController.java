package mangosiruu.nontoxicdiary.controller;

import com.google.gson.Gson;
import io.swagger.annotations.ApiOperation;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import mangosiruu.nontoxicdiary.dto.SignupRequestDto;
import mangosiruu.nontoxicdiary.exception.ResponseMap;
import mangosiruu.nontoxicdiary.exception.TokenException;
import mangosiruu.nontoxicdiary.service.UserService;
import mangosiruu.nontoxicdiary.util.JwtUtil;
import org.springframework.http.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Map;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;
    private final JwtUtil jwtUtil;


    @ApiOperation("회원가입")
    @PostMapping(value = "/signup", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> signUp(@Valid @RequestBody SignupRequestDto signupRequestDto){
        // 유저 등록
        Long userId=userService.registerUser(signupRequestDto);

        // 응답 생성
        ResponseMap responseMap=new ResponseMap();
        responseMap.put("message", "회원가입에 성공했습니다.");
        responseMap.put("userId", userId);

        return ResponseEntity.status(HttpStatus.CREATED).body(responseMap.getMap());
    }

    @ApiOperation("로그아웃")
    @PostMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try{
            // 쿠키 만료시키기
            log.info(jwtUtil.getClearRefreshTokenCookie().toString());
            response.addHeader(HttpHeaders.SET_COOKIE, jwtUtil.getClearRefreshTokenCookie().toString());

            // SecurityContext 비우기
            SecurityContextHolder.clearContext();

            // 응답 구성
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setStatus(HttpServletResponse.SC_OK);

            Gson gson = new Gson();
            ResponseMap responseMap=new ResponseMap();
            responseMap.put("message", "로그아웃에 성공했습니다.");

            response.getWriter().write(gson.toJson(responseMap.getMap()));
        }
        catch(TokenException e){
            log.error("TokenException: " + e.getMessage());
            e.sendErrorResponse(response);
        }
    }

    @ApiOperation("토큰 재발급")
    @PostMapping("/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try{
            // 요청 쿠키에서 Refresh Token 가져오기
            String refreshToken= jwtUtil.getRefreshTokenFromCookies(request.getCookies());

            // Refresh Token 이 없으면 토큰 재발급 불가 (에러 던지기)
            if(refreshToken==null){
                throw new TokenException(TokenException.TOKEN_ERROR.UNACCEPT);
            }

            // Refresh 토큰이 유효하다면
            if(jwtUtil.validateToken(refreshToken)){
                // 응답 구성
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                response.setStatus(HttpServletResponse.SC_OK);

                // Refresh 토큰에서 유저 정보 추출
                String username= jwtUtil.getUserNameFromJwtToken(refreshToken);

                // Access Token 재발급
                String accessToken = jwtUtil.getAccessToken(username);
                response.addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken);

                // Refresh 토큰 재발급
                ResponseCookie refreshTokenCookie= jwtUtil.getRefreshTokenCookie(username);
                response.addHeader(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());

                // 응답 본문 구성
                Gson gson = new Gson();
                ResponseMap responseMap=new ResponseMap();
                responseMap.put("message", "토큰 재발급에 성공했습니다.");
                response.getWriter().write(gson.toJson(responseMap.getMap()));
            }
        }
        catch(TokenException e){
            log.error("TokenException: " + e.getMessage());
            e.sendErrorResponse(response);
        }
    }
}
