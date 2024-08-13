// import React, {useState} from 'react'
// import './card.css'
// import CardFilter from './CardFilter';

// function Card({name, totalsales}) {

//     const [filter, setFilter] = useState('Today');
//     const handleFilterChange = filter => {
//         setFilter(filter);
//     }

//   return(
//     <div className="col-xxl-4 col-md-6">
//         <div className="card info-card sales-card">
//             {/* <CardFilter filterChange={handleFilterChange}/> */}
//             <div className="card-body">
//                 <h5 className="card-title">
//                     {/* {card.name} */}
//                     {name} 
//                 </h5>

//                 <div className="d-flex align-items-center">
//                     <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
//                         <i class="bi bi-cart"></i>                        
//                     </div>
//                     <div className="ps-3">
//                         <h6>
//                             {/* {card.name === 'Revenue'
//                                 ? '₹' + card.amount.toLocaleString('en-IN')
//                                 : card.amount.toLocaleString('en-IN')
//                             } */}
//                             {totalsales}
//                         </h6>
//                         <span
//                             // className={`${
//                             //     card.percentage > 0 ? 'text-success' : 'text-danger'
//                             // } small pt-1 fw-bold`}
//                             >
//                                 {/* {card.percentage > 0
//                                     ? card.percentage * 100
//                                     : -card.percentage * 100} */}100
//                             %
//                         </span>
//                         <span className="text-muted small pt-2 ps-1">
//                             {/* {card.percentage > 0 ? 'increase' : 'decrease'} */} increase
//                         </span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }
// export default Card

import React, { useState } from 'react';
import './card.css';
import CardFilter from './CardFilter';

function Card({ name, totalsales, onClick }) {

    const [filter, setFilter] = useState('Today');
    const handleFilterChange = filter => {
        setFilter(filter);
    }

    return (
        <div className="col-xxl-4 col-md-6">
            <div className="card info-card sales-card" onClick={onClick} style={{ cursor: 'pointer' }}>
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
