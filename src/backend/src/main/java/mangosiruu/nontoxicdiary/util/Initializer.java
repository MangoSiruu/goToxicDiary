package mangosiruu.nontoxicdiary.util;

import lombok.RequiredArgsConstructor;
import mangosiruu.nontoxicdiary.entity.FoodCategory;
import mangosiruu.nontoxicdiary.repository.FoodCategoryRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
@RequiredArgsConstructor
public class Initializer implements CommandLineRunner {

    private final FoodCategoryRepository foodCategoryRepository;

    @Override
    public void run(String... args) {
        if (foodCategoryRepository.count() == 0) {
            List<FoodCategory> categories = Arrays.asList(
                new FoodCategory(1L, "술"),
                new FoodCategory(2L, "인스턴트"),
                new FoodCategory(3L, "매운음식"),
                new FoodCategory(4L, "카페인"),
                new FoodCategory(5L, "야식"),
                new FoodCategory(6L, "액상과당"),
                new FoodCategory(7L, "기타")
            );

            foodCategoryRepository.saveAll(categories);
        }
    }

}