package mangosiruu.nontoxicdiary.util;

import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;

import java.io.InputStreamReader;
import java.io.Reader;
import java.util.Map;

@Log4j2
@Component
public class Util {
    public static Map<String,String> parseRequestJSON(HttpServletRequest request){
        try(Reader reader=new InputStreamReader(request.getInputStream())){
            Gson gson=new Gson();
            return gson.fromJson(reader, Map.class);
        }catch(Exception e){
            log.error(e.getMessage());
        }
        return null;
    }
}
