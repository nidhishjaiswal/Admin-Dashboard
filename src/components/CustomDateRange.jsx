import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;

function CustomDateRange({ startDate, endDate, onDateChange }) {
  return (
    <div style={{ margin: 20 }}>
      <RangePicker
        value={startDate && endDate ? [moment(startDate, 'DD-MM-YYYY'), moment(endDate, 'DD-MM-YYYY')] : []}
        onChange={(dates) => {
          onDateChange(dates ? [dates[0], dates[1]] : [null, null]);
        }}
      />
    </div>
  );
}

export default CustomDateRange;