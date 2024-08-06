package mangosiruu.nontoxicdiary.security.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import mangosiruu.nontoxicdiary.exception.TokenException;
import mangosiruu.nontoxicdiary.security.UserDetailsServiceImpl;
import mangosiruu.nontoxicdiary.util.JwtUtil;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Log4j2
@RequiredArgsConstructor
public class TokenCheckFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;
    private final UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        log.info("Token Check Filter.........");

        try{
            String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

            // Access 토큰을 받지 못 한 경우는 Controller의 @PreAuthorized에서 처리
            if (authorizationHeader != null) {
                // Authorization 헤더가 Bearer로 시작하는지 확인
                if(authorizationHeader.startsWith("Bearer ")){
                    String accessToken = authorizationHeader.substring(7);

                    // 토큰 유효성 검사
                    if(jwtUtil.validateToken(accessToken)){
                        // 액세스 토큰에서 username 추출
                        String username= jwtUtil.getUserNameFromJwtToken(accessToken);
                        UserDetails userDetails=userDetailsService.loadUserByUsername(username);

                        // authentication 생성
                        UsernamePasswordAuthenticationToken authentication= new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                        // ContextHolder에 authentication 등록
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }
                else{
                    // Bearer 토큰이 아닌 경우
                    throw new TokenException(TokenException.TOKEN_ERROR.UNSUPPORTED);
                }
            }

            filterChain.doFilter(request, response);
        }
        catch(TokenException e){
            log.error("TokenException: " + e.getMessage());
            e.sendErrorResponse(response);
        }
    }
}