package mangosiruu.nontoxicdiary.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.DecodingException;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import mangosiruu.nontoxicdiary.exception.TokenException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;

@Component
public class JwtUtil {
    private final int ACCESS_TOKEN_EXPIRATION_SEC=60*30;  // 30분
    private final int REFRESH_TOKEN_EXPIRATION_SEC=60*60*24*7;  // 7일
    private final String REFRESH_TOKEN="refresh-token";

    @Value("${mangosiruu.nontoxicdiary.jwt.secret}")
    private String jwtSecret;


    /**
     * JWT 생성 함수
     * @param username 유저 이름
     * @param seconds 유효 시간
     * @return 토큰 문자열
     */
    private String generateTokenFromUsername(String username, int seconds) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(Date.from(ZonedDateTime.now().toInstant()))
                .setExpiration(Date.from(ZonedDateTime.now().plusSeconds(seconds).toInstant()))
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * 토큰 검증 함수
     * @param token 토큰
     * @return 검증 결과
     * @throws TokenException JWT 인증 예외
     */
    public boolean validateToken(String token) throws TokenException {
        try {
            Jwts.parserBuilder().setSigningKey(key()).build().parse(token);
            return true;
        } catch (MalformedJwtException e) {
            throw new TokenException(TokenException.TOKEN_ERROR.MALFORM);
        } catch (ExpiredJwtException e) {
            throw new TokenException(TokenException.TOKEN_ERROR.EXPIRED);
        } catch(SignatureException signatureException){
            throw new TokenException(TokenException.TOKEN_ERROR.BADSIGN);
        } catch (UnsupportedJwtException e) {
            throw new TokenException(TokenException.TOKEN_ERROR.UNSUPPORTED);
        } catch (IllegalArgumentException e) {
            throw new TokenException(TokenException.TOKEN_ERROR.UNACCEPT);
        } catch(DecodingException e){
            // 전달 방식이 잘못돼서 토큰 문자열에 white space가 들어가면 DecodingException 발생
            throw new TokenException(TokenException.TOKEN_ERROR.MALFORM);
        } catch(Exception e){
            throw new TokenException(TokenException.TOKEN_ERROR.MALFORM);
        }
    }

    /**
     * Access 토큰 생성
     * @param username username
     * @return access token
     */
    public String getAccessToken(String username){
        return generateTokenFromUsername(username, ACCESS_TOKEN_EXPIRATION_SEC);
    }

    /**
     * Refresh 토큰을 담은 HTTP ONLY 쿠키 생성
     * @param username username
     * @return refresh token cookie (http only)
     */
    public ResponseCookie getRefreshTokenCookie(String username){
        String jwt = generateTokenFromUsername(username, REFRESH_TOKEN_EXPIRATION_SEC);
        return ResponseCookie.from(REFRESH_TOKEN, jwt)
                .path("/")
                .maxAge(REFRESH_TOKEN_EXPIRATION_SEC)
                .httpOnly(true)
                .build();
    }

    /**
     * 클라이언트에 저장된 Refresh 토큰 쿠키를 제거하기 위해
     * 만료 기한이 0인 쿠키 생성
     * @return clear refresh token cookie (maxAge=0)
     */
    public ResponseCookie getClearRefreshTokenCookie(){
        return ResponseCookie.from(REFRESH_TOKEN, "clear")
                .path("/")
                .maxAge(0)
                .httpOnly(true)
                .build();
    }

    /**
     * 요청 쿠키들 중, refresh 토큰을 찾아 반환
     * @param cookies 요청 쿠키들
     * @return refresh token
     */
    public String getRefreshTokenFromCookies(Cookie[] cookies){
        String token = null;
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(REFRESH_TOKEN)) {
                    token = cookie.getValue();
                    break;
                }
            }
        }
        return token;
    }

    /**
     * 토큰 문자열에서 username을 추출하는 함수
     * @param token 토큰 문자열
     * @return username
     */
    public String getUserNameFromJwtToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key()).build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    /**
     * 토큰 문자열에서 만료 기한을 추출하는 함수
     * @param token 토큰 문자열
     * @return 만료 기한
     */
    public LocalDateTime getExpirationFromJwtToken(String token){
        Date date=Jwts.parserBuilder().setSigningKey(key()).build()
                .parseClaimsJws(token).getBody().getExpiration();
        return date.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();
    }

    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }
}
