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

    // States for main details and sub-card selection
    const [highlightedCards, setHighlightedCards] = useState({
        satellite: false,
        vector: false,
        online: false,
    });

    const [highlightedSubCards, setHighlightedSubCards] = useState({
        satelliteFree: false,
        satellitePaid: false,
        vectorFree: false,
        vectorPaid: false,
        onlineFree: false,
        onlinePaid: false,
        subCards: {
            AWIFS: false,
            Sentinel: false,
            LISS4: false,
        },
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

    useEffect(() => {
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
        // Reset sub-cards when switching main cards
        setHighlightedSubCards((prev) => ({
            ...prev,
            satelliteFree: false,
            satellitePaid: false,
        }));
    };

    const handleVectorClick = () => {
        setHighlightedCards((prev) => ({
            satellite: false,
            vector: !prev.vector,
            online: false,
        }));
        setHighlightedSubCards((prev) => ({
            ...prev,
            vectorFree: false,
            vectorPaid: false,
        }));
    };

    const handleOnlineClick = () => {
        setHighlightedCards((prev) => ({
            satellite: false,
            vector: false,
            online: !prev.online,
        }));
        setHighlightedSubCards((prev) => ({
            ...prev,
            onlineFree: false,
            onlinePaid: false,
        }));
    };

    // Sub-card click handlers
    const handleSubCardClick = (parentCard, subCard) => {
        setHighlightedSubCards((prev) => ({
            ...prev,
            [`${parentCard}Free`]: subCard === 'Free' ? !prev[`${parentCard}Free`] : false,
            [`${parentCard}Paid`]: subCard === 'Paid' ? !prev[`${parentCard}Paid`] : false,
        }));
    };

    const handleSubCardsSelection = (cardName) => {
        setHighlightedSubCards((prev) => ({
            ...prev,
            subCards: {
                AWIFS: cardName === 'AWIFS',
                Sentinel: cardName === 'Sentinel',
                LISS4: cardName === 'LISS4',
            },
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
                <div className="d-flex justify-content-end mb-1 mt-n2">
                    <h5>
                        <Clock />
                    </h5>
                    <CardFilter filterChange={handleFilterChange} />
                </div>
                <div className="col-lg-8">
                    {/* Main Cards in a Single Row */}
                    <div className="row">
                        <Card
                            className={`satellitemain col-4`}
                            name={"Satellite"}
                            totalsales={approvedCount}
                            onClick={handleSatelliteClick}
                            isSelected={highlightedCards.satellite}
                        />
                        <Card
                            className={`vectormain col-4`}
                            name={"Vector"}
                            totalsales={(new Intl.NumberFormat('en-IN').format(totalAmount.toFixed(2)))}
                            onClick={handleVectorClick}
                            isSelected={highlightedCards.vector}
                        />
                        <Card
                            className={`onlinemain col-4`}
                            name={"Online"}
                            totalsales={filteredData.length}
                            onClick={handleOnlineClick}
                            isSelected={highlightedCards.online}
                        />
                    </div>

                    {/* Sub-Cards for Satellite */}
                    {highlightedCards.satellite && (
                        <div className="row ml-4" style={{ marginLeft: '20px' }}>
                            <Card
                                className={`satellitedets col-6`}
                                name={"Free"}
                                totalsales={filteredData.length}
                                onClick={() => handleSubCardClick('satellite', 'Free')}
                                isSelected={highlightedSubCards.satelliteFree}
                            />
                            <Card
                                className={`satellitedets col-6`}
                                name={"Paid"}
                                totalsales={filteredData.length}
                                onClick={() => handleSubCardClick('satellite', 'Paid')}
                                isSelected={highlightedSubCards.satellitePaid}
                            />
                        </div>
                    )}

                    {highlightedSubCards.satelliteFree && (
                        <div className="row ml-4" style={{ marginLeft: '60px' }}>
                            <Card className="awifs col-4" name={"AWIFS"} totalsales={filteredData.length} onClick={() => handleSubCardsSelection('AWIFS')} isSelected={highlightedSubCards.subCards.AWIFS} />
                            <Card className="sentinel col-4" name={"Sentinel"} totalsales={filteredData.length} onClick={() => handleSubCardsSelection('Sentinel')} isSelected={highlightedSubCards.subCards.Sentinel} />
                            <Card className="liss4 col-4" name={"LISS4"} totalsales={filteredData.length} onClick={() => handleSubCardsSelection('LISS4')} isSelected={highlightedSubCards.subCards.LISS4} />
                        </div>
                    )}

                    {highlightedSubCards.satellitePaid && (
                        <div className="row ml-4" style={{ marginLeft: '60px' }}>
                            <Card className="awifs col-4" name={"AWIFS"} totalsales={filteredData.length} onClick={() => handleSubCardsSelection('AWIFS')} isSelected={highlightedSubCards.subCards.AWIFS} />
                            <Card className="sentinel col-4" name={"Sentinel"} totalsales={filteredData.length} onClick={() => handleSubCardsSelection('Sentinel')} isSelected={highlightedSubCards.subCards.Sentinel} />
                            <Card className="liss4 col-4" name={"LISS4"} totalsales={filteredData.length} onClick={() => handleSubCardsSelection('LISS4')} isSelected={highlightedSubCards.subCards.LISS4} />
                        </div>
                    )}

                    {/* Sub-Cards for Vector */}
                    {highlightedCards.vector && (
                        <div className="row ml-4" style={{ marginLeft: '20px' }}>
                            <Card
                                className={`vectordets col-6`}
                                name={"Free"}
                                totalsales={filteredData.length}
                                onClick={() => handleSubCardClick('vector', 'Free')}
                                isSelected={highlightedSubCards.vectorFree}
                            />
                            <Card
                                className={`vectordets col-6`}
                                name={"Paid"}
                                totalsales={filteredData.length}
                                onClick={() => handleSubCardClick('vector', 'Paid')}
                                isSelected={highlightedSubCards.vectorPaid}
                            />
                        </div>
                    )}

                    {highlightedSubCards.vectorFree && (
                        <div className="row ml-4" style={{ marginLeft: '60px' }}>
                            <Card className="awifs col-4" name={"AWIFS"} totalsales={filteredData.length} onClick={() => handleSubCardsSelection('AWIFS')} isSelected={highlightedSubCards.subCards.AWIFS} />
                            <Card className="sentinel col-4" name={"Sentinel"} totalsales={filteredData.length} onClick={() => handleSubCardsSelection('Sentinel')} isSelected={highlightedSubCards.subCards.Sentinel} />
                            <Card className="liss4 col-4" name={"LISS4"} totalsales={filteredData.length} onClick={() => handleSubCardsSelection('LISS4')} isSelected={highlightedSubCards.subCards.LISS4} />
                        </div>
                    )}

                    {highlightedSubCards.vectorPaid && (
                        <div className="row ml-4" style={{ marginLeft: '60px' }}>
                            <Card className="awifs col-4" name={"AWIFS"} totalsales={filteredData.length} onClick={() => handleSubCardsSelection('AWIFS')} isSelected={highlightedSubCards.subCards.AWIFS} />
                            <Card className="sentinel col-4" name={"Sentinel"} totalsales={filteredData.length} onClick={() => handleSubCardsSelection('Sentinel')} isSelected={highlightedSubCards.subCards.Sentinel} />
                            <Card className="liss4 col-4" name={"LISS4"} totalsales={filteredData.length} onClick={() => handleSubCardsSelection('LISS4')} isSelected={highlightedSubCards.subCards.LISS4} />
                        </div>
                    )}

                    {/* Sub-Cards for Online */}
                    {highlightedCards.online && (
                        <div className="row ml-4" style={{ marginLeft: '20px' }}>
                            <Card
                                className={`onlinedets col-6`}
                                name={"Free"}
                                totalsales={filteredData.length}
                                onClick={() => handleSubCardClick('online', 'Free')}
                                isSelected={highlightedSubCards.onlineFree}
                            />
                            <Card
                                className={`onlinedets col-6`}
                                name={"Paid"}
                                totalsales={filteredData.length}
                                onClick={() => handleSubCardClick('online', 'Paid')}
                                isSelected={highlightedSubCards.onlinePaid}
                            />
                        </div>
                    )}

                    {highlightedSubCards.onlineFree && (
                        <div className="row ml-4" style={{ marginLeft: '60px' }}>
                            <Card className="awifs col-4" name={"AWIFS"} totalsales={filteredData.length} onClick={() => handleSubCardsSelection('AWIFS')} isSelected={highlightedSubCards.subCards.AWIFS} />
                            <Card className="sentinel col-4" name={"Sentinel"} totalsales={filteredData.length} onClick={() => handleSubCardsSelection('Sentinel')} isSelected={highlightedSubCards.subCards.Sentinel} />
                            <Card className="liss4 col-4" name={"LISS4"} totalsales={filteredData.length} onClick={() => handleSubCardsSelection('LISS4')} isSelected={highlightedSubCards.subCards.LISS4} />
                        </div>
                    )}

                    {highlightedSubCards.onlinePaid && (
                        <div className="row ml-4" style={{ marginLeft: '60px' }}>
                            <Card className="awifs col-4" name={"AWIFS"} totalsales={filteredData.length} onClick={() => handleSubCardsSelection('AWIFS')} isSelected={highlightedSubCards.subCards.AWIFS} />
                            <Card className="sentinel col-4" name={"Sentinel"} totalsales={filteredData.length} onClick={() => handleSubCardsSelection('Sentinel')} isSelected={highlightedSubCards.subCards.Sentinel} />
                            <Card className="liss4 col-4" name={"LISS4"} totalsales={filteredData.length} onClick={() => handleSubCardsSelection('LISS4')} isSelected={highlightedSubCards.subCards.LISS4} />
                        </div>
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
