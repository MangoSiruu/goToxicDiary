package mangosiruu.nontoxicdiary.service;

import mangosiruu.nontoxicdiary.dto.CalendarInputDto;
import mangosiruu.nontoxicdiary.dto.CalendarListOutputDto;
import mangosiruu.nontoxicdiary.dto.CalendarOutputDto;

import java.time.LocalDate;
import java.util.List;

public interface CalendarService {

    CalendarOutputDto saveToxicFoods(CalendarInputDto inputDto);

    CalendarOutputDto getToxicFoods(LocalDate date);

    List<CalendarListOutputDto> getToxicFoodsByRange(LocalDate startDate, LocalDate endDate,
        String filterCategory);
}
