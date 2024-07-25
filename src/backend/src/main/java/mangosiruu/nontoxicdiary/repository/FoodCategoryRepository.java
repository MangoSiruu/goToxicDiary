package mangosiruu.nontoxicdiary.repository;

import mangosiruu.nontoxicdiary.entity.FoodCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodCategoryRepository extends JpaRepository<FoodCategory, Long> {

    FoodCategory findByFood(String name);
}
