package mangosiruu.nontoxicdiary.exception;

import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import java.io.IOException;

@Getter
public class TokenException extends RuntimeException {
    private final TOKEN_ERROR tokenError;

    @Getter
    public enum TOKEN_ERROR{
        // 인증 안 한 채로 요청해서 UserDetails 가 null 인 경우 UNACCEPT
        UNACCEPT(HttpStatus.UNAUTHORIZED, "토큰을 받지 못했습니다."),
        MALFORM(HttpStatus.UNAUTHORIZED, "잘못된 형식의 토큰입니다."),
        EXPIRED(HttpStatus.UNAUTHORIZED, "만료된 토큰입니다."),
        BADSIGN(HttpStatus.UNAUTHORIZED, "토큰 시그니처가 잘못됐습니다."),
        UNSUPPORTED(HttpStatus.UNAUTHORIZED, "지원하지 않는 토큰입니다.");

        private final HttpStatus status;
        private final String message;

        TOKEN_ERROR(HttpStatus status, String message){
            this.status=status;
            this.message=message;
        }
    }

    public TokenException(TOKEN_ERROR error){
        super(error.name());
        this.tokenError=error;
    }

    @Override
    public String getMessage(){
        return tokenError.getMessage();
    }

    public void sendErrorResponse(HttpServletResponse resp){
        resp.setContentType(MediaType.APPLICATION_JSON_VALUE);
        resp.setStatus(tokenError.getStatus().value());

        Gson gson=new Gson();
        ResponseMap responseMap=new ResponseMap();
        responseMap.put("message", tokenError.getMessage());
        String responseBody=gson.toJson(responseMap.getMap());

        try{
            resp.getWriter().write(responseBody);
        }catch(IOException e){
            throw new RuntimeException(e);
        }
    }
}