import React, { useState } from 'react'
import CardFilter from './CardFilter';
import ReportCharts from './ReportCharts';

function Reports() {

    const [Filter, setFilter] = React.useState('Today');
    const handleFilterChange = filter => {
        setFilter(filter);
    }

  return (
    <div className="card">
        {/* <CardFilter filterChange={handleFilterChange}/> */}
        <div className="card-body">
            <h5 className="card-title">
                Reports
            </h5>
            <ReportCharts/>
        </div>
    </div>
  )
}

export default Reports