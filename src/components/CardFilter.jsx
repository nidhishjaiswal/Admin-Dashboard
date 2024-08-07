import React, { useState, useEffect } from 'react';
import CustomDateRange from './CustomDateRange';
import './CardFilter.css';

function CardFilter({ filterChange }) {
  const [showCustomRange, setShowCustomRange] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
    if (startDate) {
        filterChange(`${startDate} - ${endDate}`);
      }
  }, [startDate, endDate]);

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
            onClick={() => filterChange('Today')}
          >
            Today
          </a>
        </li>
        <li>
          <a
            className="dropdown-item"
            onClick={() => filterChange('This Month')}
          >
            This Month
          </a>
        </li>
        <li>
          <a
            className="dropdown-item"
            onClick={() => filterChange('This Year')}
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
