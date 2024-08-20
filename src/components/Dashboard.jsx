import React, { useState, useEffect } from 'react';
import './dashboard.css';
import Card from './Card';
import Reports from './Reports';
import RecentSales from './RecentSales';
import TopSelling from './TopSelling';
import RecentActivity from './RecentActivity';
import BudgetReport from './BudgetReport';
import WebTraffic from './WebTraffic';
import CardFilter from './CardFilter';
import moment from 'moment';
import axios from 'axios';
import Clock from './Clock';

function Dashboard() {
    const [cards, setCards] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [approvedCount, setApprovedCount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [filteredData, setFilteredData] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // States for main details
    const [highlightedCards, setHighlightedCards] = useState({
        satellite: false,
        vector: false,
        online: false,
    });

    // States for AWIFS, Sentinel, LISS4 under Satellite
    const [highlightedSatellite, setHighlightedSatellite] = useState({
        free: false,
        paid: false,
    });

    // States for AWIFS, Sentinel, LISS4 under Vector
    const [highlightedVector, setHighlightedVector] = useState({
        free: false,
        paid: false,
    });

    // States for AWIFS, Sentinel, LISS4 under Online
    const [highlightedOnline, setHighlightedOnline] = useState({
        free: false,
        paid: false,
    });

    const orderData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/orderDetails');
            const data = res.data;
            setOrderDetails(data);
            filterData(data, startDate, endDate);
        } catch (e) {
            console.log(e.message);
        }
    };

    const fetchData = () => {
        try {
            fetch('http://localhost:4000/cards')
                .then((res) => res.json())
                .then((data) => {
                    setCards(data);
                })
                .catch((e) => console.log(e.message));
        } catch (e) {
            console.log(e.message);
        }
    };

    useEffect(() => {
        fetchData();
        orderData();
    }, []);

    useEffect(() => {
        filterData(orderDetails, startDate, endDate);
    }, [startDate, endDate, orderDetails]);

    const filterData = (data, startDate, endDate) => {
        let filtered = data;

        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            filtered = data.filter((item) => {
                const itemDate = new Date(item.date);
                return itemDate >= start && itemDate <= end;
            });
        }

        let count = 0;
        let totalAmount = 0;

        filtered.forEach((item) => {
            if (item.status === 'Approved') {
                count++;
            }
            const amount = parseFloat(item.total_amount);
            if (!isNaN(amount)) {
                totalAmount += amount;
            }
        });

        setFilteredData(filtered);
        setApprovedCount(count);
        setTotalAmount(totalAmount);
    };

    const handleFilterChange = (dates) => {
        const [startDate, endDate] = dates.split(' - ');
        setStartDate(startDate);
        setEndDate(endDate);
    };

    // Main card click handlers
    const handleSatelliteClick = () => {
        setHighlightedCards((prev) => ({
            satellite: !prev.satellite,
            vector: false,
            online: false,
        }));
    };

    const handleVectorClick = () => {
        setHighlightedCards((prev) => ({
            satellite: false,
            vector: !prev.vector,
            online: false,
        }));
    };

    const handleOnlineClick = () => {
        setHighlightedCards((prev) => ({
            satellite: false,
            vector: false,
            online: !prev.online,
        }));
    };

    // Satellite sub-card click handlers
    const handleSatelliteFreeClick = () => {
        setHighlightedSatellite((prev) => ({
            free: !prev.free,
            paid: false,
        }));
    };

    const handleSatellitePaidClick = () => {
        setHighlightedSatellite((prev) => ({
            free: false,
            paid: !prev.paid,
        }));
    };

    // Vector sub-card click handlers
    const handleVectorFreeClick = () => {
        setHighlightedVector((prev) => ({
            free: !prev.free,
            paid: false,
        }));
    };

    const handleVectorPaidClick = () => {
        setHighlightedVector((prev) => ({
            free: false,
            paid: !prev.paid,
        }));
    };

    // Online sub-card click handlers
    const handleOnlineFreeClick = () => {
        setHighlightedOnline((prev) => ({
            free: !prev.free,
            paid: false,
        }));
    };

    const handleOnlinePaidClick = () => {
        setHighlightedOnline((prev) => ({
            free: false,
            paid: !prev.paid,
        }));
    };

    return (
        <section className="dashboard section">
            <div className="row">
                <div className="">
                    {startDate && endDate &&
                        <h5>
                           Custom Range: <span>{moment(startDate).startOf('day').format('Do MMMM YYYY')} - {moment(endDate).startOf('day').format('Do MMMM YYYY')}</span>
                        </h5>
                    }
                </div>
                <div className="d-flex justify-content-end mb-1">
                    <h5>
                        <Clock/>
                    </h5>
                    <CardFilter filterChange={handleFilterChange} />
                </div>
                <div className="col-lg-8">
                    <div className="row">
                        {/* Satellite Main Card */}
                        <Card
                            className={`satellitemain ${highlightedCards.satellite ? 'highlighted-card' : ''}`}
                            name={"Satellite"}
                            totalsales={approvedCount}
                            onClick={handleSatelliteClick}
                        />
                        {highlightedCards.satellite && (
                            <>
                                {/* Satellite Free and Paid Cards */}
                                <div style={{ marginLeft: '20px' }}>
                                    <Card
                                        className={`satellitedets ${highlightedSatellite.free ? 'highlighted-card' : ''}`}
                                        name={"Free"}
                                        totalsales={filteredData.length}
                                        onClick={handleSatelliteFreeClick}
                                    />
                                    {highlightedSatellite.free && (
                                        <div style={{ marginLeft: '40px' }}>
                                            <Card className="awifs" name={"AWIFS"} totalsales={filteredData.length} />
                                            <Card className="sentinel" name={"Sentinel"} totalsales={filteredData.length} />
                                            <Card className="liss4" name={"LISS4"} totalsales={filteredData.length} />
                                        </div>
                                    )}
                                    <Card
                                        className={`satellitedets ${highlightedSatellite.paid ? 'highlighted-card' : ''}`}
                                        name={"Paid"}
                                        totalsales={filteredData.length}
                                        onClick={handleSatellitePaidClick}
                                    />
                                    {highlightedSatellite.paid && (
                                        <div style={{ marginLeft: '40px' }}>
                                            <Card className="awifs" name={"AWIFS"} totalsales={filteredData.length} />
                                            <Card className="sentinel" name={"Sentinel"} totalsales={filteredData.length} />
                                            <Card className="liss4" name={"LISS4"} totalsales={filteredData.length} />
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        {/* Vector Main Card */}
                        <Card
                            className={`vectormain ${highlightedCards.vector ? 'highlighted-card' : ''}`}
                            name={"Vector"}
                            totalsales={(new Intl.NumberFormat('en-IN').format(totalAmount.toFixed(2)))}
                            onClick={handleVectorClick}
                        />
                        {highlightedCards.vector && (
                            <>
                                {/* Vector Free and Paid Cards */}
                                <div style={{ marginLeft: '20px' }}>
                                    <Card
                                        className={`vectordets ${highlightedVector.free ? 'highlighted-card' : ''}`}
                                        name={"Free"}
                                        totalsales={filteredData.length}
                                        onClick={handleVectorFreeClick}
                                    />
                                    {highlightedVector.free && (
                                        <div style={{ marginLeft: '40px' }}>
                                            <Card className="awifs" name={"AWIFS"} totalsales={filteredData.length} />
                                            <Card className="sentinel" name={"Sentinel"} totalsales={filteredData.length} />
                                            <Card className="liss4" name={"LISS4"} totalsales={filteredData.length} />
                                        </div>
                                    )}
                                    <Card
                                        className={`vectordets ${highlightedVector.paid ? 'highlighted-card' : ''}`}
                                        name={"Paid"}
                                        totalsales={filteredData.length}
                                        onClick={handleVectorPaidClick}
                                    />
                                    {highlightedVector.paid && (
                                        <div style={{ marginLeft: '40px' }}>
                                            <Card className="awifs" name={"AWIFS"} totalsales={filteredData.length} />
                                            <Card className="sentinel" name={"Sentinel"} totalsales={filteredData.length} />
                                            <Card className="liss4" name={"LISS4"} totalsales={filteredData.length} />
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        {/* Online Main Card */}
                        <Card
                            className={`onlinemain ${highlightedCards.online ? 'highlighted-card' : ''}`}
                            name={"Online"}
                            totalsales={filteredData.length}
                            onClick={handleOnlineClick}
                        />
                        {highlightedCards.online && (
                            <>
                                {/* Online Free and Paid Cards */}
                                <div style={{ marginLeft: '20px' }}>
                                    <Card
                                        className={`onlinedets ${highlightedOnline.free ? 'highlighted-card' : ''}`}
                                        name={"Free"}
                                        totalsales={filteredData.length}
                                        onClick={handleOnlineFreeClick}
                                    />
                                    {highlightedOnline.free && (
                                        <div style={{ marginLeft: '40px' }}>
                                            <Card className="awifs" name={"AWIFS"} totalsales={filteredData.length} />
                                            <Card className="sentinel" name={"Sentinel"} totalsales={filteredData.length} />
                                            <Card className="liss4" name={"LISS4"} totalsales={filteredData.length} />
                                        </div>
                                    )}
                                    <Card
                                        className={`onlinedets ${highlightedOnline.paid ? 'highlighted-card' : ''}`}
                                        name={"Paid"}
                                        totalsales={filteredData.length}
                                        onClick={handleOnlinePaidClick}
                                    />
                                    {highlightedOnline.paid && (
                                        <div style={{ marginLeft: '40px' }}>
                                            <Card className="awifs" name={"AWIFS"} totalsales={filteredData.length} />
                                            <Card className="sentinel" name={"Sentinel"} totalsales={filteredData.length} />
                                            <Card className="liss4" name={"LISS4"} totalsales={filteredData.length} />
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        <div className="col-12">
                            <Reports />
                        </div>
                        <div className="col-12">
                            <RecentSales />
                        </div>
                        <div className="col-12">
                            <TopSelling />
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <RecentActivity />
                    <BudgetReport />
                    <WebTraffic />
                </div>
            </div>
        </section>
    );
}

export default Dashboard;
