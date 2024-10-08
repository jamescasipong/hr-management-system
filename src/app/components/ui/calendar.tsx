import { addDays, addMonths, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, startOfMonth, startOfWeek, subMonths } from 'date-fns';
import { useState } from 'react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <header className="flex items-center justify-between  px-6 py-4 lg:flex-none">
        <h1 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
          <time dateTime={format(currentDate, 'yyyy-MM')}>{format(currentDate, 'MMMM yyyy')}</time>
        </h1>
        <div className="flex items-center">
          <div className="relative flex items-center rounded-md bg-white dark:bg-gray-900 shadow-sm md:items-stretch">
            <button
              type="button"
              className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 dark:border-gray-600 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
              onClick={handlePrevMonth}
            >
              <span className="sr-only">Previous month</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              type="button"
              className="hidden border-y dark:text-white border-gray-300 dark:border-gray-600 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
              onClick={handleToday}
            >
              Today
            </button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden"></span>
            <button
              type="button"
              className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 dark:border-gray-600 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
              onClick={handleNextMonth}
            >
              <span className="sr-only">Next month</span>
              <svg
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="hidden md:flex md:items-center">
            <div className="relative">
             

              <div
                className={`absolute ${isMenuOpen ? "" : "opacity-0 scale-90 invisible"} transition-all right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex={-1}
              >
              </div>
            </div>
            <div className="ml-6 h-6 w-px bg-gray-300"></div>
            <button
              type="button"
              className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Add event
            </button>
          </div>
          
        </div>
      </header>
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
          className={`relative text-center py-5 border-b border-l dark:border-gray-700 ${!isSameMonth(day, currentDate) ? 'bg-gray-50 dark:bg-gray-800' : ''} ${isSameDay(day, new Date()) ? 'font-semibold text-indigo-600' : ''}`}
        >
          <time dateTime={format(day, 'yyyy-MM-dd')}>{format(day, 'd')}</time>
        </div>
      );
      day = addDays(day, 1);
    }

    return <div className="grid grid-cols-7 gap-px">{days}</div>;
  };

  return (
    <div className="lg:flex lg:h-full rounded-lg  lg:flex-col">
      {renderHeader()}
      <div className=" ring-1 rounded-lg p-4 dark:border-gray-700 border ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 gap-px    text-center text-xs font-semibold leading-6 text-gray-700 dark:text-blue-50 lg:flex-none">
          <div className="flex 0 justify-center dark:bg-gray-800 py-2">
            <span>M</span>
            <span className="sr-only sm:not-sr-only">on</span>
          </div>
          <div className="flex justify-center dark:bg-gray-800 py-2">
            <span>T</span>
            <span className="sr-only sm:not-sr-only">ue</span>
          </div>
          <div className="flex justify-center dark:bg-gray-800 py-2">
            <span>W</span>
            <span className="sr-only sm:not-sr-only">ed</span>
          </div>
          <div className="flex justify-center dark:bg-gray-800 py-2">
            <span>T</span>
            <span className="sr-only sm:not-sr-only">hu          </span>
          </div>
          <div className="flex justify-center dark:bg-gray-800 py-2">
            <span>F</span>
            <span className="sr-only sm:not-sr-only">ri</span>
          </div>
          <div className="flex justify-center dark:bg-gray-800 py-2">
            <span>S</span>
            <span className="sr-only sm:not-sr-only">at</span>
          </div>
          <div className="flex justify-center dark:bg-gray-800 py-2">
            <span>S</span>
            <span className="sr-only sm:not-sr-only">un</span>
          </div>
        </div>
        <div className='border rounded-md dark:border-gray-700'>
        {renderDays()}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
