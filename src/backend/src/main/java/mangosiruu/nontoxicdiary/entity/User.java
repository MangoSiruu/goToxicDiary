package mangosiruu.nontoxicdiary.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User extends BaseEntity {
    @Id
    @Column(length= 15, nullable=false)
    private String username;
    @Column(nullable=false)
    private String password;
    @OneToOne(cascade = CascadeType.ALL)
    private UserInfo userInfo;
}
