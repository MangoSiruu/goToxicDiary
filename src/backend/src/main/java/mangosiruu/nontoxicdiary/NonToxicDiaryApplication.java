package mangosiruu.nontoxicdiary;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class NonToxicDiaryApplication {

	public static void main(String[] args) {
		SpringApplication.run(NonToxicDiaryApplication.class, args);
	}

}
