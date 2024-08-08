import React, { useState, useEffect } from 'react';
import CustomDateRange from './CustomDateRange';
import './CardFilter.css';

function CardFilter({ filterChange }) {
  const [showCustomRange, setShowCustomRange] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [today, settoday] = useState(null);
  const [thismonth, setthismonth] = useState(null);
  const [thisyear, setthisyear] = useState(null);

  useEffect(() => {
    // console.log('Start Date:', startDate);
    // console.log('End Date:', endDate);
    if (startDate) {
        filterChange(`${startDate} - ${endDate}`);
      }
  }, [startDate, endDate]);

  let date = new Date();
  console.log(date);


  const handleCustomRangeClick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    e.stopPropagation(); // Prevent the dropdown from closing
    setShowCustomRange(!showCustomRange);
  };

  const closeCustomRange = () => {
    setShowCustomRange(false);
  };

  const handleDateChange = (dates) => {
    if (dates) {
      setStartDate(dates[0].format('DD-MM-YYYY'));
      setEndDate(dates[1].format('DD-MM-YYYY'));
      closeCustomRange(); // Optionally close the dropdown when date range is selected
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const handleDate = (value) => {
    filterChange(value);
    const date = new Date();

    if (value === 'Today') {
      const todayStart = new Date(date);
      todayStart.setHours(0, 0, 0, 0);
      const todayEnd = new Date(date);
      todayEnd.setHours(23, 59, 59, 999);
      settoday({ start: todayStart, end: todayEnd });
    } else if (value === 'This Month') {
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
      setthismonth({ start: monthStart, end: monthEnd });
    } else if (value === 'This Year') {
      const yearStart = new Date(date.getFullYear(), 0, 1);
      const yearEnd = new Date(date.getFullYear(), 11, 31, 23, 59, 59, 999);
      setthisyear({ start: yearStart, end: yearEnd });
    }
  }

  return (
    <div className="filter dropdown">
      <button
        className="btn btn-secondary btn-sm"
        type="button"
        // id="dropdownMenuButton"
        data-bs-toggle="dropdown"
      >
        Filter <i className="bi bi-filter"></i>  
      </button>
      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
        <li className="dropdown-header text-start">
          <h6>Filter</h6>
        </li>
        <li>
          <a
            className="dropdown-item"
            onClick={() => handleDate('Today')}
          >
            Today
          </a>
        </li>
        <li>
          <a
            className="dropdown-item"
            onClick={() => handleDate('This Month')}
          >
            This Month
          </a>
        </li>
        <li>
          <a
            className="dropdown-item"
            onClick={() => handleDate('This Year')}
          >
            This Year
          </a>
        </li>
        <li className="dropdown-submenu">
          <a className="dropdown-item" href="#" onClick={handleCustomRangeClick}>
            Custom Range
          </a>
          {showCustomRange && (
            <ul className="dropdown-menu show custom-range-dropdown">
              <li className="dropdown-item" onClick={(e) => e.stopPropagation()}>
                <CustomDateRange 
                  startDate={startDate}
                  endDate={endDate}
                  onDateChange={handleDateChange} 
                 
                />
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}

export default CardFilter;
