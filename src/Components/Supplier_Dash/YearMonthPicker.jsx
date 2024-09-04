import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { setMonth, setYear } from 'date-fns';

function YearMonthPicker() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef(null);
  const [position, setPosition] = useState({});

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsOpen(false);
  };

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen && calendarRef.current) {
      const rect = calendarRef.current.getBoundingClientRect();
      if (rect.bottom > window.innerHeight) {
        setPosition({ bottom: '100%' });
      } else {
        setPosition({});
      }
    }
  };

  useEffect(() => {
    if (isOpen && calendarRef.current) {
      const rect = calendarRef.current.getBoundingClientRect();
      if (rect.bottom > window.innerHeight) {
        setPosition({ bottom: '100%' });
      } else {
        setPosition({});
      }
    }
  }, [isOpen]);

  return (
    <div className="relative w-full">
      <button
        onClick={handleButtonClick}
        className="w-full p-4 border border-gray-300 rounded-lg text-lg bg-white cursor-pointer flex justify-between items-center"
      >
        {selectedDate ? (
          <span>{`${selectedDate.getFullYear()} - ${selectedDate.toLocaleString('default', { month: 'long' })}`}</span>
        ) : (
          <span>Select Year and Month</span>
        )}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.292 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      {isOpen && (
        <div
          ref={calendarRef}
          className="absolute z-50 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg p-4"
          style={position}
        >
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="yyyy/MM"
            showMonthYearPicker
            inline
            renderCustomHeader={({
              date,
              decreaseMonth,
              increaseMonth,
              changeYear,
            }) => (
              <div className="flex justify-between items-center mb-2">
                <button
                  onClick={decreaseMonth}
                  className="text-gray-600 hover:text-gray-900 focus:outline-none"
                >
                  {'<'}
                </button>
                <span className="text-lg font-semibold">
                  {date.toLocaleString('default', { month: 'long' })}
                </span>
                <button
                  onClick={increaseMonth}
                  className="text-gray-600 hover:text-gray-900 focus:outline-none"
                >
                  {'>'}
                </button>
                <select
                  value={date.getFullYear()}
                  onChange={({ target: { value } }) => changeYear(value)}
                  className="ml-2 bg-gray-100 border border-gray-300 rounded-md py-1 px-2 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {Array(50)
                    .fill(0)
                    .map((_, i) => (
                      <option key={i} value={i + 1970}>
                        {i + 1970}
                      </option>
                    ))}
                </select>
              </div>
            )}
            className="text-center"
            calendarClassName="bg-white rounded-lg shadow-lg"
            dayClassName={() => "hover:bg-green-200 rounded-full"}
            monthClassName={() => "hover:bg-green-200 rounded-full"}
            wrapperClassName="react-datepicker-wrapper"
          />
        </div>
      )}
    </div>
  );
}

export default YearMonthPicker;
