package mangosiruu.nontoxicdiary.dto;

import lombok.Getter;

@Getter
public enum FoodCategoryEnum {
    술("술"),
    인스턴트("인스턴트"),
    매운음식("매운음식"),
    카페인("카페인"),
    야식("야식"),
    액상과당("액상과당"),
    기타("기타");

    private final String foodName;

    FoodCategoryEnum(String foodName) {
        this.foodName = foodName;
    }

}
