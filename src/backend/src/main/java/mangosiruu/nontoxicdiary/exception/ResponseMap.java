package mangosiruu.nontoxicdiary.exception;

import lombok.Data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Data
public class ResponseMap {

    private Map<String, Object> map;

    public ResponseMap() {
        map = new HashMap<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");
        map.put("timeStamp", LocalDateTime.now().format(formatter));
    }

    public void put(String key, Object value) {
        map.put(key, value);
    }
}