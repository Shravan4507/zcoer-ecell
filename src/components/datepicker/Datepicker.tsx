import React, { useState, useEffect, useRef, useMemo } from 'react';
import Dropdown, { type DropdownOption } from '../dropdown/Dropdown';
import './Datepicker.css';

export interface DatepickerProps {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  className?: string;
  showToday?: boolean; // Set false for DOB date pickers
  minYear?: number;
  maxYear?: number;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const Datepicker: React.FC<DatepickerProps> = ({
  value = null,
  onChange,
  placeholder = 'Select Date',
  className = '',
  showToday = true,
  minYear = 1950,
  maxYear = new Date().getFullYear() + 10
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(value);
  const [currentMonth, setCurrentMonth] = useState<number>(
    value ? value.getMonth() : new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    value ? value.getFullYear() : new Date().getFullYear()
  );

  // Screen-size awareness position states
  const [dropUp, setDropUp] = useState(false);
  const [alignRight, setAlignRight] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSelectedDate(value);
    if (value) {
      setCurrentMonth(value.getMonth());
      setCurrentYear(value.getFullYear());
    }
  }, [value]);

  // Generate Month Options for custom Dropdown
  const monthOptions: DropdownOption[] = useMemo(() => {
    return MONTH_NAMES.map((name, idx) => ({
      value: String(idx),
      label: name
    }));
  }, []);

  // Generate Year Options for custom Dropdown
  const yearOptions: DropdownOption[] = useMemo(() => {
    const years: DropdownOption[] = [];
    for (let y = minYear; y <= maxYear; y++) {
      years.push({ value: String(y), label: String(y) });
    }
    return years;
  }, [minYear, maxYear]);

  // Viewport Boundary & Position Calculation
  const toggleOpen = () => {
    if (!isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      
      const dropdownHeight = 270;
      const dropdownWidth = 260;

      // Check if space below is insufficient (flip up)
      const spaceBelow = viewportHeight - rect.bottom;
      if (spaceBelow < dropdownHeight && rect.top > dropdownHeight) {
        setDropUp(true);
      } else {
        setDropUp(false);
      }

      // Check if space on right is insufficient (align right)
      const spaceRight = viewportWidth - rect.left;
      if (spaceRight < dropdownWidth && rect.right > dropdownWidth) {
        setAlignRight(true);
      } else {
        setAlignRight(false);
      }
    }
    setIsOpen((prev) => !prev);
  };

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(newDate);
    if (onChange) onChange(newDate);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDate(null);
    if (onChange) onChange(null);
    setIsOpen(false);
  };

  const handleSelectToday = (e: React.MouseEvent) => {
    e.stopPropagation();
    const today = new Date();
    setSelectedDate(today);
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    if (onChange) onChange(today);
    setIsOpen(false);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const today = new Date();

  const daysGrid = [];
  for (let i = 0; i < firstDay; i++) {
    daysGrid.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    daysGrid.push(d);
  }

  return (
    <div ref={containerRef} className={`datepicker-container ${className}`.trim()}>
      <div
        className={`datepicker-input-wrapper ${isOpen ? 'active' : ''}`}
        onClick={toggleOpen}
        tabIndex={0}
        role="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span className={`datepicker-value ${!selectedDate ? 'placeholder' : ''}`}>
          {selectedDate ? formatDate(selectedDate) : placeholder}
        </span>
        <svg
          className="datepicker-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      {isOpen && (
        <div
          className={`datepicker-dropdown ${dropUp ? 'drop-up' : ''} ${alignRight ? 'align-right' : ''}`}
          role="dialog"
          aria-label="Calendar"
        >
          <div className="datepicker-header">
            <button
              type="button"
              className="datepicker-nav-btn"
              onClick={handlePrevMonth}
              aria-label="Previous month"
            >
              &lsaquo;
            </button>

            <div className="datepicker-select-group">
              <Dropdown
                options={monthOptions}
                value={String(currentMonth)}
                onChange={(val) => setCurrentMonth(Number(val))}
                className="datepicker-month-dropdown"
              />
              <Dropdown
                options={yearOptions}
                value={String(currentYear)}
                onChange={(val) => setCurrentYear(Number(val))}
                className="datepicker-year-dropdown"
              />
            </div>

            <button
              type="button"
              className="datepicker-nav-btn"
              onClick={handleNextMonth}
              aria-label="Next month"
            >
              &rsaquo;
            </button>
          </div>

          <div className="datepicker-grid-header">
            {DAY_NAMES.map((name) => (
              <span key={name} className="datepicker-day-name">
                {name}
              </span>
            ))}
          </div>

          <div className="datepicker-days-grid">
            {daysGrid.map((day, idx) => {
              if (day === null) {
                return <span key={`empty-${idx}`} className="datepicker-day-cell empty" />;
              }

              const isToday =
                today.getDate() === day &&
                today.getMonth() === currentMonth &&
                today.getFullYear() === currentYear;

              const isSelected =
                selectedDate !== null &&
                selectedDate.getDate() === day &&
                selectedDate.getMonth() === currentMonth &&
                selectedDate.getFullYear() === currentYear;

              return (
                <button
                  key={day}
                  type="button"
                  className={`datepicker-day-cell ${isToday ? 'today' : ''} ${
                    isSelected ? 'selected' : ''
                  }`}
                  onClick={() => handleSelectDay(day)}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <div className="datepicker-footer">
            {showToday && (
              <button type="button" className="datepicker-action-btn" onClick={handleSelectToday}>
                Today
              </button>
            )}
            {selectedDate && (
              <button type="button" className="datepicker-action-btn" onClick={handleClear}>
                Clear
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Datepicker;
