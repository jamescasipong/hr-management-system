import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import EnhancedLeaveRequestModal from "./EnhancedLeaveRequestModal";

const Calendar = ({ vacation, sick }: { vacation: number; sick: number }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [leaveDate, SetLeaveDate] = useState<any>(new Date(2024, 9, 18)); // Note: Month is 0-indexed
  const [endLeaveDate, SetEndLeaveDate] = useState<any>(new Date(2024, 9, 20)); // Note: Month is 0-indexed

  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const renderHeader = () => {
    return (
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 sm:p-7 p-0">
        <CardTitle className="sm:text-lg text-sm font-medium">
          {format(currentDate, "MMMM yyyy")}
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            className="dark:bg-gray-900 bg-white hover:bg-gray-100 text-black dark:text-white dark:hover:bg-gray-800 shadow-sm border border-gray-300 dark:border-gray-700 sm:flex justify-center hidden"
            onClick={handlePrevMonth}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            className="dark:bg-gray-900 bg-white hover:bg-gray-100 text-black dark:text-white dark:hover:bg-gray-800 shadow-sm border border-gray-300 dark:border-gray-700 sm:flex justify-center hidden"
            onClick={handleToday}
          >
            Today
          </Button>
          <Button
            size="icon"
            className="dark:bg-gray-900 bg-white hover:bg-gray-100 text-black dark:text-white dark:hover:bg-gray-800 shadow-sm border border-gray-300 dark:border-gray-700 sm:flex justify-center hidden"
            onClick={handleNextMonth}
          >
            <ChevronRight className="h-4 w-4 " />
          </Button>
          <EnhancedLeaveRequestModal vacation={vacation} sick={sick} />
        </div>
      </CardHeader>
    );
  };

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(startOfMonth(currentDate));
    const endDate = endOfWeek(endOfMonth(currentDate));

    let day = startDate;
    while (day <= endDate) {
      const isLeaveDay = isWithinInterval(day, {
        start: leaveDate,
        end: endLeaveDate,
      });

      days.push(
        <div
          key={day.toISOString()}
          className={`relative p-4 text-center ${
            isLeaveDay ? "bg-green-400 text-black" : ""
          } dark:border-gray-700 hover:bg-muted transition-colors font-medium sm:border border-0  rounded-lg duration-200 ${
            !isSameMonth(day, currentDate) ? "text-muted-foreground " : ""
          } 
          
          ${
            isSameDay(day, new Date())
              ? "bg-blue-500 text-white text-primary-foreground font-semibold rounded-full hover:bg-blue-600"
              : ""
          }`}
        >
          <time
            dateTime={format(day, "yyyy-MM-dd")}
            className="sm:text-[15px]  text-xs "
          >
            <div className="flex justify-center sm:py-1 py-0 ">
              <p className="sm:flex hidden">
                {isSameDay(day, new Date()) ? "Today" : format(day, "d")}
              </p>
              <p className="sm:hidden flex ">{format(day, "d")}</p>
            </div>
          </time>
        </div>
      );
      day = addDays(day, 1);
    }

    return <div className="grid grid-cols-7 gap-px ">{days}</div>;
  };

  return (
    <div>
      <Card className="sm:block hidden w-full mx-auto dark:bg-gray-800 dark:border-gray-700 sm:border border-0 ">
        {renderHeader()}
        <CardContent>
          <div className="grid grid-cols-7 gap-px text-center text-sm font-medium">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
              <div key={day} className="py-2 sm:text-sm text-[11px] font-bold">
                {day}
              </div>
            ))}
          </div>
          {renderDays()}
        </CardContent>
      </Card>

      <div className="sm:hidden flex flex-col">
        {renderHeader()}
        <div className="grid grid-cols-7 gap-px text-center text-sm font-medium">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="py-2 sm:text-sm text-[11px] font-bold">
              {day}
            </div>
          ))}
        </div>
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;
