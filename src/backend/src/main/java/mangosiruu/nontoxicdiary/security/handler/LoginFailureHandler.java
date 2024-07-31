package mangosiruu.nontoxicdiary.security.handler;

import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import mangosiruu.nontoxicdiary.exception.ResponseMap;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import java.io.IOException;

public class LoginFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException {
        // 응답 헤더 설정
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        // 응답 바디 작성
        Gson gson=new Gson();
        ResponseMap responseMap=new ResponseMap();
        responseMap.put("message", exception.getMessage());
        String responseBody=gson.toJson(responseMap.getMap());

        response.getWriter().write(responseBody);
    }
}
