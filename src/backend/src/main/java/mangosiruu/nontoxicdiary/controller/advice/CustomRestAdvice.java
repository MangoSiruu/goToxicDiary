package mangosiruu.nontoxicdiary.controller.advice;

import jakarta.persistence.EntityNotFoundException;
import lombok.extern.log4j.Log4j2;
import mangosiruu.nontoxicdiary.exception.ResponseMap;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@Log4j2
@RestControllerAdvice
public class CustomRestAdvice {
    /**
     * DB 처리 도중 발생한, 데이터 무결성 위반 예외 처리
     * @param e DataIntegrityViolationException
     * @return ResponseEntity (400)
     */
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Map<String,Object>> handleDataIntegrityViolationException(DataIntegrityViolationException e){
        ResponseMap responseMap=new ResponseMap();
        responseMap.put("message", "데이터 무결성을 위반했습니다.");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseMap.getMap());
    }

    /**
     * DB 처리 도중 발생한, 데이터 접근 예외 처리
     * @param e DataAccessException
     * @return ResponseEntity (400)
     */
    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<Map<String,Object>> handleDataAccessException(DataAccessException e){
        ResponseMap responseMap=new ResponseMap();
        responseMap.put("message", "데이터에 접근할 수 없습니다.");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseMap.getMap());
    }

    /**
     * 데이터 검증 (Validation) 도중 발생한 예외 처리
     * @param e MethodArgumentNotValidException
     * @return ResponseEntity (400)
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String,Object>> handleMethodArgumentNotValidException(MethodArgumentNotValidException e){
        BindingResult bindingResult=e.getBindingResult();
        ResponseMap responseMap=new ResponseMap();

        final List<String> errorMessages=new LinkedList<>();
        bindingResult.getFieldErrors().forEach((fieldError)->{
            errorMessages.add(fieldError.getField()+": "+fieldError.getDefaultMessage()+".");
        });
        responseMap.put("message", errorMessages);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseMap.getMap());
    }

    /**
     * 입력값이 잘못되었을 때 발생하는 예외 처리
     * @param e IllegalArgumentException
     * @return ResponseEntity (400)
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleIllegalArgumentException(IllegalArgumentException e){
        ResponseMap responseMap=new ResponseMap();
        responseMap.put("message", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseMap.getMap());
    }

    /**
     * 로직 처리에 필요한 데이터가 존재하지 않는 경우 발생하는 예외 처리
     * @param e EntityNotFoundException, EmptyResultDataAccessException
     * @return ResponseEntity (404)
     */
    @ExceptionHandler({
            NoSuchElementException.class,
            EntityNotFoundException.class,
            EmptyResultDataAccessException.class,
            UsernameNotFoundException.class
    })
    public ResponseEntity<Map<String,Object>> handleNoSuchElementException(Exception e){
        ResponseMap responseMap=new ResponseMap();
        responseMap.put("message", e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseMap.getMap());
    }


    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Map<String,Object>> handleAccessDeniedException(AccessDeniedException e){
        ResponseMap responseMap=new ResponseMap();
        responseMap.put("message", "토큰을 받지 못했습니다.");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseMap.getMap());
    }
}
