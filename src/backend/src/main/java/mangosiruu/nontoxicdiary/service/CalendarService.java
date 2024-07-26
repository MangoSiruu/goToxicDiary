package mangosiruu.nontoxicdiary.service;

import mangosiruu.nontoxicdiary.dto.CalendarInputDto;
import mangosiruu.nontoxicdiary.dto.CalendarListOutputDto;
import mangosiruu.nontoxicdiary.dto.CalendarOutputDto;

import java.time.LocalDate;
import java.util.List;

public interface CalendarService {

    CalendarOutputDto saveToxicFoods(CalendarInputDto inputDto, Long userId);

    CalendarOutputDto getToxicFoods(LocalDate date, Long userId);

    List<CalendarListOutputDto> getToxicFoodsByRange(LocalDate startDate, LocalDate endDate,
        String filterCategory, Long userId);
}
