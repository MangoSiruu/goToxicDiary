package mangosiruu.nontoxicdiary.controller;

import io.swagger.annotations.ApiOperation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import mangosiruu.nontoxicdiary.dto.*;
import mangosiruu.nontoxicdiary.exception.ResponseMap;
import mangosiruu.nontoxicdiary.exception.TokenException;
import mangosiruu.nontoxicdiary.security.UserDetailsImpl;
import mangosiruu.nontoxicdiary.service.ChallengeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/challenge")
public class ChallengeController {
    private final ChallengeService challengeService;


    @ApiOperation("챌린지 목록 조회")
    @PreAuthorize("isAuthenticated()")
    @GetMapping("")
    public ResponseEntity<Map<String, Object>> list(PageRequestDto pageRequestDto, @RequestParam Boolean finished){
        // Context 에서 principal 가져오기
        Object principal=SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // userId 추출
        if(principal!=null && principal instanceof UserDetailsImpl){
            Long userId=((UserDetailsImpl)principal).getId();

            // 챌린지 목록 조회
            PageResponseDto<ChallengeOutputDto> pageResponseDto;
            if(finished){
                // 완료된 챌린지 목록 조회
                pageResponseDto=challengeService.readFinishedPage(pageRequestDto, userId);
            }
            else{
                // 진행 중인 챌린지 목록 조회
                pageResponseDto=challengeService.readUnfinishedPage(pageRequestDto, userId);
            }

            // 응답 생성
            ResponseMap responseMap=new ResponseMap();
            responseMap.put("message", "챌린지 목록 조회에 성공했습니다.");
            responseMap.put("content", pageResponseDto.getContent());
            responseMap.put("hasNext", pageResponseDto.isHasNext());

            return ResponseEntity.status(HttpStatus.OK).body(responseMap.getMap());
        }
        else{
            // 인증 정보가 없는 경우 등록 불가
            throw new TokenException(TokenException.TOKEN_ERROR.UNACCEPT);
        }
    }

    @ApiOperation("챌린지 등록")
    @PreAuthorize("isAuthenticated()")
    @PostMapping(value="", consumes= MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> create(@Valid @RequestBody ChallengeInputDto challengeInputDto){
        // Context 에서 principal 가져오기
        Object principal=SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // userId 추출
        if(principal!=null && principal instanceof UserDetailsImpl){
            Long userId=((UserDetailsImpl)principal).getId();

            // 챌린지 등록
            Long challengeId=challengeService.register(challengeInputDto, userId);

            // 응답 생성
            ResponseMap responseMap=new ResponseMap();
            responseMap.put("message", "챌린지 등록에 성공했습니다.");
            responseMap.put("id", challengeId);

            return ResponseEntity.status(HttpStatus.CREATED).body(responseMap.getMap());
        }
        else{
            // 인증 정보가 없는 경우 등록 불가
            throw new TokenException(TokenException.TOKEN_ERROR.UNACCEPT);
        }
    }

    @ApiOperation("챌린지 조회")
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{challengeId}")
    public ResponseEntity<Map<String, Object>> read(@PathVariable Long challengeId){
        // Context 에서 principal 가져오기
        Object principal=SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // userId 추출
        if(principal!=null && principal instanceof UserDetailsImpl){
            Long userId=((UserDetailsImpl)principal).getId();

            ResponseMap responseMap=new ResponseMap();

            // 본인이 소유한 챌린지인지 확인
            if(challengeService.isOwner(challengeId, userId)){
                // 챌린지 조회
                ChallengeOutputWithSuccessDto challengeOutputWithSuccessDto =challengeService.read(challengeId);

                // 응답 생성
                responseMap.put("message", "챌린지 조회에 성공했습니다.");
                responseMap.put("challenge", challengeOutputWithSuccessDto);

                return ResponseEntity.status(HttpStatus.OK).body(responseMap.getMap());
            }
            else{
                // 본인이 소유한 챌린지가 아니면 접근 불가
                responseMap.put("message", "해당 챌린지에 접근할 권한이 없습니다.");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(responseMap.getMap());
            }
        }
        else{
            // 인증 정보가 없는 경우 등록 불가
            throw new TokenException(TokenException.TOKEN_ERROR.UNACCEPT);
        }
    }

    @ApiOperation("챌린지 수정")
    @PreAuthorize("isAuthenticated()")
    @PutMapping(value="/{challengeId}", consumes=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, Object>> update(@PathVariable Long challengeId, @Valid @RequestBody ChallengeUpdateDto challengeUpdateDto){
        // Context 에서 principal 가져오기
        Object principal=SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // userId 추출
        if(principal!=null && principal instanceof UserDetailsImpl){
            Long userId=((UserDetailsImpl)principal).getId();

            ResponseMap responseMap=new ResponseMap();

            // 본인이 소유한 챌린지인지 확인
            if(challengeService.isOwner(challengeId, userId)){
                // 챌린지 수정
                challengeId=challengeService.modify(challengeId, challengeUpdateDto);

                // 응답 생성
                responseMap.put("message", "챌린지 수정에 성공했습니다.");
                responseMap.put("id", challengeId);

                return ResponseEntity.status(HttpStatus.OK).body(responseMap.getMap());
            }
            else{
                // 본인이 소유한 챌린지가 아니면 접근 불가
                responseMap.put("message", "해당 챌린지에 접근할 권한이 없습니다.");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(responseMap.getMap());
            }
        }
        else{
            // 인증 정보가 없는 경우 등록 불가
            throw new TokenException(TokenException.TOKEN_ERROR.UNACCEPT);
        }
    }

    @ApiOperation("게시글 삭제")
    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/{challengeId}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable Long challengeId){
        // Context 에서 principal 가져오기
        Object principal=SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // userId 추출
        if(principal!=null && principal instanceof UserDetailsImpl){
            Long userId=((UserDetailsImpl)principal).getId();

            ResponseMap responseMap=new ResponseMap();

            // 본인이 소유한 챌린지인지 확인
            if(challengeService.isOwner(challengeId, userId)){
                // 챌린지 삭제
                challengeService.remove(challengeId);

                // 응답 생성
                responseMap.put("message", "챌린지 삭제에 성공했습니다.");

                return ResponseEntity.status(HttpStatus.OK).body(responseMap.getMap());
            }
            else{
                // 본인이 소유한 챌린지가 아니면 접근 불가
                responseMap.put("message", "해당 챌린지에 접근할 권한이 없습니다.");
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(responseMap.getMap());
            }
        }
        else{
            // 인증 정보가 없는 경우 등록 불가
            throw new TokenException(TokenException.TOKEN_ERROR.UNACCEPT);
        }
    }
}
