package mangosiruu.nontoxicdiary.security.filter;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import mangosiruu.nontoxicdiary.service.UserService;
import mangosiruu.nontoxicdiary.util.Util;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import java.util.Map;

@Log4j2
public class LoginFilter extends AbstractAuthenticationProcessingFilter {
    public LoginFilter(String defaultFilterProcessesUrl){
        super(defaultFilterProcessesUrl);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        log.info("Login Filter.........");

        // GET 방식으로 호출하면 request 에서 NullPointerException 발생
        if(request.getMethod().equalsIgnoreCase("GET")){
            throw new BadCredentialsException("GET method not supported");
        }

        Map<String, String> requestBody=Util.parseRequestJSON(request);
        if(requestBody!=null){
            String username=requestBody.get("username");
            String password=requestBody.get("password");

            // 길이 검사
            if(username.length() < UserService.MIN_USERNAME_LENGTH
                    || username.length() > UserService.MAX_USERNAME_LENGTH){
                throw new BadCredentialsException("username: 크기가 " + UserService.MIN_USERNAME_LENGTH + "에서 " + UserService.MAX_USERNAME_LENGTH + " 사이여야 합니다.");
            }

            if(password.length() < UserService.MIN_PASSWORD_LENGTH
                    || password.length() > UserService.MAX_PASSWORD_LENGTH){
                throw new BadCredentialsException("password: 크기가 " + UserService.MIN_PASSWORD_LENGTH + "에서 " + UserService.MAX_PASSWORD_LENGTH + " 사이여야 합니다.");
            }

            UsernamePasswordAuthenticationToken authenticationToken=new UsernamePasswordAuthenticationToken(username, password);
            Authentication authentication=getAuthenticationManager().authenticate(authenticationToken);

            // 인증 정보 반환
            return authentication;
        }
        else{
            throw new BadCredentialsException("username과 password를 입력해주세요.");
        }
    }
}