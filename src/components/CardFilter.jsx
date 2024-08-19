import React, { useState, useEffect } from 'react';
import CustomDateRange from './CustomDateRange';
import './CardFilter.css';
import moment from 'moment';

function CardFilter({ filterChange }) {
  const [showCustomRange, setShowCustomRange] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
    if (startDate && endDate) {
      filterChange(`${startDate} - ${endDate}`);
    }
  }, [startDate, endDate, filterChange]);

  const handleCustomRangeClick = (e) => {
    e.preventDefault(); // Prevent default link behavior
    e.stopPropagation(); // Prevent the dropdown from closing
    setShowCustomRange(!showCustomRange);
    // Reset start and end dates when opening custom range picker
    setStartDate(null);
    setEndDate(null);
  };

  const closeCustomRange = () => {
    setShowCustomRange(false);
  };

  const handleDateChange = (dates) => {
    if (dates) {
      setStartDate(dates[0].format('YYYY-MM-DD 00:00:00'));
      setEndDate(dates[1].format('YYYY-MM-DD 23:59:59'));
      closeCustomRange(); // Optionally close the dropdown when date range is selected
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const handleDate = (value) => {
    const date = new Date();

    // Reset custom range fields when another filter option is selected
    setShowCustomRange(false);

    if (value === 'Today') {
      const todayStart = moment(date).startOf('day').format('YYYY-MM-DD 00:00:00');
      const todayEnd = moment(date).endOf('day').format('YYYY-MM-DD 23:59:59');
      setStartDate(todayStart);
      setEndDate(todayEnd);
    } else if (value === 'This Month') {
      const monthStart = moment(date).startOf('month').format('YYYY-MM-DD 00:00:00');
      const monthEnd = moment(date).endOf('month').format('YYYY-MM-DD 23:59:59');
      setStartDate(monthStart);
      setEndDate(monthEnd);
    } else if (value === 'This Year') {
      const yearStart = moment(date).startOf('year').format('YYYY-MM-DD 00:00:00');
      const yearEnd = moment(date).endOf('year').format('YYYY-MM-DD 23:59:59');
      setStartDate(yearStart);
      setEndDate(yearEnd);
    }
  };

  return (
    <div className="filter dropdown">
      <button
        className="btn btn-secondary btn-sm"
        type="button"
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
