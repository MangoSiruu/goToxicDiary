import { create } from "zustand";
import { add, sub, startOfWeek, startOfMonth, differenceInWeeks, format } from "date-fns";

const useStandardDateStore = create((set) => ({
    today: new Date(),
    week: startOfWeek(new Date()),
    month: startOfMonth(new Date()),

    addOneWeek: () => set((state) => ({week: add(state.week, {weeks: 1}), today: add(state.today, {days: 7})})),
    subOneWeek: () => set((state) => ({week: sub(state.week, {weeks: 1}), today: sub(state.today, {days: 7})})),

    addOneMonth: () => set((state) => ({month: add(state.month, {months: 1})})),
    subOneMonth: () => set((state) => ({month: sub(state.month, {months: 1})})),

    getWeeksTitle: (today, week) => {
        const weeks = ["첫", "둘", "셋", "넷", "다섯"];
        const firstSunday = startOfWeek(startOfMonth(today));
        const weekNumber = differenceInWeeks(week, firstSunday);
        return format(today, "yyyy년 M월 ") + weeks[weekNumber] + "째주";
    },
}));

export default useStandardDateStore