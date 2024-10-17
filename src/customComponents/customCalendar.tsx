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
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import EnhancedLeaveRequestModal from "./EnhancedLeaveRequestModal";

const Calendar = ({ vacation, sick }: { vacation: number; sick: number }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

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
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
        <CardTitle className="text-md font-medium">
          {format(currentDate, "MMMM yyyy")}
        </CardTitle>
        <div className="items-center space-x-2 flex ">
          <Button
            variant="outline"
            size="icon"
            className="dark:bg-gray-800 dark:hover:bg-gray-900 shadow-sm border border-gray-300 dark:border-gray-700 "
            onClick={handlePrevMonth}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="dark:bg-gray-800  dark:hover:bg-gray-900 shadow-sm border border-gray-300 dark:border-gray-700"
            onClick={handleToday}
          >
            Today
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="dark:bg-gray-800 dark:hover:bg-gray-900 shadow-sm border border-gray-300 dark:border-gray-700"
            onClick={handleNextMonth}
          >
            <ChevronRight className="h-4 w-4" />
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
      days.push(
        <div
          key={day.toISOString()}
          className={`relative p-4 text-center dark:border-gray-700 hover:bg-muted transition-colors font-medium border rounded-lg duration-200 ${
            !isSameMonth(day, currentDate) ? "text-muted-foreground " : ""
          } ${
            isSameDay(day, new Date())
              ? "bg-blue-500 text-white text-primary-foreground font-semibold rounded-full hover:bg-blue-600"
              : ""
          }`}
        >
          <time dateTime={format(day, "yyyy-MM-dd")} className="text-sm  ">
            {format(day, "d")}
          </time>
        </div>
      );
      day = addDays(day, 1);
    }

    return <div className="grid grid-cols-7 gap-px ">{days}</div>;
  };

  return (
    <Card className="w-full mx-auto dark:bg-gray-800 dark:border-gray-700 shadow-md">
      {renderHeader()}
      <CardContent>
        <div className="grid grid-cols-7 gap-px text-center text-sm font-medium">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="py-2 font-bold">
              {day}
            </div>
          ))}
        </div>
        {renderDays()}
      </CardContent>
    </Card>
  );
};

export default Calendar;
