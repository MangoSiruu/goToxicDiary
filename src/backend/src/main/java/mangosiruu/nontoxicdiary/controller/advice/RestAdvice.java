package mangosiruu.nontoxicdiary.controller.advice;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import mangosiruu.nontoxicdiary.exception.ResponseMap;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class RestAdvice {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleMethodArgumentNotValidException(
        MethodArgumentNotValidException e) {
        BindingResult bindingResult = e.getBindingResult();
        ResponseMap responseMap = new ResponseMap();

        final List<String> errorMessages = new LinkedList<>();
        bindingResult.getFieldErrors().forEach((fieldError) -> {
            errorMessages.add(fieldError.getField() + ": " + fieldError.getDefaultMessage() + ".");
        });
        responseMap.put("message", errorMessages);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseMap.getMap());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleIllegalArgumentException(
        IllegalArgumentException e) {
        ResponseMap responseMap = new ResponseMap();
        responseMap.put("message", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseMap.getMap());
    }
}
