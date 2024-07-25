package mangosiruu.nontoxicdiary.config;

import mangosiruu.nontoxicdiary.dto.ToxicFoodDto;
import mangosiruu.nontoxicdiary.entity.ToxicFood;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RootConfig {

    @Bean
    public ModelMapper getMapper() {
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration()
            .setFieldMatchingEnabled(true)
            .setFieldAccessLevel(org.modelmapper.config.Configuration.AccessLevel.PRIVATE)
            .setMatchingStrategy(org.modelmapper.convention.MatchingStrategies.LOOSE);

        // 매핑 규칙 추가
        modelMapper.addMappings(new PropertyMap<ToxicFood, ToxicFoodDto>() {
            @Override
            protected void configure() {
                map().setName(source.getCategory().getFood());
            }
        });

        return modelMapper;
    }
}
