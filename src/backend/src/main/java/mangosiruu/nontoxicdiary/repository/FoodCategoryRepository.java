package mangosiruu.nontoxicdiary.repository;

import mangosiruu.nontoxicdiary.entity.FoodCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FoodCategoryRepository extends JpaRepository<FoodCategory, Long> {
    Optional<FoodCategory> findByFood(String food);
}
