package mangosiruu.nontoxicdiary.entity;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@MappedSuperclass
@EntityListeners(value = {AuditingEntityListener.class})
@AllArgsConstructor
@NoArgsConstructor
@Getter
abstract class BaseEntity {

    @CreatedDate
    @Column(name = "reg_date", updatable = false)
    private LocalDateTime regDate;
    @LastModifiedDate
    @Column(name = "mod_date")
    private LocalDateTime modDate;
}
