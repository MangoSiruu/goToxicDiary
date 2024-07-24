package mangosiruu.nontoxicdiary.controller;

import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import mangosiruu.nontoxicdiary.dto.UserInfoDto;
import mangosiruu.nontoxicdiary.exception.ResponseMap;
import mangosiruu.nontoxicdiary.exception.TokenException;
import mangosiruu.nontoxicdiary.security.UserDetailsImpl;
import mangosiruu.nontoxicdiary.service.UserInfoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserInfoController {
    private final UserInfoService userInfoService;

    /**
     * 나의 유저 정보 조회
     * @return 나의 유저 정보 (닉네임, 프로필, 자기소개 등)
     */
    @ApiOperation("나의 유저 정보 조회")
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> readMe(){
        // Context 에서 principal 가져오기
        Object principal= SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if(principal!=null && principal instanceof UserDetailsImpl){
            // myUserId 추출
            Long myUserId=((UserDetailsImpl)principal).getId();

            // 유저 정보 조회
            UserInfoDto userInfoDto=userInfoService.read(myUserId);

            // 응답 생성
            ResponseMap responseMap=new ResponseMap();
            responseMap.put("message", "유저 정보 조회에 성공했습니다.");
            responseMap.put("user", userInfoDto);

            return ResponseEntity.status(HttpStatus.OK).body(responseMap.getMap());
        }
        else{
            throw new TokenException(TokenException.TOKEN_ERROR.UNACCEPT);
        }
    }
}
