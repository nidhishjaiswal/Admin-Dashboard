import React, { useState } from 'react';
import './card.css';
import CardFilter from './CardFilter';

function Card({ name, totalsales, onClick, isSelected }) {

    const [filter, setFilter] = useState('Today');
    const handleFilterChange = filter => {
        setFilter(filter);
    };

    return (
        <div className="col-xxl-4 col-md-6">
            <div
                className={`card info-card sales-card ${isSelected ? 'selected' : ''}`} 
                onClick={onClick}
                style={{ cursor: 'pointer' }}
            >
                <div className="card-body">
                    <h5 className="card-title">
                        {name}
                    </h5>

                    <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className="bi bi-cart"></i>                        
                        </div>
                        <div className="ps-3">
                            <h6>{totalsales}</h6>
                            <span className="text-success small pt-1 fw-bold">
                                100%
                            </span>
                            <span className="text-muted small pt-2 ps-1">
                                increase
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
